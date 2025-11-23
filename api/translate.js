export default async function handler(req, res) {
  try {
    let q = "";

    // Jika memakai POST
    if (req.method === "POST" && req.body) {
      const body = JSON.parse(req.body || "{}");
      q = body.text || "";
    }

    // Jika memakai GET
    if (req.method === "GET") {
      q = req.query.text || "";
    }

    if (!q) {
      return res.status(200).json({
        result: "NO QUERY. Use /api/translate?text=kalimat"
      });
    }

    const text = encodeURIComponent(q);
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=id|ar`;

    const response = await fetch(url);
    const data = await response.json();

    const result =
      data?.responseData?.translatedText ||
      data?.matches?.[0]?.translation ||
      "";

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
