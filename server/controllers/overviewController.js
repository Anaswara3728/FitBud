import Workout from '../models/workout.js';

export const getOverview = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Get yesterday's date range
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Get today's workouts
    const todayWorkouts = await Workout.find({ 
      userId,
      createdAt: { $gte: today, $lt: tomorrow }
    });
    
    // Get yesterday's workouts
    const yesterdayWorkouts = await Workout.find({ 
      userId,
      createdAt: { $gte: yesterday, $lt: today }
    });
    
    // Calculate today's stats
    const todayCalories = todayWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const todayMinutes = todayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const todaySteps = todayWorkouts.length * 1000; // Arbitrary, consider removing
    
    // Calculate yesterday's stats
    const yesterdayCalories = yesterdayWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const yesterdayMinutes = yesterdayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const yesterdaySteps = yesterdayWorkouts.length * 1000;
    
    // Calculate percentage changes
    const calcChange = (today, yesterday) => {
      if (yesterday === 0) return today > 0 ? '+100%' : '0%';
      const change = ((today - yesterday) / yesterday * 100).toFixed(0);
      return change > 0 ? `+${change}%` : `${change}%`;
    };
    
    const goalCompletion = Math.min(Math.round((todayMinutes / 60) * 100), 100);

    res.json({
      steps: todaySteps,
      stepsChange: calcChange(todaySteps, yesterdaySteps),
      caloriesBurned: todayCalories,
      caloriesChange: calcChange(todayCalories, yesterdayCalories),
      activeMinutes: todayMinutes,
      activeMinutesChange: calcChange(todayMinutes, yesterdayMinutes),
      goalCompletion
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getRecentWorkouts = async (req, res) => {
  try {
    const userId = req.user._id;
    const workouts = await Workout.find({ userId })
      .populate('planId', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};