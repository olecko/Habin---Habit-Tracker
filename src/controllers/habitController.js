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

const updateHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const { name, description, frequency } = req.body;
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, { name, description, frequency }, { new: true });
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

module.exports = {
  createHabit,
  updateHabit,
  deleteHabit
};
