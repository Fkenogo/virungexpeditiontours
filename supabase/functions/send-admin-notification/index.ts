import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "new_user" | "inactive_users";
  userId?: string;
  userName?: string;
  userEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { type, userId, userName, userEmail }: NotificationRequest = await req.json();

    console.log("Processing admin notification:", { type, userId, userEmail });

    // Get all admin emails
    const { data: adminRoles, error: adminError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (adminError) {
      console.error("Error fetching admins:", adminError);
      throw new Error("Failed to fetch admin users");
    }

    if (!adminRoles || adminRoles.length === 0) {
      console.log("No admin users found");
      return new Response(
        JSON.stringify({ message: "No admin users to notify" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get admin emails from profiles
    const adminIds = adminRoles.map(r => r.user_id);
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("email")
      .in("id", adminIds);

    if (profileError) {
      console.error("Error fetching admin profiles:", profileError);
      throw new Error("Failed to fetch admin emails");
    }

    const adminEmails = profiles.map(p => p.email).filter(Boolean);

    if (adminEmails.length === 0) {
      console.log("No admin emails found");
      return new Response(
        JSON.stringify({ message: "No admin emails found" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let emailSubject = "";
    let emailHtml = "";

    if (type === "new_user") {
      emailSubject = "New User Registration - Virunga Expedition Tours";
      emailHtml = `
        <h2>New User Registered</h2>
        <p>A new user has registered on the Virunga Expedition Tours platform:</p>
        <ul>
          <li><strong>Name:</strong> ${userName || "Not provided"}</li>
          <li><strong>Email:</strong> ${userEmail}</li>
          <li><strong>User ID:</strong> ${userId}</li>
        </ul>
        <p>You can view and manage this user in the admin dashboard.</p>
      `;
    } else if (type === "inactive_users") {
      // Get inactive users (not signed in for 30+ days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: inactiveUsers, error: inactiveError } = await supabase
        .from("profiles")
        .select("email, full_name, last_sign_in")
        .lt("last_sign_in", thirtyDaysAgo.toISOString())
        .order("last_sign_in", { ascending: true })
        .limit(20);

      if (inactiveError) {
        console.error("Error fetching inactive users:", inactiveError);
        throw new Error("Failed to fetch inactive users");
      }

      if (!inactiveUsers || inactiveUsers.length === 0) {
        console.log("No inactive users found");
        return new Response(
          JSON.stringify({ message: "No inactive users found" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const userList = inactiveUsers
        .map(
          (u) =>
            `<li>${u.full_name || "Unknown"} (${u.email}) - Last active: ${
              u.last_sign_in
                ? new Date(u.last_sign_in).toLocaleDateString()
                : "Never"
            }</li>`
        )
        .join("");

      emailSubject = "Inactive Users Report - Virunga Expedition Tours";
      emailHtml = `
        <h2>Inactive Users Report</h2>
        <p>The following users haven't logged in for over 30 days:</p>
        <ul>${userList}</ul>
        <p>Consider reaching out to re-engage these users.</p>
      `;
    }

    // Send emails to all admins using Resend API
    const emailPromises = adminEmails.map(async (email) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Virunga Expedition Tours <onboarding@resend.dev>",
          to: [email],
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to send email: ${error}`);
      }

      return response.json();
    });

    const results = await Promise.allSettled(emailPromises);
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    const failedCount = results.filter((r) => r.status === "rejected").length;

    console.log(`Sent ${successCount} emails, ${failedCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failedCount,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-admin-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);