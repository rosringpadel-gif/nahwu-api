export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const text = req.method === "POST"
    ? req.body?.text
    : req.query?.text;

  if (!text) {
    return res.status(200).json({ result: "" });
  }

  try {
    const HF_API = "https://router.huggingface.co";
    const model = "Qwen/Qwen2.5-7B-Instruct";

    const response = await fetch(`${HF_API}/hf-infer/${model}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `أضف التشكيل الكامل للنص العربي دون تغييره:\n${text}`
      })
    });

    const data = await response.json();

    let output = "";
    if (Array.isArray(data) && data[0]?.generated_text) {
      output = data[0].generated_text;
    }

    res.status(200).json({ result: output });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
