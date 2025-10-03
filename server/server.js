import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import passwordRoutes from "./routes/password.js";
import overviewRoutes from "./routes/overviewRoutes.js";
import workoutPlansRoutes from "./routes/workoutRoutes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
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
app.use("/api", overviewRoutes);
app.use("/api/workout-plans", workoutPlansRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
