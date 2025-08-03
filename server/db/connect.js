const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // clean and simple!
    console.log('✅ MongoDB connection established');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    throw err;
  }
};

module.exports = connectDB;
