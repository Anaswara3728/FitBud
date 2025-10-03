import Workout from '../models/workout.js';

// Mock stats calculation based on workouts
export const getOverview = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you have auth middleware
    const workouts = await Workout.find({ userId });

    const steps = workouts.length * 1000; // example calculation
    const caloriesBurned = workouts.length * 100; // example
    const activeMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
    const goalCompletion = Math.min(Math.round((activeMinutes / 60) * 100), 100);

    res.json({
      steps,
      stepsChange: '+15%',
      caloriesBurned,
      caloriesChange: '-5%',
      activeMinutes,
      activeMinutesChange: '+10%',
      goalCompletion
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecentWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const workouts = await Workout.find({ userId }).sort({ createdAt: -1 }).limit(5);
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
