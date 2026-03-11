import {setGlobalOptions} from "firebase-functions";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getFirestore, FieldValue, Timestamp} from "firebase-admin/firestore";

initializeApp();
setGlobalOptions({maxInstances: 10, region: "africa-south1"});

const firestore = getFirestore();
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;

// IMPORTANT: These from-addresses must match a domain verified in your Resend account.
// Log in to resend.com, add virungaexpeditiontours.com, and verify DNS records before deploying.
const FROM_BOOKINGS = "Virunga Expedition Tours <bookings@virungaexpeditiontours.com>";
const FROM_NOREPLY = "Virunga Expedition Tours <noreply@virungaexpeditiontours.com>";
const FROM_SYSTEM = "Virunga Booking System <bookings@virungaexpeditiontours.com>";
const ADMIN_EMAIL = "info@virungaexpeditiontours.com";

type BookingPayload = {
  availabilityId: string;
  tourName: string;
  bookingDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPeople: number;
  specialRequests?: string;
  idempotencyKey?: string;
  // totalPrice intentionally omitted — always computed server-side from base_price
};

type InquiryPayload = {
  name: string;
  email: string;
  message: string;
};

type QuotePayload = {
  full_name: string;
  email: string;
  phone: string;
  country_residence: string;
  nationality: string;
  preferred_travel_dates: string;
  flexible_dates: boolean;
  number_adults: number;
  number_children: number;
  children_ages?: string;
  tour_interests: string[];
  trip_duration: string;
  budget_range: string;
  accommodation_preference: string;
  special_requests?: string;
  how_heard_about_us?: string;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sendResendEmail = async (
  to: string[],
  subject: string,
  html: string,
  from: string,
): Promise<boolean> => {
  if (!RESEND_API_KEY) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({from, to, subject, html}),
  });

  return response.ok;
};

const sendBookingEmails = async (
  booking: BookingPayload & {bookingId: string; totalPrice: number},
) => {
  const safeCustomerName = escapeHtml(booking.customerName);
  const safeTourName = escapeHtml(booking.tourName);
  const safeDate = escapeHtml(booking.bookingDate);
  const safePhone = escapeHtml(booking.customerPhone);
  const safeEmail = escapeHtml(booking.customerEmail);
  const safeRequests = booking.specialRequests ?
    `<p><strong>Special requests:</strong> ${escapeHtml(booking.specialRequests)}</p>` : "";

  const customerSent = await sendResendEmail(
    [booking.customerEmail],
    `Booking Confirmation - ${booking.tourName}`,
    `<p>Hello ${safeCustomerName},</p>
     <p>We received your booking request for <strong>${safeTourName}</strong> (${safeDate}).</p>
     <p>Booking ID: ${booking.bookingId}</p>
     <p>Our team will confirm availability and follow up shortly.</p>
     ${safeRequests}`,
    FROM_BOOKINGS,
  );

  const adminSent = await sendResendEmail(
    [ADMIN_EMAIL],
    `New Booking Request - ${booking.tourName}`,
    `<p><strong>Tour:</strong> ${safeTourName}</p>
     <p><strong>Date:</strong> ${safeDate}</p>
     <p><strong>Name:</strong> ${safeCustomerName}</p>
     <p><strong>Email:</strong> ${safeEmail}</p>
     <p><strong>Phone:</strong> ${safePhone}</p>
     <p><strong>People:</strong> ${booking.numberOfPeople}</p>
     <p><strong>Total:</strong> $${booking.totalPrice}</p>
     ${safeRequests}`,
    FROM_SYSTEM,
  );

  return customerSent && adminSent;
};

const requireString = (value: unknown, field: string) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new HttpsError("invalid-argument", `${field} is required`);
  }
};

export const createBookingRequest = onCall(async (request) => {
  // Authentication required — users must be signed in to book
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be signed in to make a booking");
  }

  const data = request.data as BookingPayload;

  requireString(data.availabilityId, "availabilityId");
  requireString(data.tourName, "tourName");
  requireString(data.bookingDate, "bookingDate");
  requireString(data.customerName, "customerName");
  requireString(data.customerEmail, "customerEmail");
  requireString(data.customerPhone, "customerPhone");

  if (!isValidEmail(data.customerEmail)) {
    throw new HttpsError("invalid-argument", "customerEmail must be a valid email address");
  }

  if (!Number.isFinite(data.numberOfPeople) || data.numberOfPeople < 1) {
    throw new HttpsError("invalid-argument", "numberOfPeople must be at least 1");
  }

  if (data.numberOfPeople > 50) {
    throw new HttpsError("invalid-argument", "numberOfPeople cannot exceed 50");
  }

  const callerUid = request.auth.uid;

  // Idempotency: if a booking with this key already exists, return it without re-processing
  if (data.idempotencyKey) {
    const existing = await firestore.collection("tour_bookings")
      .where("idempotency_key", "==", data.idempotencyKey)
      .where("booked_by_uid", "==", callerUid)
      .limit(1)
      .get();
    if (!existing.empty) {
      const existingDoc = existing.docs[0];
      return {success: true, bookingId: existingDoc.id, emailSent: false, duplicate: true};
    }
  }

  const availabilityRef = firestore.collection("tour_availability").doc(data.availabilityId);
  const bookingRef = firestore.collection("tour_bookings").doc();

  let serverTotalPrice = 0;

  await firestore.runTransaction(async (transaction) => {
    const availabilitySnapshot = await transaction.get(availabilityRef);
    if (!availabilitySnapshot.exists) {
      throw new HttpsError("not-found", "Availability entry not found");
    }

    const availability = availabilitySnapshot.data() as {
      available_spots: number;
      is_available: boolean;
      date: string;
      tour_name: string;
      base_price: number;
    };

    if (!availability.is_available) {
      throw new HttpsError("failed-precondition", "Selected date is unavailable");
    }

    if (availability.available_spots < data.numberOfPeople) {
      throw new HttpsError("failed-precondition", "Not enough available spots");
    }

    if (availability.date !== data.bookingDate || availability.tour_name !== data.tourName) {
      throw new HttpsError("failed-precondition", "Availability details do not match");
    }

    // Always compute price server-side — never trust client-submitted price
    serverTotalPrice = (availability.base_price || 0) * data.numberOfPeople;

    transaction.update(availabilityRef, {
      available_spots: availability.available_spots - data.numberOfPeople,
      updated_at: FieldValue.serverTimestamp(),
    });

    transaction.set(bookingRef, {
      tour_name: data.tourName,
      booking_date: data.bookingDate,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      number_of_people: data.numberOfPeople,
      total_price: serverTotalPrice,
      special_requests: data.specialRequests || null,
      idempotency_key: data.idempotencyKey || null,
      status: "pending",
      booked_by_uid: callerUid,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    });
  });

  let emailSent = false;
  try {
    emailSent = await sendBookingEmails({
      ...data,
      totalPrice: serverTotalPrice,
      bookingId: bookingRef.id,
    });
  } catch {
    emailSent = false;
  }

  return {
    success: true,
    bookingId: bookingRef.id,
    emailSent,
  };
});

export const sendQuoteNotification = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be signed in to submit a quote request");
  }

  const data = request.data as QuotePayload;
  requireString(data.full_name, "full_name");
  requireString(data.email, "email");

  if (!isValidEmail(data.email)) {
    throw new HttpsError("invalid-argument", "email must be a valid email address");
  }

  // Persist quote request to Firestore before attempting email — data is never lost
  const quoteRef = firestore.collection("quote_requests").doc();
  await quoteRef.set({
    ...data,
    submitted_by_uid: request.auth.uid,
    created_at: FieldValue.serverTimestamp(),
    status: "new",
  });

  const safeName = escapeHtml(data.full_name);
  const safeEmail = escapeHtml(data.email);

  let customerSent = false;
  let teamSent = false;
  try {
    customerSent = await sendResendEmail(
      [data.email],
      "Thank You for Your Quote Request - Virunga Expedition Tours",
      `<p>Hello ${safeName},</p>
       <p>We received your quote request and will respond within 24 hours.</p>`,
      FROM_NOREPLY,
    );

    teamSent = await sendResendEmail(
      [ADMIN_EMAIL],
      `New Quote Request from ${data.full_name}`,
      `<p><strong>Name:</strong> ${safeName}</p>
       <p><strong>Email:</strong> ${safeEmail}</p>`,
      FROM_NOREPLY,
    );
  } catch {
    // Emails are best-effort — data is already saved
  }

  return {
    success: true,
    quoteId: quoteRef.id,
    delivery: {
      customerEmail: {success: customerSent},
      teamEmail: {success: teamSent},
    },
  };
});

export const sendInquiryNotification = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be signed in to submit an inquiry");
  }

  const data = request.data as InquiryPayload;
  requireString(data.name, "name");
  requireString(data.email, "email");
  requireString(data.message, "message");

  if (!isValidEmail(data.email)) {
    throw new HttpsError("invalid-argument", "email must be a valid email address");
  }

  // Persist inquiry to Firestore before attempting email — data is never lost
  const inquiryRef = firestore.collection("quick_inquiries").doc();
  await inquiryRef.set({
    ...data,
    submitted_by_uid: request.auth.uid,
    created_at: FieldValue.serverTimestamp(),
    status: "new",
  });

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message);

  let customerSent = false;
  let teamSent = false;
  try {
    customerSent = await sendResendEmail(
      [data.email],
      "We Received Your Message - Virunga Expedition Tours",
      `<p>Hello ${safeName},</p>
       <p>We received your message and will respond shortly.</p>
       <p><strong>Your message:</strong> ${safeMessage}</p>`,
      FROM_NOREPLY,
    );

    teamSent = await sendResendEmail(
      [ADMIN_EMAIL],
      `New Inquiry from ${data.name}`,
      `<p><strong>Name:</strong> ${safeName}</p>
       <p><strong>Email:</strong> ${safeEmail}</p>
       <p><strong>Message:</strong> ${safeMessage}</p>`,
      FROM_NOREPLY,
    );
  } catch {
    // Emails are best-effort — data is already saved
  }

  return {
    success: true,
    inquiryId: inquiryRef.id,
    delivery: {
      customerEmail: {success: customerSent},
      teamEmail: {success: teamSent},
    },
  };
});

export const travelChatbot = onCall(async (request) => {
  // Authentication required — prevents unauthenticated API quota abuse
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be signed in to use the chatbot");
  }

  const message = request.data?.message as string | undefined;
  requireString(message, "message");

  if (!LOVABLE_API_KEY) {
    return {
      response: "Please contact us on WhatsApp at +250 783 959 404 for immediate help.",
    };
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful Virunga Expedition Tours assistant. Keep answers short, accurate, and practical.",
        },
        {role: "user", content: message},
      ],
      temperature: 0.7,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    throw new HttpsError("internal", "AI service unavailable");
  }

  const data = await response.json() as {
    choices?: Array<{message?: {content?: string}}>;
  };

  return {
    response: data.choices?.[0]?.message?.content ||
      "Please contact us via WhatsApp at +250 783 959 404.",
  };
});

export const sendAdminNotification = onCall(async (request) => {
  const callerUid = request.auth?.uid;
  if (!callerUid) {
    throw new HttpsError("unauthenticated", "Authentication required");
  }

  const roleDoc = await firestore.collection("user_roles").doc(callerUid).get();
  const roleData = roleDoc.data() as {role?: string} | undefined;
  if (!roleDoc.exists || roleData?.role !== "admin") {
    throw new HttpsError("permission-denied", "Admin role required");
  }

  const payload = request.data as {type?: string; userName?: string; userEmail?: string};
  const type = payload?.type || "notice";
  const safeName = escapeHtml(payload.userName || "Unknown");
  const safeEmail = escapeHtml(payload.userEmail || "Unknown");

  const adminsSnapshot = await firestore.collection("user_roles")
    .where("role", "==", "admin")
    .get();

  const adminIds = adminsSnapshot.docs.map((docSnapshot) => docSnapshot.id);
  if (adminIds.length === 0) {
    return {success: true, sent: 0};
  }

  const profileRefs = adminIds.map((uid) => firestore.collection("users").doc(uid).get());
  const profileSnapshots = await Promise.all(profileRefs);
  const adminEmails = profileSnapshots
    .map((snapshot) => snapshot.data() as {email?: string} | undefined)
    .map((d) => d?.email)
    .filter((email): email is string => Boolean(email));

  const sendResult = await sendResendEmail(
    adminEmails,
    "Admin Notification - Virunga Expedition Tours",
    `<p>Type: ${escapeHtml(type)}</p>
     <p>User: ${safeName}</p>
     <p>Email: ${safeEmail}</p>`,
    FROM_NOREPLY,
  );

  return {success: sendResult, sent: adminEmails.length};
});

export const healthcheck = onCall(async () => ({
  ok: true,
  timestamp: Timestamp.now().toDate().toISOString(),
}));
