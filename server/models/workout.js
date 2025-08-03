const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  type: String,
  duration_min: Number,
  calories_burned: Number,
});

module.exports = mongoose.model('Workout', workoutSchema);
