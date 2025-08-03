const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  height_cm: Number,
  weight_kg: Number,
  goal: String,
});

module.exports = mongoose.model('User', userSchema);
