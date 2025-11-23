export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const text = req.query.text || "";
  if (!text.trim()) {
    return res.status(200).json({ result: "" });
  }

  try {
    const prompt =
      "صحح هذا النص لغويًا ونحويًا وصرفيًا واجعله فصيحًا: " + text;

    const response = await fetch(
      "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(prompt) +
        "&langpair=ar|ar"
    );

    const data = await response.json();
    const out =
      data.responseData.translatedText ||
      data.responseData.translated_text ||
      "";

    res.status(200).json({ result: out });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
