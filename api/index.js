import express from 'express';
import { ytmp4, ytmp3 } from 'ruhend-scraper';

const app = express();
const PORT = 9456;

app.use(express.json());

app.use((req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  console.log(`IP ${clientIP} mengakses ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('/api/ytdl?url=urlnya&type=mp3/mp4');
});

app.get('/api/ytdl', async (req, res) => {
  const { url, type } = req.query;
  if (!url || !type) {
    return res.status(400).json({ error: 'URL YouTube dan tipe (mp3/mp4) harus disertakan!' });
  }

  try {
    let data;
    if (type === 'mp4') {
      data = await ytmp4(url);
    } else if (type === 'mp3') {
      data = await ytmp3(url);
    } else {
      return res.status(400).json({ error: 'Tipe yang didukung hanya mp3 atau mp4!' });
    }

    const { title, video, audio, author, description, duration, views, upload, thumbnail } = data;
    res.status(200).json({
      author: "Herza",
      status: 200,
      data: {
        title,
        download: type === 'mp4' ? video : audio,
        author,
        description,
        duration,
        views,
        upload,
        thumbnail,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data YouTube' });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

export default app;
