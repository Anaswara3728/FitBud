import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const initialClients = [
    {
        id: 1,
        name: "Sophia Carter",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
        status: "Online",
    },
    {
        id: 2,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
        status: "Offline",
    },
    {
        id: 3,
        name: "Peter Jones",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&h=100&auto=format&fit=crop",
        status: "Online",
    },
];

const initialConversations = {
    1: [
        {
            from: "client",
            text: "Hi Dr. Chloe, I want to improve my current diet and set some specific goals. Can you help?",
        },
        {
            from: "dietitian",
            text: "Hi Sophia! I'd be happy to help. Let's start with your diet, as this will provide a solid foundation.",
        },
        { from: "client", text: "Great! What's the first step?" },
    ],
    2: [
        {
            from: "client",
            text: "Good morning, I had a question about my meal plan for today.",
        },
    ],
    3: [
        {
            from: "dietitian",
            text: "Hi Peter, checking in on your progress this week. How are things going?",
        },
    ],
};

const dietitianAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop";

// --- Reusable Sub-components ---

const ClientList = ({ clients, activeClientId, onClientSelect }) => (
    <aside className="w-80 bg-gray-800 flex-shrink-0 flex flex-col hidden sm:flex">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">My Clients</h1>
        </div>
        <div className="flex-grow overflow-y-auto">
            <nav className="mt-4">
                {clients.map((client) => (
                    <a
                        key={client.id}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onClientSelect(client.id);
                        }}
                        className={`flex items-center py-4 px-6 text-gray-300 hover:bg-gray-700 transition duration-200 ${client.id === activeClientId ? "bg-gray-700" : ""}`}
                    >
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={client.avatar}
                            alt={client.name}
                        />
                        <div className="ml-4 flex-grow">
                            <p className="font-semibold text-white">
                                {client.name}
                            </p>
                            <p
                                className={`text-sm ${client.status === "Online" ? "text-green-400" : "text-gray-500"}`}
                            >
                                {client.status}
                            </p>
                        </div>
                    </a>
                ))}
            </nav>
        </div>
    </aside>
);

const ChatHeader = ({ client }) => {
    if (!client) {
        return (
            <header className="flex items-center justify-between h-20 px-8 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://placehold.co/100x100/6366f1/white?text=S"
                        alt="Client Avatar"
                    />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-white">
                            Select a Client
                        </h2>
                        <p className="text-sm text-gray-400">
                            No client selected
                        </p>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="flex items-center justify-between h-20 px-8 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center">
                <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={client.avatar}
                    alt={client.name}
                />
                <div className="ml-4">
                    <h2 className="text-xl font-semibold text-white">
                        {client.name}
                    </h2>
                    <p
                        className={`text-sm ${client.status === "Online" ? "text-green-400" : "text-gray-500"}`}
                    >
                        {client.status}
                    </p>
                </div>
            </div>
        </header>
    );
};

const Message = ({ msg, client }) => {
    const isDietitian = msg.from === "dietitian";
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 ${isDietitian ? "justify-end" : ""}`}
        >
            {!isDietitian && (
                <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={client.avatar}
                    alt={client.name}
                />
            )}
            <div
                className={`${isDietitian ? (msg.isSuggestion ? "bg-teal-600" : "bg-indigo-500") : "bg-gray-700"} p-3 rounded-lg max-w-lg`}
            >
                {msg.isSuggestion && (
                    <p className="text-xs text-indigo-200 mb-1 font-semibold">
                        AI Suggestion
                    </p>
                )}
                <p className="text-white">{msg.text}</p>
            </div>
            {isDietitian && (
                <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={dietitianAvatar}
                    alt="Dietitian Avatar"
                />
            )}
        </motion.div>
    );
};

const ChatFooter = ({ onSendMessage, activeClientId, isLoading }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && activeClientId) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <footer className="p-4 bg-gray-800 border-t border-gray-700">
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center mb-2 flex items-center justify-center"
                    >
                        <div className="loader"></div>
                        <p className="text-sm text-gray-400 ml-2">
                            AI is thinking...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    disabled={!activeClientId || isLoading}
                />
                <button
                    type="submit"
                    className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-5 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!activeClientId || isLoading}
                >
                    Send
                </button>
            </form>
        </footer>
    );
};

// --- Dietitian Dashboard Component ---

export default function DietitianDashboard() {
    const [clients] = useState(initialClients);
    const [conversations, setConversations] = useState(initialConversations);
    const [activeClientId, setActiveClientId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const activeClient = clients.find((c) => c.id === activeClientId);
    const activeConversation = conversations[activeClientId] || [];

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeConversation]);

    const getGeminiChatResponse = async (prompt) => {
        setIsLoading(true);
        const apiKey = ""; // Will be handled by the environment

        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `As a dietitian, give a helpful and encouraging response to this client's message: "${prompt}"`,
                            },
                        ],
                    },
                ],
            };
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok)
                throw new Error(
                    `API request failed with status ${response.status}`,
                );

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                handleSendMessage(text, true); // Send as AI suggestion
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (error) {
            console.error("Gemini API Error:", error);
            // Handle error in UI, e.g., show a system message
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = (text, isSuggestion = false) => {
        if (!text.trim() || !activeClientId) return;

        const newMessage = {
            from: "dietitian",
            text,
            isSuggestion,
        };

        setConversations((prev) => ({
            ...prev,
            [activeClientId]: [...(prev[activeClientId] || []), newMessage],
        }));

        if (!isSuggestion) {
            getGeminiChatResponse(text);
        }
    };

    return (
        <>
            <style>{`
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #111827; }
                ::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #4b5563; }
                .loader { border: 4px solid #f3f3f3; border-radius: 50%; border-top: 4px solid #6366f1; width: 24px; height: 24px; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
            <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
                <ClientList
                    clients={clients}
                    activeClientId={activeClientId}
                    onClientSelect={setActiveClientId}
                />
                <main className="flex-1 flex flex-col">
                    <ChatHeader client={activeClient} />
                    <div className="flex-grow p-8 overflow-y-auto space-y-6">
                        {activeClientId ? (
                            <AnimatePresence>
                                {activeConversation.map((msg, index) => (
                                    <Message
                                        key={index}
                                        msg={msg}
                                        client={activeClient}
                                    />
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">
                                    Select a client from the list to start a
                                    conversation.
                                </p>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <ChatFooter
                        onSendMessage={handleSendMessage}
                        activeClientId={activeClientId}
                        isLoading={isLoading}
                    />
                </main>
            </div>
        </>
    );
}
