const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Add protected routes for users
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
// ... add other user routes ...

module.exports = router;

