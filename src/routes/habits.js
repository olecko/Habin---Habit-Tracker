const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const authMiddleware = require('../middleware/auth');

// Get habits with optional user filter and pagination
router.get('/', authMiddleware.verifyToken, (req, res) => {
  const userId = req.user.id; // Extract user ID from token
  const query = { page: req.query.page || 1, limit: req.query.limit || 10 }; // Default page and limit

  // Build query based on optional filter parameters
  if (req.query.userId) {
    query.user = req.query.userId;
  }
  if (req.query.startDate) {
    query.createdDate = { $gte: req.query.startDate };
  }
  if (req.query.endDate) {
    query.createdDate = { $lte: req.query.endDate };
  }

  habitController.getHabits(query, req, res); // Pass query to controller
});

// Add protected routes for habits, including completion route
router.get('/', authMiddleware.verifyToken, habitController.getHabits);
router.post('/', authMiddleware.verifyToken, habitController.createHabit);
router.get('/:id', authMiddleware.verifyToken, habitController.getHabit);
router.put('/:id', authMiddleware.verifyToken, habitController.updateHabit);
router.delete('/:id', authMiddleware.verifyToken, habitController.deleteHabit);
router.put('/:id/complete', authMiddleware.verifyToken, habitController.completeHabit);

module.exports = router;;
