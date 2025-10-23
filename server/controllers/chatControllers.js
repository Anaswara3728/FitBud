import Chat from '../models/chat.js';

export const getMessages = async (req, res) => {
    try {
        const { clientId } = req.params;
        
        let chat = await Chat.findOne({ clientId });
        
        if (!chat) {
            chat = new Chat({ clientId, messages: [] });
            await chat.save();
        }
        
        res.json({ messages: chat.messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { clientId, sender, text } = req.body;
        
        if (!clientId || !sender || !text) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        let chat = await Chat.findOne({ clientId });
        
        if (!chat) {
            chat = new Chat({ clientId, messages: [] });
        }
        
        chat.messages.push({ sender, text, clientId });
        await chat.save();
        
        res.status(201).json({ message: 'Message sent', chat });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { clientId } = req.params;
        
        await Chat.updateOne(
            { clientId },
            { $set: { "messages.$[].read": true } }
        );
        
        res.json({ message: 'Messages marked as read' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};