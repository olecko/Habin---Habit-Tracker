const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  frequency: {
    type: String,
    required: true
  },
  completions: [{
    type: Date
  }]
});

module.exports = mongoose.model('Habit', habitSchema);

