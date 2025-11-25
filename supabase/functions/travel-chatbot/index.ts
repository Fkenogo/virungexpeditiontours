import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a friendly and knowledgeable travel assistant for Virunga Expedition Tours, specializing in Rwanda safari experiences. Your role is to help visitors with quick questions about tours, bookings, and travel planning.

**Company Information:**
- Company: Virunga Expedition Tours
- Location: Based in Kigali, Rwanda
- Specialization: Gorilla trekking, wildlife safaris, and primate experiences
- Contact: WhatsApp +250 783 959 404, Email info@virungaexpeditiontours.com

**Key Tours & Experiences:**
1. **Mountain Gorilla Trekking** (Volcanoes National Park)
   - Permit: $1,500 per person (Non-refundable)
   - Age minimum: 15 years old
   - Fitness: Moderate to high required
   - Best time: June-September, December-February

2. **Golden Monkey Tracking** (Volcanoes National Park)
   - Permit: $100 per person
   - More accessible than gorilla trekking
   - Great for families and photographers

3. **Chimpanzee Trekking** (Nyungwe Forest)
   - Permit: $90 per person
   - Age minimum: 12 years old
   - Ancient rainforest experience

4. **Akagera Safari** (Akagera National Park)
   - Rwanda's Big Five experience
   - Lions, elephants, rhinos, buffalo, leopards
   - Game drives and boat safaris

5. **Canopy Walkway** (Nyungwe Forest)
   - East Africa's only canopy walkway
   - 50m above the forest floor
   - Spectacular views

**Booking & Payment:**
- 30% deposit required to secure booking
- Final payment due 60 days before departure
- Payment methods: Bank transfer, credit card
- Gorilla permits must be secured well in advance (often months ahead)

**Important Requirements:**
- Valid passport (6+ months validity)
- Rwanda visa (can be obtained on arrival or online)
- Comprehensive travel insurance MANDATORY
- Yellow fever vaccination certificate required
- COVID-19 protocols as per current regulations

**Cancellation Policy:**
- 60+ days before: 10% fee
- 30-59 days: 30% fee
- 15-29 days: 50% fee
- Less than 15 days: 75% fee
- Gorilla permits: Non-refundable once booked

**What's Included Typically:**
- Park entrance fees and permits
- Professional English-speaking guide
- 4x4 safari vehicle with pop-up roof
- Accommodation as per itinerary
- Meals as specified
- Bottled water during activities

**What's NOT Included:**
- International flights
- Rwanda visa fees
- Travel insurance
- Tips and gratuities
- Personal expenses
- Alcoholic beverages

**Your Communication Style:**
- Be warm, enthusiastic, and helpful
- Keep responses concise (2-3 short paragraphs max)
- Always encourage them to contact the team for detailed quotes
- For specific bookings or detailed itineraries, direct them to fill out the quote form or contact via WhatsApp
- Don't make up information - if unsure, direct them to the team
- Emphasize the importance of booking gorilla permits early

**Office Hours:** Monday-Saturday, 8:00 AM - 6:00 PM CAT (Rwanda time)

When users ask about booking or need detailed information, encourage them to:
1. Fill out the custom quote form on the Contact page
2. WhatsApp the team at +250 783 959 404 for immediate assistance
3. Email info@virungaexpeditiontours.com for detailed inquiries`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      throw new Error("Message is required");
    }

    console.log("Processing chatbot message:", message);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Lovable AI error:", error);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log("AI response generated successfully");

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in travel-chatbot function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        fallback: "I'm having trouble connecting right now. Please contact us directly via WhatsApp at +250 783 959 404 or email info@virungaexpeditiontours.com for immediate assistance."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
