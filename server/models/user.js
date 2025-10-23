
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ["user", "dietitian", "admin"], default: "user" },
    status: { type: String, enum: ["Pending", "Approved", "Denied"], default: "Pending" },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
