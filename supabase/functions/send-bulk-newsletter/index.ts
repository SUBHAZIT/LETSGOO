import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BulkEmailRequest {
  subject: string;
  content: string;
  subscriberIds?: string[]; // Optional: send to specific subscribers
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, content, subscriberIds }: BulkEmailRequest = await req.json();

    if (!subject || !content) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing bulk newsletter with subject:", subject);

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get active subscribers
    let query = supabase
      .from("newsletter_subscribers")
      .select("id, email, unsubscribe_token")
      .eq("is_active", true);

    if (subscriberIds && subscriberIds.length > 0) {
      query = query.in("id", subscriberIds);
    }

    const { data: subscribers, error: fetchError } = await query;

    if (fetchError) {
      console.error("Error fetching subscribers:", fetchError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "No active subscribers found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending to ${subscribers.length} subscribers`);

    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    // Send emails one by one (Resend free tier limitation)
    for (const subscriber of subscribers) {
      const unsubscribeUrl = `${SUPABASE_URL}/functions/v1/newsletter-unsubscribe?token=${subscriber.unsubscribe_token}`;
      
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="background: linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                        LETS<span style="color: #1a1a1a;">GOO</span>
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <div style="color: #333333; font-size: 16px; line-height: 1.8;">
                        ${content}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #1a1a1a; padding: 25px; text-align: center;">
                      <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
                        LETS<span style="color: #FF6B35;">GOO</span>
                      </p>
                      <p style="color: #666666; margin: 10px 0 0 0; font-size: 12px;">
                        <a href="${unsubscribeUrl}" style="color: #888888; text-decoration: underline;">Unsubscribe from newsletter</a>
                      </p>
                      <p style="color: #666666; margin: 5px 0 0 0; font-size: 12px;">
                        © ${new Date().getFullYear()} LetsGoo. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "LetsGoo <onboarding@resend.dev>",
            to: [subscriber.email],
            subject: subject,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          successCount++;
          console.log(`Email sent to: ${subscriber.email}`);
        } else {
          const errorData = await res.text();
          console.error(`Failed to send to ${subscriber.email}:`, errorData);
          failCount++;
          errors.push(`${subscriber.email}: ${errorData}`);
        }
      } catch (err: any) {
        console.error(`Error sending to ${subscriber.email}:`, err);
        failCount++;
        errors.push(`${subscriber.email}: ${err.message}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`Bulk email complete. Success: ${successCount}, Failed: ${failCount}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: successCount, 
        failed: failCount,
        total: subscribers.length,
        errors: errors.length > 0 ? errors : undefined
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-bulk-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
