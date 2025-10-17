import express from "express";
import WorkoutPlan from "../models/workoutPlan.js"; 
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all workout plans for logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const plans = await WorkoutPlan.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 });
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single workout plan by ID (only if user owns it)
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const plan = await WorkoutPlan.findOne({ 
            _id: req.params.id, 
            createdBy: req.user._id 
        });
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        res.json(plan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new workout plan
router.post("/", authMiddleware, async (req, res) => {
    const { name, exercises } = req.body;

    if (!name || !exercises || exercises.length === 0) {
        return res.status(400).json({ message: "Plan name and exercises required" });
    }

    try {
        const newPlan = new WorkoutPlan({ 
            name, 
            exercises,
            createdBy: req.user._id  // Associate with logged-in user
        });
        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a workout plan (only if user owns it)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedPlan = await WorkoutPlan.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            { name: req.body.name, exercises: req.body.exercises },
            { new: true }
        );
        if (!updatedPlan) return res.status(404).json({ message: "Plan not found or unauthorized" });
        res.json(updatedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a workout plan (only if user owns it)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedPlan = await WorkoutPlan.findOneAndDelete({ 
            _id: req.params.id, 
            createdBy: req.user._id 
        });
        if (!deletedPlan) return res.status(404).json({ message: "Plan not found or unauthorized" });
        res.json({ message: "Plan deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;