const express = require('express');
const { ytmp4 } = require('ruhend-scraper');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/',(req, res) => {
  res.send('/api/ytdl?url=')
})
app.post('/api/ytdl', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL YouTube harus disertakan!' });
  try {
    const data = await ytmp4(url);
    const { title, video, author, description, duration, views, upload, thumbnail } = data;
    res.status(200).json({ title, video, author, description, duration, views, upload, thumbnail });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data YouTube' });
  }
});

app.get('/api/ytdl', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL YouTube harus disertakan!' });
  try {
    const data = await ytmp4(url);
    const { title, video, author, description, duration, views, upload, thumbnail } = data;
    res.status(200).json({ title, video, author, description, duration, views, upload, thumbnail });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data YouTube' });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

module.exports = app