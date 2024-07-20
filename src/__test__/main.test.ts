import request from 'supertest';
import app from "../index";


describe('user', () => {
  describe('POST /loggin', () => {
    it('should return 200 and otp is sent', async () => {
      const user = {
        email: "menna@buyer1234.com",
        password: 'Menna@buyer123',
      };
      const userResponse = await request(app).post('/api/user/login').send(user);
      expect(userResponse.status).toBe(200);
    });
  });
});
