const userController = require('../../controllers/userController');
const User = require('../../models/User');

jest.mock('../../models/User');

describe('UserController', () => {
  // ... existing tests ...

  describe('updateProfile', () => {
    it('should throw an error for missing password', async () => {
      // ... test setup with missing password ...
      expect(userController.updateProfile(body, user)).rejects.toEqual({
        message: 'Password is required',
        status: 400,
      });
    });
  });
});

