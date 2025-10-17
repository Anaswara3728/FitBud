import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientChat({ clientId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);

    // Fetch messages on mount
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(
                    `http://localhost:4000/api/chat/${clientId}`
                );
                const data = await res.json();
                setMessages(data.messages || []);
            } catch (err) {
                console.error("Fetch messages error:", err);
            }
        };
        if (clientId) fetchMessages();
    }, [clientId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = { sender: "client", text: newMessage, clientId };
        setMessages((prev) => [...prev, msg]);
        setNewMessage("");

        try {
            await fetch("http://localhost:4000/api/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(msg),
            });
        } catch (err) {
            console.error("Send message error:", err);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="p-4 bg-blue-600 text-white font-bold text-lg">
                Client Chat
            </div>

            {/* Chat body */}
            <div className="flex-1 p-4 overflow-y-auto">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex mb-3 ${
                                msg.sender === "client"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`px-4 py-2 rounded-2xl max-w-xs ${
                                    msg.sender === "client"
                                        ? "bg-blue-500 text-white rounded-br-none"
                                        : "bg-gray-300 text-black rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="p-4 bg-white flex gap-2"
            >
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full"
                >
                    Send
                </button>
            </form>
        </div>
    );
}