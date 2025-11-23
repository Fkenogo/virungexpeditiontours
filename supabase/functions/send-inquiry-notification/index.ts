import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: InquiryRequest = await req.json();

    // Send confirmation to customer
    const customerEmail = await resend.emails.send({
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
    const teamEmail = await resend.emails.send({
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

    console.log("Inquiry emails sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
