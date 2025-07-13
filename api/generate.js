export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "db21e45c-7f1c-41d4-9010-49b58e29d3b9",
      input: { prompt }
    })
  });

  const data = await replicateResponse.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
