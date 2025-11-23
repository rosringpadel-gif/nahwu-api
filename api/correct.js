import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const text = req.query.text || "";
  if (!text) return res.status(200).json({ result: "" });

  try {
    const HF = await fetch(
      "https://router.huggingface.co/hf-inference/v1/models/Qwen/Qwen2.5-7B-Instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          inputs:
            `صحح هذا النص لغويًا ونحويًا وصرفيًا واجعله فصيحًا:\n${text}`
        }),
      }
    );

    const data = await HF.json();

    const output =
      data.generated_text ||
      data[0]?.generated_text ||
      "";

    return res.status(200).json({ result: output });

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
