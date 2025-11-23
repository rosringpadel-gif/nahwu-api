export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://translate.argosopentech.com/translate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: req.body.text,
          source: "id",
          target: "ar",
          format: "text"
        })
      }
    );

    const data = await response.json();
    res.status(200).json({
      result:
        data.translatedText ||
        data.translated ||
        data.translated_text ||
        ""
    });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
