import request from 'supertest';
import app from '../src/app.js';

describe('IT Asset Inventory API', () => {

  // === TEST 1: GET All Assets ===
  describe('GET /api/assets', () => {
    it('should return 200 and list of assets', async () => {
      const res = await request(app).get('/api/assets');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('assets');
      expect(Array.isArray(res.body.data.assets)).toBe(true);
    });
  });

  // === TEST 2: POST Create Asset ===
  describe('POST /api/assets', () => {
    it('should create a new asset and return 201', async () => {
      const newAsset = {
        name: "Test Server",
        type: "Server",
        rack_position: "R-99-U01",
        status: "active",
        ip_address: "10.0.0.99"
      };
      const res = await request(app)
        .post('/api/assets')
        .send(newAsset);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test Server');
      expect(res.body.data).toHaveProperty('id');
    });

    it('should return 400 if required fields missing', async () => {
      const res = await request(app)
        .post('/api/assets')
        .send({ type: "Switch" });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('errors');
    });
  });

  // === TEST 3: DELETE Asset ===
  describe('DELETE /api/assets/:id', () => {
    it('should return 404 if asset not found', async () => {
      const res = await request(app).delete('/api/assets/id-tidak-ada');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});