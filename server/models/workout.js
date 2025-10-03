import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    muscle: { type: String, required: true },
    exercise: { type: String, required: true }
});

const WorkoutPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exercises: [ExerciseSchema],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("WorkoutPlan", WorkoutPlanSchema);
