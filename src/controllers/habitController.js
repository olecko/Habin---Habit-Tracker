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

    // Call the function to retrieve habits based on query
    const habits = await Habit.find(query).populate('user');
    res.status(200).json({ habits });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits' });
  }
};

const getHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(200).json({ habit });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habit' });
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
      completed: completed !== undefined ? completed : false,
    }, { new: true });
    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(200).json({ message: 'Habit updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating habit' });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    await Habit.findByIdAndDelete(habitId);
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit' });
  }
};

const completeHabit = async (req, res) => {
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
};

module.exports = {
  createHabit,
  getHabits,
  getHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
};

