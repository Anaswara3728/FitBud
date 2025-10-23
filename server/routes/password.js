import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

const router = express.Router();

// Forgot Password - Generate and send reset token
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("\n=== FORGOT PASSWORD REQUEST ===");
    console.log("📧 Email:", email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "Email not found" });
    }
    
    console.log("✅ User found:", user.email);

    // Generate token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    console.log("🔑 Generated token:", token);
    console.log("⏰ Token expires at:", new Date(user.resetPasswordExpires).toLocaleString());
    
    await user.save();
    console.log("✅ Token saved to database");

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetURL = `${process.env.BASE_URL}/resetpassword/${token}`;
    console.log("🔗 Reset URL:", resetURL);

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'FitTrack Password Reset',
      text: `You requested a password reset. Click the link below:\n\n${resetURL}\n\nIf you did not request this, ignore this email.`,
    });

    console.log("✅ Email sent successfully\n");
    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("❌ FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Forgot password failed", error: err.message });
  }
});

// Reset Password - Verify token and update password
router.post('/resetpassword/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("\n=== RESET PASSWORD REQUEST ===");
    console.log("🔑 Received token:", token);
    console.log("🔑 Token length:", token.length);
    console.log("⏰ Current time:", new Date().toLocaleString());
    console.log("⏰ Current timestamp:", Date.now());

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("❌ No user found with valid token");
      
      // Additional debugging: check if token exists but is expired
      const expiredUser = await User.findOne({ resetPasswordToken: token });
      if (expiredUser) {
        console.log("⚠️  Token exists but is expired!");
        console.log("   User:", expiredUser.email);
        console.log("   Token expired at:", new Date(expiredUser.resetPasswordExpires).toLocaleString());
        console.log("   Current time:", new Date().toLocaleString());
        console.log("   Time difference:", (Date.now() - expiredUser.resetPasswordExpires) / 60000, "minutes past expiry");
      } else {
        console.log("⚠️  Token not found in database at all");
        
        // Check if any users have reset tokens
        const usersWithTokens = await User.find({ resetPasswordToken: { $exists: true, $ne: null } });
        console.log("📊 Users with reset tokens in DB:", usersWithTokens.length);
        if (usersWithTokens.length > 0) {
          console.log("   Available tokens:", usersWithTokens.map(u => ({
            email: u.email,
            token: u.resetPasswordToken?.substring(0, 10) + "...",
            expires: new Date(u.resetPasswordExpires).toLocaleString()
          })));
        }
      }
      
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    console.log("✅ User found:", user.email);
    console.log("✅ Token expires at:", new Date(user.resetPasswordExpires).toLocaleString());
    console.log("✅ Time remaining:", Math.floor((user.resetPasswordExpires - Date.now()) / 60000), "minutes");

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log("✅ Password reset successful for:", user.email);
    console.log("✅ Token cleared from database\n");
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Reset password failed", error: err.message });
  }
});

export default router;