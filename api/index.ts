import express, { Request, Response, NextFunction } from 'express';
import { ytmp4 } from 'ruhend-scraper';

const app = express();
const PORT = 9456;

app.use(express.json());

// Middleware untuk log IP
app.use((req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip || req.connection.remoteAddress || 'Tidak diketahui';
  console.log(`IP ${clientIP} mengakses ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('/api/ytdl?url=');
});

app.post('/api/ytdl', async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL YouTube harus disertakan!' });
  }
  try {
    const data = await ytmp4(url);
    const { title, video, author, description, duration, views, upload, thumbnail } = data;
    res.status(200).json({
      author: "Herza",
      status: 200,
      data: {
        title,
        video,
        author,
        description,
        duration,
        views,
        upload,
        thumbnail,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data YouTube' });
  }
});

app.get('/api/ytdl', async (req: Request, res: Response) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL YouTube harus disertakan!' });
  }
  try {
    const data = await ytmp4(url as string);
    const { title, video, author, description, duration, views, upload, thumbnail } = data;
    res.status(200).json({
      author: "Herza",
      status: 200,
      data: {
        title,
        video,
        author,
        description,
        duration,
        views,
        upload,
        thumbnail,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data YouTube' });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

export default app;
