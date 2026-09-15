const DEFAULT_MODEL = 'gemini-2.0-flash';

const prompt = `You are an accessibility assistant.
Analyze only what is observable in the supplied image.
Prioritize:
- obstacles and possible hazards
- stairs or changes in level
- doors and entrances
- important signs and readable text
- important objects and people
- obvious directional information
Be concise and factual.
Do not invent details.
Do not claim exact distances unless the image provides a reliable basis.
If something is unclear, say so.
Return a short plain-language description suitable for text-to-speech.
This is an assistive description, not certified safety guidance.`;

export async function describeImage(imageData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const error = new Error('GEMINI_API_KEY is not configured.');
    error.status = 503;
    error.publicMessage = 'Vision analysis is not configured yet. Add GEMINI_API_KEY in Replit Secrets, or continue with the other tools.';
    throw error;
  }
  const base64 = imageData.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: 'image/jpeg', data: base64 } }] }] }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.error?.message || 'Gemini could not analyze the image.');
    error.status = response.status >= 500 ? 502 : 400;
    error.publicMessage = 'The vision service could not analyze this frame. Please try again.';
    throw error;
  }
  const description = body.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join(' ').trim();
  if (!description) {
    const error = new Error('Gemini returned no description.');
    error.status = 502;
    error.publicMessage = 'The vision service returned no description. Please try another frame.';
    throw error;
  }
  return description;
}