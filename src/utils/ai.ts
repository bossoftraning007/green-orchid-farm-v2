import { MAIN_WHATSAPP_NUMBER, buildWhatsAppUrl } from './whatsapp';

const AI_SETTINGS_KEY = 'farmhouse_ai_settings';

export interface AISettings {
  geminiApiKey: string;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function getAISettings(): AISettings {
  try {
    const raw = localStorage.getItem(AI_SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading AI settings', e);
  }
  return { geminiApiKey: '' };
}

export function saveAISettings(settings: Partial<AISettings>): void {
  const current = getAISettings();
  const updated = { ...current, ...settings };
  try {
    localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving AI settings', e);
  }
}

export function getBusinessContext(): string {
  return `You are "Ganesh AI", an intelligent sales assistant for Green Orchid Farm Land, a luxury farmhouse project in Kothur, Hyderabad.

## PROJECT OVERVIEW
- Name: Green Orchid Farm Land
- Location: Near Kothur & JP Dargah, NH-44 Bangalore Highway, Hyderabad
- Total Area: 5.5 Acres
- Total Plots: 72 Units
- Status: 100% Government Approved (HMDA Approved)

## PROPERTIES
1. 1BHK Luxury Farmhouse
   - Price: ₹21,00,000 (Original: ₹24,00,000)
   - Plot Size: 121 sq.yards
   - House Size: 350 sq.ft
   - Tag: Best Deal
   - Includes: Fully furnished with 8 items (King-size bed, ceiling fans, dining table, LED TV, refrigerator, barbecue grill, sofa set, garden chairs)
   - Features: Government Approved Layout, Organic Fruit Trees, 2 Years FREE Maintenance, Gated Community with Perimeter Wall

2. 2BHK Villa Farmhouse
   - Price: ₹35,00,000
   - Plot Size: 242 sq.yards
   - House Size: 350 sq.ft
   - Tag: Premium
   - Includes: All 8 furniture items included
   - Features: Government Approved Layout, Organic Fruit Trees, 2 Years FREE Maintenance, Premium Road Facing Plot

## AMENITIES
- Swimming Pool (resort-style)
- Club House for events
- Cricket Net Practice
- Visitor Rooms for guests
- Organic Fruit Plants (Mango, Guava, Chikoo) in every plot
- Children Play Area
- Gated Compound Wall (5.5 acres fully secured)
- Grand Arch Entrance with security cabin
- 30 Feet Blacktop Roads with street lights
- 24/7 Security & CCTV
- Private Gated Community
- Landscaped Park Area

## LOCATION ADVANTAGES
- JP Dargah: 1 km (2 mins)
- Microsoft Data Center: 2 km (4 mins)
- Kothur Commercial Hub: 5 km (7 mins)
- Shamshabad International Airport: 18 km (15 mins)
- Outer Ring Road Exit 16: 16 km (15 mins)
- Gachibowli IT Financial District: 35 km (30 mins)

## KEY SELLING POINTS
- Spot registration available (same-day assistance)
- Pattadar Passbook from Dharani portal within 15 working days
- 24-month flexible payment plan (25% booking + monthly EMIs)
- 2 Years FREE Maintenance (security, water, tree care, common area upkeep)
- Free pick & drop service for site visits from Airport & ORR Exit 16
- All plots are freehold with clear titles

## CONTACT
- R. Ganesh Sir: +91 9505903371
- Alternative: +91 9849754071
- WhatsApp: https://wa.me/919505903371

## BEHAVIOR RULES
- Be warm, professional, and persuasive
- Always mention the limited-time offer aspect
- When user shows interest, guide them to book a site visit or send WhatsApp inquiry
- If user asks about price, mention both 1BHK (₹21L) and 2BHK (₹35L) options
- If user asks about registration, emphasize spot registration and freehold status
- If user mentions budget concerns, highlight the flexible 24-month payment plan
- Keep responses concise (2-3 short paragraphs max)
- Use emojis sparingly to make it engaging
- NEVER make up information not in the context above`;
}

export function getSystemPrompt(userMessage: string): string {
  return `${getBusinessContext()}

## CURRENT USER MESSAGE
"${userMessage}"

## YOUR RESPONSE`;
}

export async function callGeminiAPI(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'AI API request failed');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from AI');
  return text.trim();
}

export function getWhatsAppLink(message: string): string {
  return buildWhatsAppUrl(message, MAIN_WHATSAPP_NUMBER);
}

export function extractLeadFromMessage(message: string): { name?: string; phone?: string; email?: string } {
  const result: { name?: string; phone?: string; email?: string } = {};

  const phoneMatch = message.match(/\b\d{10}\b/);
  if (phoneMatch) result.phone = phoneMatch[0];

  const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) result.email = emailMatch[0];

  const namePatterns = [
    /my name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /i am\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /this is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /name[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)[,\s]+my\s+phone/i,
  ];

  for (const pattern of namePatterns) {
    const match = message.match(pattern);
    if (match && match[1] && match[1].length > 2) {
      result.name = match[1];
      break;
    }
  }

  return result;
}
