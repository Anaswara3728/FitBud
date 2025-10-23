import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    clientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sender: { 
        type: String, 
        enum: ['client', 'dietitian'], 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    read: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

const ChatSchema = new mongoose.Schema({
    clientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true 
    },
    messages: [MessageSchema]
}, { timestamps: true });

export default mongoose.model("Chat", ChatSchema);