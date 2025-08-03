const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
require('dotenv').config();

const connectDB = require('./db/connect');

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Start server after DB connects
connectDB().then(() => {
  mongoose.connection.once('open', async () => {
    console.log('✅ Connected to MongoDB');

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Collections:', collections.map(c => c.name));

    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  });
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
