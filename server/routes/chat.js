import express from 'express';
import { getMessages, sendMessage, markAsRead } from '../controllers/chatControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get chat history for a client
router.get('/:clientId', authMiddleware, getMessages);

// Send a message
router.post('/message', authMiddleware, sendMessage);

// Mark messages as read
router.put('/:clientId/read', authMiddleware, markAsRead);

export default router;