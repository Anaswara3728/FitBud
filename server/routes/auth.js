const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const User = require('../models/user');


// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password, userType } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: " Email already registered" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      userType
    });

    await user.save();

    
    const allUsers = await User.find({});
    console.log('All users in DB:', allUsers);

    res.status(201).json({ message: " User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: " Signup failed", error: err.message });
  }
});


// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: " Invalid email or password" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: " Invalid email or password" });
    }

    res.json({ message: " Login successful", user });
  } catch (err) {
    res.status(500).json({ message: " Login failed", error: err.message });
  }
});

module.exports = router;
