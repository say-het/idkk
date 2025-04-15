export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Invoke-RestMethod -Uri "https://idkk-lemon.vercel.app/api/app" -Method Post -Body (@{text="answer this"} | ConvertTo-json) -ContentType "application/json"');
  }

  const { text } = req.body;
  if (!text) return res.status(400).send('Text is required');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDKDTNmMrUHgZqbKNmbzxyR-ub7C0YFIwM`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }]
        })
      }
    );

    const data = await response.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.send(result.trim());
  } catch (err) {
    res.status(500).send(err.message);
  }
}
