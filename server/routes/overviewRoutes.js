import express from 'express';
import { getOverview, getRecentWorkouts } from '../controllers/overviewController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/overview', authMiddleware, getOverview);
router.get('/workouts', authMiddleware, getRecentWorkouts);

export default router;
