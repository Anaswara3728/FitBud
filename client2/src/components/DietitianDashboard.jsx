import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clients = [
    { id: 1, name: "Alice Johnson", status: "online" },
    { id: 2, name: "Bob Smith", status: "offline" },
    { id: 3, name: "Charlie Brown", status: "online" },
];

export default function DietitianDashboard() {
    const [activeClient, setActiveClient] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeClient) return;

        const dietitianMsg = { sender: "dietitian", text: newMessage };
        setMessages((prev) => ({
            ...prev,
            [activeClient.id]: [...(prev[activeClient.id] || []), dietitianMsg],
        }));
        setNewMessage("");

        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:4000/api/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: newMessage }),
            });
            const data = await res.json();

            if (data.reply) {
                const aiMsg = { sender: "ai", text: data.reply };
                setMessages((prev) => ({
                    ...prev,
                    [activeClient.id]: [
                        ...(prev[activeClient.id] || []),
                        aiMsg,
                    ],
                }));
            }
        } catch (err) {
            console.error("Chat Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r overflow-y-auto">
                <div className="p-4 font-bold text-lg border-b">Clients</div>
                {clients.map((client) => (
                    <div
                        key={client.id}
                        onClick={() => setActiveClient(client)}
                        className={`p-3 cursor-pointer hover:bg-gray-200 ${
                            activeClient?.id === client.id ? "bg-gray-200" : ""
                        }`}
                    >
                        <div className="font-semibold">{client.name}</div>
                        <div
                            className={`text-sm ${
                                client.status === "online"
                                    ? "text-green-600"
                                    : "text-gray-500"
                            }`}
                        >
                            {client.status}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
                {!activeClient ? (
                    <div className="flex items-center justify-center flex-1 text-gray-500">
                        Select a client to start chatting
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="p-4 bg-blue-600 text-white font-bold">
                            Chat with {activeClient.name}
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            <AnimatePresence>
                                {(messages[activeClient.id] || []).map(
                                    (msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={`flex mb-3 ${
                                                msg.sender === "dietitian"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`px-4 py-2 rounded-2xl max-w-xs ${
                                                    msg.sender === "dietitian"
                                                        ? "bg-blue-500 text-white rounded-br-none"
                                                        : msg.sender === "ai"
                                                          ? "bg-green-200 text-black rounded-bl-none"
                                                          : "bg-gray-300 text-black rounded-bl-none"
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ),
                                )}
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
                                disabled={isLoading}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                            >
                                {isLoading ? "..." : "Send"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
