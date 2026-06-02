export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  try {
    const { messages, system } = req.body;

    // Build Gemini contents array
    const contents = [];

    // Add system prompt as first user message if provided
    if (system) {
      contents.push({
        role: "user",
        parts: [{ text: `[SİSTEM TALİMATI]: ${system}` }]
      });
      contents.push({
        role: "model",
        parts: [{ text: "Anlaşıldı, talimatlara uygun şekilde Türkçe yanıt vereceğim." }]
      });
    }

    // Add conversation messages
    for (const msg of messages) {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ]
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(response.status).json({ error: data.error?.message || "Gemini API hatası" });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Return in Anthropic-compatible format so frontend works unchanged
    return res.status(200).json({
      content: [{ type: "text", text }]
    });

  } catch (error) {
    console.error("API route error:", error);
    return res.status(500).json({ error: "Sunucu hatası: " + error.message });
  }
}
