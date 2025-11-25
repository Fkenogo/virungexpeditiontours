import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  message: string;
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
    const { name, email, message }: InquiryRequest = await req.json();

    console.log("Processing inquiry from:", email);

    // Send confirmation to customer
    const customerEmailResult = await sendEmailWithRetry({
      from: "Virunga Expedition Tours <onboarding@resend.dev>",
      to: [email],
      subject: "We Received Your Message - Virunga Expedition Tours",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a5f3f;">Thank You for Contacting Us!</h1>
          <p>Hi ${name},</p>
          <p>We have received your message and will respond as soon as possible, usually within 24 hours.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #e86d2a;">Your Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>
            <strong>Need immediate assistance?</strong><br/>
            WhatsApp: +250 783 959 404<br/>
            Email: info@virungaexpeditiontours.com<br/>
            Phone: +250 783 007 010
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Best regards,<br/>
            <strong>The Virunga Expedition Tours Team</strong>
          </p>
        </div>
      `,
    });

    // Send notification to team
    const teamEmailResult = await sendEmailWithRetry({
      from: "Inquiry Notification <onboarding@resend.dev>",
      to: ["info@virungaexpeditiontours.com"],
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a5f3f;">New Inquiry Received</h1>
          
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #e86d2a;"><strong>Action Required:</strong> Please respond within 24 hours</p>
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
          ? "Your message has been sent successfully!"
          : "Message saved but email delivery may be delayed. We'll respond via WhatsApp or email shortly.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-notification:", error);
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
