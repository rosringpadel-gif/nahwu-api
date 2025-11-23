export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body || "{}");
    const text = encodeURIComponent(body.text || "");

    // MyMemory free translation API
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=id|ar`;

    const response = await fetch(url);
    const data = await response.json();

    let result =
      data.responseData?.translatedText ||
      data.matches?.[0]?.translation ||
      "";

    res.status(200).json({ result });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
