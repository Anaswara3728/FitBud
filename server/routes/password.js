const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    // Generate token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use App Password for Gmail
      },
    });

    // Send email with path param link
    const resetURL = `${process.env.BASE_URL}/resetpassword/${token}`;

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'FitBud Password Reset',
      text: `You requested a password reset. Click the link below:\n\n${resetURL}\n\nIf you did not request this, ignore this email.`,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Forgot password failed", error: err.message });
  }
});

// RESET PASSWORD
router.post('/resetpassword/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user by token and check expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Token invalid or expired" });

    // Hash password and save
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Reset password failed", error: err.message });
  }
});

module.exports = router;
