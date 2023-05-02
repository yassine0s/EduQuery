// __tests__/admin.test.js
const request = require('supertest');
const app = require('../app'); // Import your Express app
const mockQuestions = require('./mock_data/questions.json');


describe('Question routes', () => {
  // Example test for /users endpoint
  test('GET /questions should return a list of questions', async () => {
    const response = await request(app).get('/questions');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  describe('POST /questions', () => {
    test.each(mockQuestions)('should create a new question', async (question) => {
      const response = await request(app).post('/questions').send(question);
      expect(response.status).toBe(201);
      // Add more assertions based on your API response
    });
  });

});
