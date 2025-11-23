// api/harakat.js
export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const body = await req.body || "";

    const text = typeof body === "string"
      ? JSON.parse(body).text
      : body.text;

    if (!text) return res.status(200).json({ result: "" });

    // Belum ada API harakat → return teks asli (sementara)
    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
