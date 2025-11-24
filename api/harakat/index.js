export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const text = req.body?.text || req.query?.text || "";
  if (!text) {
    return res.status(200).json({ result: "" });
  }

  try {
    const response = await fetch("https://router.huggingface.co", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "CAMeL-Lab/arabic-text-diacritizer",
        inputs: text
      })
    });

    const data = await response.json();

    const output =
      data.generated_text ||
      data[0]?.generated_text ||
      "";

    res.status(200).json({ result: output });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
