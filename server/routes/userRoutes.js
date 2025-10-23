import express from 'express';
import User from '../models/user.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all approved clients (users with userType: "user" and status: "Approved")
router.get('/clients', authMiddleware, async (req, res) => {
    try {
        console.log("📥 GET /api/users/clients - Fetching approved clients");
        console.log("Authenticated user:", req.user);
        
        // Only fetch approved users with userType "user"
        const users = await User.find({ 
            userType: "user",
            status: "Approved"  // Only approved users
        })
        .select('-password')
        .sort({ createdAt: -1 });
        
        console.log(`✅ Found ${users.length} approved clients`);
        if (users.length > 0) {
            console.log("Sample client:", users[0]);
        }
        
        // Format for frontend
        const clients = users.map(user => ({
            _id: user._id,
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            userType: user.userType,
            status: "online",
            createdAt: user.createdAt
        }));
        
        res.json(clients);
    } catch (err) {
        console.error("❌ Error fetching clients:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;