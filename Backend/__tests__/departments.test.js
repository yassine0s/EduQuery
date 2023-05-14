// __tests__/admin.test.js
const request = require('supertest');
const app = require('../app'); // Import your Express app
const mockDepartments = require('./mock_data/departments.json');

describe('Department routes', () => {
  // Example test for /users endpoint
  test('GET /departments should return a list of departments', async () => {
    const response = await request(app).get('/departments');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  describe('POST /departments', () => {
    test.each(mockDepartments)('should create new departments', async (department) => {
      const response = await request(app).post('/departments').send(department);
      expect(response.status).toBe(201);
    });
  });});
