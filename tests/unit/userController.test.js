const userController = require('../../src/controllers/userController');
const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');

jest.mock('../../src/models/User');
jest.mock('bcryptjs');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {
  describe('updateProfile', () => {
    it('should handle validation errors', async () => {
      const req = {
        body: {}, // Missing required fields intentionally
        user: {
          id: 'userId',
        },
      };

      const response = mockResponse();

      await userController.updateProfile(req, response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({ message: expect.any(String), status: 400 });
    });
  });
});
