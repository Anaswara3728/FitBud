import express from "express";
import Workout from "../models/workout.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { planId, planName, duration, caloriesBurned, notes } = req.body;

    const workout = new Workout({
      userId: req.user._id,
      planId,
      planName,
      duration,
      caloriesBurned,
      notes,
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id })
      .populate("planId", "name")
      .sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
