import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteNotificationRequest {
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
}

interface EmailResult {
  success: boolean;
  statusCode?: number;
  error?: string;
  messageId?: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function sendEmailWithRetry(
  emailData: any,
  retries = MAX_RETRIES
): Promise<EmailResult> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Email attempt ${attempt}/${retries}`);
      
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`Email sent successfully on attempt ${attempt}`);
        return {
          success: true,
          statusCode: response.status,
          messageId: result.id,
        };
      }

      // Handle specific errors
      if (response.status === 403) {
        console.error("Resend validation error:", result);
        return {
          success: false,
          statusCode: 403,
          error: "Email service requires domain verification. Please contact support.",
        };
      }

      // If not the last retry, wait before trying again
      if (attempt < retries) {
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        await sleep(RETRY_DELAY);
      } else {
        return {
          success: false,
          statusCode: response.status,
          error: result.message || "Failed to send email",
        };
      }
    } catch (error: any) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt < retries) {
        await sleep(RETRY_DELAY);
      } else {
        return {
          success: false,
          error: error.message || "Network error",
        };
      }
    }
  }

  return {
    success: false,
    error: "Max retries exceeded",
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteNotificationRequest = await req.json();

    console.log("Processing quote request from:", quoteData.email);

    // Send confirmation email to customer
    const customerEmailResult = await sendEmailWithRetry({
      from: "Virunga Expedition Tours <onboarding@resend.dev>",
      to: [quoteData.email],
      subject: "Thank You for Your Quote Request - Virunga Expedition Tours",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a5f3f;">Thank You, ${quoteData.full_name}!</h1>
          <p>We have received your quote request for your Rwanda adventure and are excited to help you plan an unforgettable experience.</p>
          
          <h2 style="color: #e86d2a;">Your Request Details:</h2>
          <ul style="line-height: 1.8;">
            <li><strong>Travel Dates:</strong> ${quoteData.preferred_travel_dates}</li>
            <li><strong>Number of Travelers:</strong> ${quoteData.number_adults} Adult(s)${quoteData.number_children > 0 ? `, ${quoteData.number_children} Child(ren)` : ''}</li>
            <li><strong>Trip Duration:</strong> ${quoteData.trip_duration}</li>
            <li><strong>Budget Range:</strong> ${quoteData.budget_range}</li>
            <li><strong>Accommodation:</strong> ${quoteData.accommodation_preference}</li>
            ${quoteData.tour_interests.length > 0 ? `<li><strong>Tour Interests:</strong> ${quoteData.tour_interests.join(', ')}</li>` : ''}
          </ul>

          <h3 style="color: #1a5f3f;">What Happens Next?</h3>
          <ol style="line-height: 1.8;">
            <li>Our team will review your requirements within 24 hours</li>
            <li>We'll prepare a customized itinerary and pricing</li>
            <li>You'll receive a detailed proposal via email</li>
            <li>We'll be available to adjust the itinerary to your preferences</li>
          </ol>

          <p style="margin-top: 30px;">
            <strong>Need immediate assistance?</strong><br/>
            WhatsApp: +250 783 959 404 (Lorraine)<br/>
            Email: info@virungaexpeditiontours.com<br/>
            Phone: +250 783 007 010
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Best regards,<br/>
            <strong>The Virunga Expedition Tours Team</strong><br/>
            Your Gateway to Rwanda's Extraordinary Wildlife
          </p>
        </div>
      `,
    });

    // Send notification email to team
    const teamEmailResult = await sendEmailWithRetry({
      from: "Quote Notification <onboarding@resend.dev>",
      to: ["info@virungaexpeditiontours.com"],
      subject: `New Quote Request from ${quoteData.full_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h1 style="color: #1a5f3f;">New Quote Request Received</h1>
          
          <h2>Customer Information:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.full_name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.phone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Country:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.country_residence}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nationality:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.nationality}</td></tr>
          </table>

          <h2 style="margin-top: 20px;">Trip Details:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Travel Dates:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.preferred_travel_dates} ${quoteData.flexible_dates ? '(Flexible)' : ''}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Travelers:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.number_adults} Adult(s), ${quoteData.number_children} Child(ren)</td></tr>
            ${quoteData.children_ages ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Children Ages:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.children_ages}</td></tr>` : ''}
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Duration:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.trip_duration}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.budget_range}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Accommodation:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${quoteData.accommodation_preference}</td></tr>
          </table>

          ${quoteData.tour_interests.length > 0 ? `
          <h2 style="margin-top: 20px;">Tour Interests:</h2>
          <p>${quoteData.tour_interests.join(', ')}</p>
          ` : ''}

          ${quoteData.special_requests ? `
          <h2 style="margin-top: 20px;">Special Requests:</h2>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${quoteData.special_requests}</p>
          ` : ''}

          ${quoteData.how_heard_about_us ? `
          <p><strong>Source:</strong> ${quoteData.how_heard_about_us}</p>
          ` : ''}

          <p style="margin-top: 30px; color: #e86d2a;"><strong>Action Required:</strong> Please respond within 24 hours</p>
        </div>
      `,
    });

    console.log("Email delivery status:", {
      customer: customerEmailResult,
      team: teamEmailResult,
    });

    // Return detailed status
    return new Response(
      JSON.stringify({
        success: customerEmailResult.success || teamEmailResult.success,
        delivery: {
          customerEmail: customerEmailResult,
          teamEmail: teamEmailResult,
        },
        message: customerEmailResult.success
          ? "Your quote request has been sent successfully!"
          : "Request saved but email delivery may be delayed. We'll respond via WhatsApp or email shortly.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-notification:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: "Please contact us directly via WhatsApp: +250 783 959 404",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
