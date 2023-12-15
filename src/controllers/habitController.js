const Habit = require('../models/Habit');

const createHabit = async (req, res) => {
  try {
    const { name, description, frequency } = req.body;
    const habit = new Habit({ name, description, frequency });
    await habit.save();
    res.status(201).json({ message: 'Habit created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating habit' });
  }
};

const getHabits = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query; // Get page and limit

    // Create query object based on parameters
    const query = {};

    // Filter by date range if provided
    if (startDate && endDate) {
      query.createdDate = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.createdDate = { $gte: startDate };
    } else if (endDate) {
      query.createdDate = { $lte: endDate };
    }

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * limit;

    // Find habits with query and pagination
    const habits = await Habit.find(query)
      .skip(skip)
      .limit(limit)
      .populate('user'); // Populate user data if needed

    // Build and return response with total count and paginated results
    const count = await Habit.countDocuments(query); // Get total number of matching habits
    res.status(200).json({
      habits,
      pagination: {
        page,
        limit,
        total: count,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits' });
  }
};


const updateHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const { name, description, frequency, completed } = req.body;
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, {
      name,
      description,
      frequency,
      completed: completed !== undefined ? completed : false, // default to false if not provided
    }, { new: true });
    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(200).json({ message: 'Habit updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating habit' });
  }
};

// Add a new route for marking habits as completed/uncompleted (PUT /habits/:id/complete)
router.put('/:id/complete', authMiddleware.verifyToken, async (req, res) => {
  try {
    const habitId = req.params.id;
    const { completed } = req.body;
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, { completed }, { new: true });
    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(200).json({ message: `Habit ${completed ? 'marked as completed' : 'marked as uncompleted'}` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating habit' });
  }
});

const deleteHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    await Habit.findByIdAndDelete(habitId);
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit' });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit
};
