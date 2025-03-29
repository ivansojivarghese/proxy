
// Vercel serverless function to act as proxy for image fetching
import fetch from 'node-fetch';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://media-sphere.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  const { url } = req.query; // URL of the image to proxy

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const response = await fetch(url);
    const imageBuffer = await response.buffer();
    
    res.setHeader('Content-Type', 'image/jpeg'); // Set appropriate content type
    res.status(200).send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching image' });
  }
}
