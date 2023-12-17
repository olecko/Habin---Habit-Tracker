const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Add protected routes for users
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

// Update user profile (email, password, and optional additional fields)
router.put('/profile', authMiddleware.verifyToken, async (req, res) => {
  const { firstName, lastName, ...rest } = req.body; // Extract additional fields (optional)

  const updatedFields = rest; // Base updated fields on request body

  // Add optional fields if provided
  if (firstName) updatedFields.firstName = firstName;
  if (lastName) updatedFields.lastName = lastName;

  try {
    await userController.updateProfile(updatedFields, req.user.id);
    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile.' });
  }
});

// Delete user account (automatically deletes associated habits)
router.delete('/', authMiddleware.verifyToken, async (req, res) => {
  try {
    await userController.deleteUser(req.user.id);
    res.json({ message: 'Account deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account.' });
  }
});

module.exports = router;
