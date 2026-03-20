import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server IT Asset Inventory API berjalan di port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`API:    http://localhost:${PORT}/api/assets`);
});