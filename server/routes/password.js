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
    if (!user) return res.status(400).json({ message: " Email not found" });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    
    console.log(" Reset token (for testing):", token);

    res.json({ message: " Reset token generated. Check console for token." });

    /*
    // Original email code (keep commented while testing)
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
    });

    const mailOptions = {
      to: user.email,
      from: 'no-reply@fitbud.com',
      subject: 'FitBud Password Reset',
      text: `Reset your password using the link: http://localhost:4000/reset-password/${token}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: " Reset link sent to your email" });
    */
  } catch (err) {
    res.status(500).json({ message: " Forgot password failed", error: err.message });
  }
});



// RESET PASSWORD
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: " Token invalid or expired" });
    if (password !== confirmPassword) return res.status(400).json({ message: " Passwords do not match" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: " Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: " Reset password failed", error: err.message });
  }
});

module.exports = router;
