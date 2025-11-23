export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  let text = req.method === "POST" ? req.body?.text : req.query.text;
  if (!text?.trim()) return res.status(200).json({ result: "" });

  try {
    const HF = await fetch(
      "https://api-inference.huggingface.co/models/CAMeL-Lab/arabic-text-diacritizer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({ inputs: text })
      }
    );

    const data = await HF.json();

    const output =
      data.diacritized_text ||        // format benar dari model CAMeL
      data[0]?.diacritized_text ||    
      "";

    res.status(200).json({ result: output });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
