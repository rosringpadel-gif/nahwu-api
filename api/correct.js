export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const text = req.query.text || "";

  if (!text) {
    return res.status(200).json({ result: "" });
  }

  try {
    const HF = await fetch(
      "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`
        },
        body: JSON.stringify({
          inputs: `صحح هذا النص لغويًا ونحويًا وصرفيًا واجعله فصيحًا:\n${text}`
        })
      }
    );

    const data = await HF.json();

    let output = "";
    if (Array.isArray(data) && data[0]?.generated_text) {
      output = data[0].generated_text;
    } else if (data.generated_text) {
      output = data.generated_text;
    } else if (typeof data === "string") {
      output = data;
    } else {
      output = JSON.stringify(data);
    }

    res.status(200).json({ result: output });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
