const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const authMiddleware = require('../middleware/auth');

// Add protected routes for habits
router.get('/', authMiddleware.verifyToken, habitController.getHabits);
router.post('/', authMiddleware.verifyToken, habitController.createHabit);
router.get('/:id', authMiddleware.verifyToken, habitController.getHabit);
router.put('/:id', authMiddleware.verifyToken, habitController.updateHabit);
router.delete('/:id', authMiddleware.verifyToken, habitController.deleteHabit);
// ... add other habit routes ...

module.exports = router;

