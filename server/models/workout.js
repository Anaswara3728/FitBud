import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    planId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'WorkoutPlan' 
    },
    planName: String,
    duration: { type: Number, required: true }, // minutes
    caloriesBurned: { type: Number, default: 0 },
    notes: String
}, { timestamps: true });

export default mongoose.model("Workout", WorkoutSchema);