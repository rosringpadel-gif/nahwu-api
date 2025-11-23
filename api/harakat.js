import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const text = req.query.text || "";

  if (!text) return res.status(200).json({ result: "" });

  try {
    const HF = await fetch("https://router.huggingface.co/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "arbml/ARBML-Diacritization",
        messages: [
          {
            role: "user",
            content: `ضع التشكيل الكامل على النص التالي:\n${text}`
          }
        ]
      })
    });

    const data = await HF.json();
    const output = data.choices?.[0]?.message?.content || "";

    res.status(200).json({ result: output });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
