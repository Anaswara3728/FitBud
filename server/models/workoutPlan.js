import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    muscle: { type: String, required: true },
    exercise: { type: String, required: true },
    sets: Number,
    reps: Number
});

const WorkoutPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exercises: [ExerciseSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("WorkoutPlan", WorkoutPlanSchema);