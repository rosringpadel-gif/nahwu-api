// api/correct.js
export default async function handler(req, res) {
  // Izinkan CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const body = await req.body || "";

    // Jika body adalah string JSON → parse
    const text = typeof body === "string"
      ? JSON.parse(body).text
      : body.text;

    if (!text) return res.status(200).json({ result: "" });

    // Belum ada API khusus koreksi nahwu-shorof → sementara return apa adanya
    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
