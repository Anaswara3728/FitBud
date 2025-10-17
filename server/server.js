import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import passwordRoutes from "./routes/password.js";
import overviewRoutes from "./routes/overviewRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js"; 
import workoutsessionRoutes from "./routes/workoutsessionRoutes.js"; 
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);

app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("Server connected with Mongoose!");
});

app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/workout-plans", workoutRoutes); 
app.use("/api/workouts", workoutsessionRoutes); // NEW - for logging completed workouts
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});