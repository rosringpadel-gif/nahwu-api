export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HF_API_KEY}`
        },
        body: JSON.stringify({
          inputs: `صحح هذا النص لغويًا ونحويًا وصرفيًا واجعله فصيحًا:\n${req.body.text}`
        })
      }
    );

    const data = await response.json();
    res.status(200).json({ result: data[0].generated_text });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
