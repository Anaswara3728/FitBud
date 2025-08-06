const express = require('express');
const cors = require('cors'); // ✅ add this
const app = express();

const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
require('dotenv').config();

const connectDB = require('./db/connect');

// ✅ Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // ✅ this line
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Start server
connectDB().then(() => {
  console.log("✅ connectDB() resolved");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
