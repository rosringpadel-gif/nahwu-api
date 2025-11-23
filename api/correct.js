export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  let text = "";

  try {
    text = req.method === "POST" ? req.body?.text : req.query.text;
  } catch {
    text = "";
  }

  if (!text?.trim()) {
    return res.status(200).json({ result: "" });
  }

  try {
    const HF = await fetch(
      "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          inputs: `صحح هذا النص لغويًا ونحويًا وصرفيًا واجعله فصيحًا:\n${text}`
        })
      }
    );

    const data = await HF.json();

    // --- HANDLE SEMUA BENTUK OUTPUT ---
    let output =
      data[0]?.generated_text ||
      data.generated_text ||
      data.text ||
      JSON.stringify(data);

    // Bersihkan noise khusus Qwen
    output = output
      .replace(/<\|im_start\|>assistant/g, "")
      .replace(/<\|im_end\|>/g, "")
      .trim();

    res.status(200).json({ result: output });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
