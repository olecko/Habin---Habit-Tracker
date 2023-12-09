const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  habits: [{
    type: Schema.Types.ObjectId,
    ref: 'Habit'
  }]
});

module.exports = mongoose.model('User', userSchema);

