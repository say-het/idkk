import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const { text } = req.body;
  if (!text) return res.status(400).send('Text is required');

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBpG8tUWy18F3x0aOVVotWpTV1xfKUmWP8`,
      {
        contents: [{ parts: [{ text }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.send(result.trim());
  } catch (err) {
    res.status(500).send(err.message);
  }
}
