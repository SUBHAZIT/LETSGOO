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

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    if (!email) {
      console.error("No email provided");
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing newsletter subscription for:", email);

    // Initialize Supabase client with service role
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("id, is_active")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return new Response(
          JSON.stringify({ success: true, message: "Already subscribed" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      } else {
        // Reactivate subscription
        await supabase
          .from("newsletter_subscribers")
          .update({ is_active: true, unsubscribed_at: null })
          .eq("id", existingSubscriber.id);
      }
    } else {
      // Insert new subscriber
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.toLowerCase().trim() });

      if (insertError) {
        console.error("Error inserting subscriber:", insertError);
        throw new Error("Failed to save subscription");
      }
    }

    console.log("Subscriber saved, sending welcome email to:", email);

    // Send welcome email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "LetsGoo <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to LetsGoo Newsletter! 🌍✈️",
        html: `
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
                      <td style="background: linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">
                          LETS<span style="color: #1a1a1a;">GOO</span>
                        </h1>
                        <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                          Your Adventure Awaits
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px;">
                          Thank You for Subscribing! 🎉
                        </h2>
                        <p style="color: #666666; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                          Welcome to the LetsGoo community! We're thrilled to have you on board.
                        </p>
                        <p style="color: #666666; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                          Get ready to receive:
                        </p>
                        <ul style="color: #666666; margin: 0 0 20px 0; padding-left: 20px; font-size: 16px; line-height: 1.8;">
                          <li>🗺️ Exciting travel destinations and hidden gems</li>
                          <li>💡 Expert travel tips and tricks</li>
                          <li>🎯 Exclusive deals and offers</li>
                          <li>📸 Stunning travel inspiration</li>
                          <li>📅 Upcoming events and adventures</li>
                        </ul>
                        <p style="color: #666666; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                          Start exploring now and plan your next unforgettable journey with us!
                        </p>
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td align="center">
                              <a href="https://letsgoo.world" style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: bold;">
                                Explore Now →
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
                        <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">
                          LETS<span style="color: #FF6B35;">GOO</span>
                        </p>
                        <p style="color: #999999; margin: 0 0 15px 0; font-size: 14px;">
                          Your trusted travel companion
                        </p>
                        <p style="color: #666666; margin: 0; font-size: 12px;">
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
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      // Still return success since subscription was saved
    } else {
      console.log("Welcome email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-welcome function:", error);
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
