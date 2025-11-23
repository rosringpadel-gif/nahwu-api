export default async function handler(req, res) {
  // CORS wajib
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const body = JSON.parse(req.body || "{}");
    const text = body.text || "";

    const response = await fetch(
      "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer hf_xxx_ganti_tokenmu"
        },
        body: JSON.stringify({
          inputs: `صحح هذا النص لغويًا ونحويًا وصرفيًا واجعله فصيحًا:\n${text}`
        })
      }
    );

    const data = await response.json();

    const result = data[0]?.generated_text || "";

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
