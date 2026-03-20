import express from 'express';
const app = express();
import assetRoutes from './routes/assetRoutes.js';

// Middleware: parsing JSON body
app.use(express.json());

// Health Check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    message: "IT Asset Inventory API is running",
    timestamp: new Date().toISOString(),
  });
});

// Asset routes
app.use('/api/assets', assetRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

export default app;
