const request = require('supertest');
const app = require('../src/app');

describe('UCI Cycling App', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/races', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/api/races');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('GET /api/rankings/mens', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/api/rankings/mens');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('GET /api/countdown/next', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/api/countdown/next');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });
});