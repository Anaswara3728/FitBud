import express from "express";
import { sendMessage } from "../controllers/chatControllers.js";

const router = express.Router();

// POST /api/chat/message
router.post("/message", sendMessage);

export default router;
