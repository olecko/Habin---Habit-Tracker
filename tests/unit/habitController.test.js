const habitController = require('../../controllers/habitController');
const Habit = require('../../models/Habit');

jest.mock('../../models/Habit');

describe('HabitController', () => {
  describe('createHabit', () => {
    it('should create a new habit', async () => {
      const mockHabit = {
        name: 'Read for 30 minutes',
        description: 'Read a book or article for 30 minutes each day.',
        frequency: 'daily'
      };
      Habit.create.mockReturnValue(mockHabit);
      const req = {
        body: {
          name: 'Read for 30 minutes',
          description: 'Read a book or article for 30 minutes each day.',
          frequency: 'daily'
        }
      };
      const res = {
        json: jest.fn()
      };
      await habitController.createHabit(req, res);
      expect(Habit.create).toHaveBeenCalledWith
