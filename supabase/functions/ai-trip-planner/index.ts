import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are Wanderlust AI, an expert travel planner specializing in personalized trip itineraries. You focus primarily on Indian destinations but can plan trips worldwide.

Your capabilities:
- Create detailed day-by-day itineraries with activities, timings, and local experiences
- Suggest budget breakdowns in multiple currencies
- Recommend the best time to visit destinations
- Provide local tips, hidden gems, and cultural insights
- Suggest adventure activities, treks, and unique experiences
- Account for travel logistics, visa requirements, and safety tips

When creating itineraries:
1. Ask clarifying questions about preferences (adventure level, budget, interests, travel dates)
2. Provide structured responses with clear sections
3. Include approximate costs in INR and USD
4. Recommend local food, accommodation, and transport options
5. Add helpful emojis for readability

Keep responses conversational but informative. Be enthusiastic about travel! 🌏`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const aiApiKey = Deno.env.get("AI_API_KEY");
    const aiApiEndpoint = Deno.env.get("AI_API_ENDPOINT") || "https://api.openai.com/v1/chat/completions";
    
    if (!aiApiKey) {
      console.error("AI_API_KEY is not configured");
      throw new Error("AI_API_KEY is not configured");
    }

    console.log("Processing trip planner request with messages:", messages.length);

    const response = await fetch(aiApiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${aiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in ai-trip-planner function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
