export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const text =
    req.method === "POST"
      ? req.body?.text
      : req.query?.text;

  if (!text) {
    return res.status(200).json({ result: "" });
  }

  try {
    const HF = await fetch(
      "https://router.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: `صحح هذا النص لغويًا ونحويًا وصرفيًا:\n${text}`,
        }),
      }
    );

    const data = await HF.json();
    const output = data?.generated_text || "";

    res.status(200).json({ result: output });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
