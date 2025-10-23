import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import { io } from "socket.io-client";

export default function ClientChat() {
    const [clientId, setClientId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const chatEndRef = useRef(null);
    const socketRef = useRef(null);

    // Get client ID from token on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Decode JWT token to get user ID
                const payload = JSON.parse(atob(token.split('.')[1]));
                setClientId(payload.id);
            } catch (err) {
                console.error("Error decoding token:", err);
            }
        }
        setLoading(false);
    }, []);

    // Fetch messages when clientId is available
    useEffect(() => {
        const fetchMessages = async () => {
            if (!clientId) return;
            
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(
                    `http://localhost:4000/api/chat/${clientId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const data = await res.json();
                setMessages(data.messages || []);
            } catch (err) {
                console.error("Fetch messages error:", err);
            }
        };
        
        if (clientId) fetchMessages();
    }, [clientId]);

    // Setup socket connection
    useEffect(() => {
        if (!clientId) return;

        if (!socketRef.current) {
            socketRef.current = io("http://localhost:4000", { 
                withCredentials: true 
            });
            
            socketRef.current.on("chat:message", (message) => {
                // Only add message if it's for this client and not from this client
                if (message.clientId === clientId && message.sender !== "client") {
                    setMessages((prev) => [...prev, message]);
                }
            });
        }

        const socket = socketRef.current;
        socket.emit("join", { clientId, role: "client" });

        return () => {
            socket.emit("leave", { clientId });
        };
    }, [clientId]);

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !clientId) return;

        const msg = { 
            sender: "client", 
            text: newMessage, 
            clientId 
        };
        
        // Optimistic update
        setMessages((prev) => [...prev, msg]);
        setNewMessage("");

        try {
            const token = localStorage.getItem("token");
            
            // Persist via REST
            await fetch("http://localhost:4000/api/chat/message", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(msg),
            });
            
            // Realtime via socket (broadcast to dietitian)
            socketRef.current?.emit("chat:message", msg);
        } catch (err) {
            console.error("Send message error:", err);
            alert("Failed to send message");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex items-center justify-center flex-1">
                    <p className="text-gray-500">Loading chat...</p>
                </div>
            </div>
        );
    }

    if (!clientId) {
        return (
            <div className="flex flex-col h-screen bg-gray-100">
                <Header />
                <div className="flex items-center justify-center flex-1">
                    <p className="text-red-500">Please log in to use chat</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header />

            {/* Chat Title with profile */}
            <div className="px-4 py-3 bg-white border-b flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    D
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold">Dietitian</span>
                    <span className="text-sm text-gray-500">Your Health Coach</span>
                </div>
            </div>

            {/* Chat body */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`flex mb-3 ${
                                    msg.sender === "client"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                                        msg.sender === "client"
                                            ? "bg-blue-500 text-white rounded-br-none"
                                            : "bg-white text-black rounded-bl-none shadow-sm"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="p-4 bg-white border-t flex gap-2"
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
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </form>
        </div>
    );
}