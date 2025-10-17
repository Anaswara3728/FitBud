import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userType: {
    type: String,
    enum: ['admin', 'user', 'dietitian'],
    default: 'user'
  },
  resetPasswordToken: String,      
  resetPasswordExpires: Date
}, { timestamps: true });

export default mongoose.model('User', userSchema);
