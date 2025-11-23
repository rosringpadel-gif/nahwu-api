export default async function handler(req, res) {
  // CORS
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
      "https://api-inference.huggingface.co/models/CAMeL-Lab/arabic-text-diacritizer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer hf_xxxTOKENxxx" // ganti tokenmu
        },
        body: JSON.stringify({ inputs: text })
      }
    );

    const data = await response.json();

    let result = "";

    if (Array.isArray(data)) {
      result = data[0]?.generated_text || "";
    } else if (data.generated_text) {
      result = data.generated_text;
    } else if (typeof data === "object") {
      result = JSON.stringify(data);
    }

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
