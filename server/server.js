import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import passwordRoutes from "./routes/password.js";
import overviewRoutes from "./routes/overviewRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js"; 
import workoutsessionRoutes from "./routes/workoutsessionRoutes.js"; 
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CREATE HTTP SERVER FIRST
const httpServer = http.createServer(app);

// THEN CREATE SOCKET.IO SERVER
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

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
app.use("/api/workouts", workoutsessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin",adminRoutes)

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    // Join room based on clientId
    socket.on("join", ({ clientId, role }) => {
        socket.join(`client_${clientId}`);
        console.log(`${role} joined room: client_${clientId}`);
    });
    
    // Leave room
    socket.on("leave", ({ clientId }) => {
        socket.leave(`client_${clientId}`);
        console.log(`User left room: client_${clientId}`);
    });
    
    // Handle chat messages
    socket.on("chat:message", (message) => {
        const { clientId } = message;
        // Broadcast to everyone in the room EXCEPT the sender
        // (sender already has optimistic update)
        socket.broadcast.to(`client_${clientId}`).emit("chat:message", message);
        console.log(`Message broadcast to room client_${clientId}:`, message.text);
    });
    
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// USE httpServer.listen() NOT app.listen()
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});