import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";

export default function DietitianDashboard() {
    const [activeClient, setActiveClient] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);
    const socketRef = useRef(null);

    const [clientsList, setClientsList] = useState([]);

    // Fetch clients list
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Fetching clients with token:", token ? "Token exists" : "No token");
                
                const res = await fetch("http://localhost:4000/api/users/clients", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                console.log("Response status:", res.status, res.statusText);
                
                if (!res.ok) {
                    console.error("Failed to fetch clients:", res.status);
                    return;
                }
                
                const data = await res.json();
                console.log("Fetched clients data:", data);
                console.log("Type of data:", typeof data, "Is array:", Array.isArray(data));
                
                // Handle different response formats
                if (Array.isArray(data)) {
                    setClientsList(data);
                } else if (data.clients && Array.isArray(data.clients)) {
                    setClientsList(data.clients);
                } else if (data.data && Array.isArray(data.data)) {
                    setClientsList(data.data);
                } else {
                    console.error("Unexpected data format:", data);
                    setClientsList([]);
                }
            } catch (err) {
                console.error("Fetch clients error:", err);
            }
        };
        fetchClients();
    }, []);

    // Fetch messages when active client changes
// In the fetchClients function
useEffect(() => {
    const fetchClients = async () => {
        try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }
            const data1 = await res.json();
            console.log("Fetched clients data:", data1);
            console.log("First client fullname:", data1[0]?.fullname);
            console.log("First client email:", data1[0]?.email);
            console.log("Full first client object:", data1[0]);
            console.log("Fetching clients...");
            
            const res = await fetch("http://localhost:4000/api/users/clients", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Failed to fetch clients:", errorData);
                return;
            }
            
            const data = await res.json();
            console.log("Fetched clients data:", data);
            
            setClientsList(data);
        } catch (err) {
            console.error("Fetch clients error:", err);
        }
    };
    fetchClients();
}, []);

    // Setup socket connection ONCE on mount
    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io("http://localhost:4000", { withCredentials: true });
            socketRef.current.on("chat:message", (message) => {
                if (!message?.clientId) return;
                
                // Only add if it's NOT from dietitian (to avoid duplicates with optimistic update)
                if (message.sender !== "dietitian") {
                    setMessages((prev) => ({
                        ...prev,
                        [message.clientId]: [
                            ...(prev[message.clientId] || []),
                            message,
                        ],
                    }));
                }
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    // Join all client rooms when clientsList is available
    useEffect(() => {
        if (!socketRef.current || clientsList.length === 0) return;
        
        console.log("Attempting to join rooms for clients:", clientsList);
        
        clientsList.forEach((client) => {
            const clientId = client._id || client.id;
            console.log("Client object:", client, "Client ID:", clientId);
            
            if (clientId) {
                socketRef.current.emit("join", { clientId: clientId, role: "dietitian" });
                console.log(`Dietitian joining room for client: ${clientId}`);
            } else {
                console.warn("Client has no _id or id:", client);
            }
        });
    }, [clientsList]);
    
    // Auto-scroll to bottom when messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeClient]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeClient) return;

        const clientId = activeClient._id || activeClient.id;
        if (!clientId) {
            console.error("Cannot send message: active client has no ID");
            return;
        }

        const msg = {
            sender: "dietitian",
            text: newMessage,
            clientId: clientId,
        };
        setMessages((prev) => ({
            ...prev,
            [clientId]: [...(prev[clientId] || []), msg],
        }));
        setNewMessage("");

        try {
            const token = localStorage.getItem("token");
            await fetch("http://localhost:4000/api/chat/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(msg),
            });
            socketRef.current?.emit("chat:message", msg);
        } catch (err) {
            console.error("Send message error:", err);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-1/4 bg-white border-r overflow-y-auto">
                    <div className="p-4 font-bold text-lg border-b">Clients</div>
                    {clientsList.length === 0 ? (
                        <div className="p-4 text-gray-500 text-center">No clients found</div>
                    ) : (
                        clientsList.map((client) => {
                            const clientId = client._id || client.id;
                            return (
                                <div
                                    key={clientId || Math.random()}
                                    onClick={() => setActiveClient(client)}
                                    className={`p-3 cursor-pointer hover:bg-gray-200 ${
                                        (activeClient?._id || activeClient?.id) === clientId ? "bg-gray-200" : ""
                                    }`}
                                >
                                    <div className="font-semibold">{client.fullname || client.email || "Unknown"}</div>
                                    <div
                                        className={`text-sm ${
                                            client.status === "online"
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {client.status || "offline"}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col">
                    {!activeClient ? (
                        <div className="flex items-center justify-center flex-1 text-gray-500">
                            Select a client to start chatting
                        </div>
                    ) : (
                        <>
                            {/* Chat Header with profile */}
                            <div className="p-4 bg-white border-b flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                    {activeClient.fullname?.[0] || activeClient.email?.[0] || "C"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{activeClient.fullname || activeClient.email || "Unknown Client"}</span>
                                    <span className="text-sm text-gray-500">
                                        {activeClient.email}
                                    </span>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                {((messages[activeClient._id || activeClient.id] || []).length === 0) ? (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-400">No messages yet. Start the conversation!</p>
                                    </div>
                                ) : (
                                    <AnimatePresence>
                                        {(messages[activeClient._id || activeClient.id] || []).map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={`flex mb-3 ${
                                                    msg.sender === "dietitian"
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                                                        msg.sender === "dietitian"
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}