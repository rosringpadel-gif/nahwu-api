export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body || "{}");

    const response = await fetch(
      "https://api-inference.huggingface.co/models/CAMeL-Lab/arabic-text-diacritizer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HF_API_KEY}`
        },
        body: JSON.stringify({ inputs: body.text })
      }
    );

    const data = await response.json();

    res.status(200).json({ result: data[0].generated_text });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
