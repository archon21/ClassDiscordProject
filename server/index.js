const express = require('express');
const path = require('path');
const ytdl = require('ytdl-core');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.query);
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  console.log(req.body);
  const data = await ytdl.getInfo(url);
  const { thumbnail_url } = data;
  console.log(data);
  res.status(200).json({ thumbnail_url });
  //   ytdl.pipe(path.join(__dirname, '..', 'public'));
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
