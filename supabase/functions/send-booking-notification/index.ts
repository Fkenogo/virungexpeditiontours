import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  bookingId: string;
  tourName: string;
  bookingDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPeople: number;
  totalPrice: number;
  specialRequests?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

interface EmailResult {
  success: boolean;
  error?: string;
}

const sendEmailWithRetry = async (
  emailData: any,
  retries = MAX_RETRIES
): Promise<EmailResult> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Sending email (attempt ${attempt}/${retries})`);
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if it's a validation error (don't retry these)
        if (response.status === 403 || response.status === 400) {
          console.error('Validation error, not retrying:', data);
          return { success: false, error: data.message || 'Validation error' };
        }
        throw new Error(data.message || 'Email send failed');
      }

      console.log('Email sent successfully:', data);
      return { success: true };
    } catch (error: any) {
      console.error(`Email attempt ${attempt} failed:`, error);
      
      if (attempt < retries) {
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        await sleep(RETRY_DELAY);
      } else {
        return { success: false, error: error.message };
      }
    }
  }
  
  return { success: false, error: 'Max retries exceeded' };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingNotificationRequest = await req.json();
    
    console.log('Processing booking notification:', booking.bookingId);

    // Format the booking date for display
    const formattedDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send confirmation email to customer
    const customerEmailResult = await sendEmailWithRetry({
      from: "Virunga Expedition Tours <bookings@resend.dev>",
      to: [booking.customerEmail],
      subject: `Booking Confirmation - ${booking.tourName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; }
              .detail-row { padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
              .label { font-weight: bold; color: #2E7D32; }
              .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px; }
              .button { display: inline-block; background: #2E7D32; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Booking Request Received!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for choosing Virunga Expedition Tours</p>
              </div>
              
              <div class="content">
                <p>Dear ${booking.customerName},</p>
                
                <p>We have received your booking request for <strong>${booking.tourName}</strong>. Our team will review your request and confirm availability within 24 hours.</p>
                
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #2E7D32;">Booking Details</h3>
                  
                  <div class="detail-row">
                    <span class="label">Tour:</span> ${booking.tourName}
                  </div>
                  
                  <div class="detail-row">
                    <span class="label">Date:</span> ${formattedDate}
                  </div>
                  
                  <div class="detail-row">
                    <span class="label">Number of People:</span> ${booking.numberOfPeople}
                  </div>
                  
                  <div class="detail-row">
                    <span class="label">Total Price:</span> $${booking.totalPrice}
                  </div>
                  
                  <div class="detail-row">
                    <span class="label">Booking ID:</span> ${booking.bookingId}
                  </div>
                  
                  ${booking.specialRequests ? `
                  <div class="detail-row">
                    <span class="label">Special Requests:</span><br>
                    ${booking.specialRequests}
                  </div>
                  ` : ''}
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>Our team will confirm tour availability</li>
                  <li>You'll receive a confirmation email with payment instructions</li>
                  <li>After payment, you'll receive your tour itinerary and preparation guide</li>
                </ul>
                
                <p>If you have any questions, feel free to reply to this email or contact us:</p>
                <ul>
                  <li>Phone: +250 783 007 010</li>
                  <li>WhatsApp: +250 783 959 404</li>
                  <li>Email: info@virungaexpeditiontours.com</li>
                </ul>
                
                <div style="text-align: center;">
                  <a href="https://wa.me/250783959404" class="button">Contact Us on WhatsApp</a>
                </div>
              </div>
              
              <div class="footer">
                <p><strong>Virunga Expedition Tours</strong></p>
                <p>Experience the magic of Rwanda's wildlife and landscapes</p>
                <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply directly to this message.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Customer email result:', customerEmailResult);

    // Send notification to admin
    const adminEmailResult = await sendEmailWithRetry({
      from: "Virunga Booking System <bookings@resend.dev>",
      to: ["info@virungaexpeditiontours.com"],
      subject: `🔔 New Booking Request - ${booking.tourName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1976D2; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; }
              .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
              .detail-box { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; }
              .detail-row { padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
              .label { font-weight: bold; color: #1976D2; display: inline-block; width: 150px; }
              .button { display: inline-block; background: #2E7D32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🎉 New Booking Request</h1>
              </div>
              
              <div class="content">
                <div class="alert">
                  <strong>Action Required:</strong> Please review and confirm this booking request within 24 hours.
                </div>
                
                <div class="detail-box">
                  <h3 style="margin-top: 0; color: #1976D2;">Tour Information</h3>
                  <div class="detail-row">
                    <span class="label">Tour Name:</span> ${booking.tourName}
                  </div>
                  <div class="detail-row">
                    <span class="label">Date:</span> ${formattedDate}
                  </div>
                  <div class="detail-row">
                    <span class="label">Number of People:</span> ${booking.numberOfPeople}
                  </div>
                  <div class="detail-row">
                    <span class="label">Total Price:</span> $${booking.totalPrice}
                  </div>
                </div>
                
                <div class="detail-box">
                  <h3 style="margin-top: 0; color: #1976D2;">Customer Information</h3>
                  <div class="detail-row">
                    <span class="label">Name:</span> ${booking.customerName}
                  </div>
                  <div class="detail-row">
                    <span class="label">Email:</span> <a href="mailto:${booking.customerEmail}">${booking.customerEmail}</a>
                  </div>
                  <div class="detail-row">
                    <span class="label">Phone:</span> <a href="tel:${booking.customerPhone}">${booking.customerPhone}</a>
                  </div>
                  ${booking.specialRequests ? `
                  <div class="detail-row">
                    <span class="label">Special Requests:</span><br>
                    <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 5px;">
                      ${booking.specialRequests}
                    </div>
                  </div>
                  ` : ''}
                </div>
                
                <div class="detail-box">
                  <h3 style="margin-top: 0; color: #1976D2;">Booking Reference</h3>
                  <div class="detail-row">
                    <span class="label">Booking ID:</span> ${booking.bookingId}
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="tel:${booking.customerPhone}" class="button" style="background: #1976D2;">📞 Call Customer</a>
                  <a href="https://wa.me/${booking.customerPhone.replace(/[^0-9]/g, '')}" class="button" style="background: #25D366;">💬 WhatsApp</a>
                </div>
                
                <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">
                  <strong>Next Steps:</strong><br>
                  1. Verify tour availability for the requested date<br>
                  2. Contact the customer to confirm the booking<br>
                  3. Send payment instructions<br>
                  4. Update booking status in the admin dashboard
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Admin email result:', adminEmailResult);

    // Check if both emails were sent successfully
    const success = customerEmailResult.success && adminEmailResult.success;
    
    return new Response(
      JSON.stringify({
        success,
        customerEmail: customerEmailResult,
        adminEmail: adminEmailResult,
      }),
      {
        status: success ? 200 : 207, // 207 = Multi-Status (partial success)
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
