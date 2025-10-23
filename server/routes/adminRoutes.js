import express from "express";
import User from "../models/user.js";
import { updateUserStatus, deleteUser, validateUserEmail } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authMiddleware);

// Admin role verification middleware
router.use((req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
});

// GET all pending users (status: "Pending")
router.get('/pending', async (req, res) => {
  try {
    console.log("🔥 GET /api/admin/pending - Fetching pending users");
    const users = await User.find({ status: "Pending" })
      .select('-password')
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${users.length} pending users`);
    res.json({ users });
  } catch (err) {
    console.error("❌ Error fetching pending users:", err);
    res.status(500).json({ 
      message: "Failed to fetch pending users", 
      error: err.message 
    });
  }
});

// GET all users (for Manage Users page) - includes Approved and Denied
router.get('/all-users', async (req, res) => {
  try {
    console.log("📥 GET /api/admin/all-users - Fetching all users");
    const users = await User.find({ 
      status: { $in: ["Approved", "Denied"] } 
    })
    .select('-password')
    .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${users.length} total users (Approved/Denied)`);
    res.json({ users }); // Changed to consistent format
  } catch (err) {
    console.error("❌ Error fetching all users:", err);
    res.status(500).json({ 
      message: "Failed to fetch users", 
      error: err.message 
    });
  }
});

// GET all approved users only
router.get('/', async (req, res) => {
  try {
    console.log("📥 GET /api/admin - Fetching approved users");
    const users = await User.find({ status: "Approved" })
      .select('-password')
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${users.length} approved users`);
    res.json({ users }); // Changed to consistent format
  } catch (err) {
    console.error("❌ Error fetching approved users:", err);
    res.status(500).json({ 
      message: "Failed to fetch approved users", 
      error: err.message 
    });
  }
});

// PATCH approve/deny user
router.patch("/:id/status", updateUserStatus);

// POST validate user email
router.post("/:id/validate-email", validateUserEmail);

// DELETE user
router.delete("/:id", deleteUser);

export default router;