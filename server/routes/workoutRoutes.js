import express from "express";
import WorkoutPlan from "../models/WorkoutPlan.js";

const router = express.Router();

// Get all workout plans
router.get("/", async (req, res) => {
    try {
        const plans = await WorkoutPlan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single workout plan by ID
router.get("/:id", async (req, res) => {
    try {
        const plan = await WorkoutPlan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        res.json(plan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new workout plan
router.post("/", async (req, res) => {
    const { name, exercises } = req.body;

    if (!name || !exercises || exercises.length === 0) {
        return res.status(400).json({ message: "Plan name and exercises required" });
    }

    try {
        const newPlan = new WorkoutPlan({ name, exercises });
        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a workout plan
router.put("/:id", async (req, res) => {
    try {
        const updatedPlan = await WorkoutPlan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPlan) return res.status(404).json({ message: "Plan not found" });
        res.json(updatedPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a workout plan
router.delete("/:id", async (req, res) => {
    try {
        const deletedPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
        if (!deletedPlan) return res.status(404).json({ message: "Plan not found" });
        res.json({ message: "Plan deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
