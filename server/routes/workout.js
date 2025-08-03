const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// GET all workouts
router.get('/', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

// POST a new workout
router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

module.exports = router;
