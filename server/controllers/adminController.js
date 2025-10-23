import User from "../models/user.js";
import nodemailer from "nodemailer";
import validator from "validator";

// Create transporter once (more efficient)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Validate status
    if (!["Approved", "Denied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the user's status
    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send email notification
    try {
      const transporter = createTransporter();

      if (status === "Approved") {
        await transporter.sendMail({
          from: `"FitTrack" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Your FitTrack Account Has Been Approved! 🎉",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #6366f1;">Welcome to FitTrack, ${user.fullname}!</h2>
              <p>Great news! Your FitTrack account has been approved.</p>
              <p>You can now log in and start your fitness journey:</p>
              <a href="http://localhost:5173/login" 
                 style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                Log In Now
              </a>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Best regards,<br>The FitTrack Team</p>
            </div>
          `,
        });
      } else if (status === "Denied") {
        await transporter.sendMail({
          from: `"FitTrack" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Update on Your FitTrack Account",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Hello ${user.fullname},</h2>
              <p>Thank you for your interest in FitTrack.</p>
              <p>Unfortunately, we are unable to approve your account registration at this time.</p>
              <p>If you believe this is an error or have questions, please contact our support team at ${process.env.EMAIL_USER}.</p>
              <p>Best regards,<br>The FitTrack Team</p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails
    }

    res.json({ 
      message: `User status updated to ${status}`, 
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      message: "User deleted successfully", 
      deletedUser: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "Pending" })
      .select('-password') // Don't send passwords
      .sort({ createdAt: -1 });
    
    console.log(`Found ${users.length} pending users`);
    res.json(users);
  } catch (err) {
    console.error("Error fetching pending users:", err);
    res.status(500).json({ message: "Failed to fetch pending users", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ 
      status: { $in: ["Approved", "Denied"] } 
    })
    .select('-password') // Don't send passwords
    .sort({ createdAt: -1 });
    
    console.log(`Found ${users.length} total users (Approved/Denied)`);
    res.json(users);
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// Validate user email and send alert to admin
export const validateUserEmail = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate email format
    const isEmailValid = validator.isEmail(user.email);
    
    // Check if email domain is valid (basic check)
    const emailDomain = user.email.split('@')[1];
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const isDomainValid = commonDomains.includes(emailDomain.toLowerCase()) || 
                         emailDomain.includes('.') && emailDomain.split('.').length >= 2;

    const validationResult = {
      email: user.email,
      isValid: isEmailValid && isDomainValid,
      issues: []
    };

    if (!isEmailValid) {
      validationResult.issues.push("Invalid email format");
    }
    if (!isDomainValid) {
      validationResult.issues.push("Suspicious email domain");
    }

    // Send alert to admin if email is invalid
    if (!validationResult.isValid) {
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"FitTrack Admin Alert" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER, // Admin email
          subject: "⚠️ Invalid Email Alert - User Registration",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">⚠️ Invalid Email Alert</h2>
              <p><strong>User Details:</strong></p>
              <ul>
                <li><strong>Name:</strong> ${user.fullname}</li>
                <li><strong>Email:</strong> ${user.email}</li>
                <li><strong>User Type:</strong> ${user.userType}</li>
                <li><strong>Registration Date:</strong> ${user.createdAt}</li>
              </ul>
              <p><strong>Issues Found:</strong></p>
              <ul>
                ${validationResult.issues.map(issue => `<li style="color: #dc2626;">${issue}</li>`).join('')}
              </ul>
              <p style="color: #dc2626; font-weight: bold;">Please review this user registration carefully before approval.</p>
            </div>
          `,
        });
        console.log("Admin alert sent for invalid email:", user.email);
      } catch (emailError) {
        console.error("Failed to send admin alert:", emailError);
      }
    }

    res.json({
      message: "Email validation completed",
      validation: validationResult,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        userType: user.userType,
        status: user.status
      }
    });
  } catch (error) {
    console.error("Error validating user email:", error);
    res.status(500).json({ message: error.message });
  }
};