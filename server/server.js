
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import passwordRoutes from "./routes/password.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true,               // if you send cookies (optional)
  })
);

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server connected with Mongoose!");
});

app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
