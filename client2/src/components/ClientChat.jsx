import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// --- MOCK DATA (Can be replaced with props or API calls) ---
const client = {
    id: 1,
    name: "Sophia Carter",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
};

const dietitian = {
    name: "Dr. Chloe",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop",
    status: "Online",
};

const initialConversation = [
    {
        from: "client",
        text: "Hi Dr. Chloe, I want to improve my current diet and set some specific goals. Can you help?",
        type: "text",
    },
    {
        from: "dietitian",
        text: "Hi Sophia! I'd be happy to help. Let's start with your diet, as this will provide a solid foundation.",
        type: "text",
    },
    { from: "client", text: "Great! What's the first step?", type: "text" },
];

// --- Sub-components for better structure ---

const AppHeader = () => (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-4">
            {/* Logo Placeholder */}
            <div className="text-2xl">🏋️</div>
            <h1 className="text-2xl font-bold text-white">FitTrack</h1>
        </div>
        <nav>
            <ul className="flex items-center space-x-8 text-gray-300">
                <li>
                    <Link
                        to="/overview"
                        className="hover:text-indigo-400 transition-colors"
                    >
                        Overview
                    </Link>
                </li>
                <li>
                    <Link
                        to="/interactiveworkoutplanner"
                        className="hover:text-indigo-400 transition-colors"
                    >
                        Workouts
                    </Link>
                </li>
                <li>
                    <a
                        href="/trends"
                        className="hover:text-indigo-400 transition-colors"
                    >
                        Trends
                    </a>
                </li>
                <li>
                    {/* Active Link */}
                    <a
                        href="#"
                        className="font-semibold text-indigo-400"
                        aria-current="page"
                    >
                        Chat
                    </a>
                </li>
            </ul>
        </nav>
    </header>
);

const ChatHeader = ({ dietitian }) => (
    <header className="flex items-center justify-between h-20 px-8 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center">
            <img
                className="h-12 w-12 rounded-full object-cover"
                src={dietitian.avatar}
                alt="Dietitian Avatar"
            />
            <div className="ml-4">
                <h2 className="text-xl font-semibold text-white">
                    {dietitian.name}
                </h2>
                <p
                    className={`text-sm ${dietitian.status === "Online" ? "text-green-400" : "text-gray-500"}`}
                >
                    {dietitian.status}
                </p>
            </div>
        </div>
    </header>
);

const Message = ({ msg }) => {
    const isClient = msg.from === "client";

    if (msg.type === "system") {
        return (
            <div className="text-center text-sm text-gray-500 py-2">
                <p>{msg.text}</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 ${isClient ? "justify-end" : ""}`}
        >
            {!isClient && (
                <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={dietitian.avatar}
                    alt={dietitian.name}
                />
            )}
            <div
                className={`${isClient ? "bg-indigo-500" : "bg-gray-700"} p-3 rounded-lg max-w-lg`}
            >
                <p>{msg.text}</p>
            </div>
            {isClient && (
                <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={client.avatar}
                    alt={client.name}
                />
            )}
        </motion.div>
    );
};

const ChatFooter = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    return (
        <footer className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-5 rounded-lg transition duration-300"
                >
                    Send
                </button>
            </form>
        </footer>
    );
};

// --- Main Page Component ---

export default function DietChatPage() {
    const [conversation, setConversation] = useState(initialConversation);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation]);

    const addMessage = (from, text, type = "text", data = null) => {
        setConversation((prev) => [...prev, { from, text, type, data }]);
    };

    const handleSendMessage = (text) => {
        addMessage("client", text);
    };

    return (
        <>
            <style>{`
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #111827; }
                ::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #4b5563; }
            `}</style>

            <div className="flex flex-col h-screen bg-gray-900 text-gray-200">
                <AppHeader />
                {/* This main element now contains the chat interface */}
                <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
                    <ChatHeader dietitian={dietitian} />
                    <div className="flex-grow p-8 overflow-y-auto space-y-6">
                        <AnimatePresence>
                            {conversation.map((msg, index) => (
                                <Message key={index} msg={msg} />
                            ))}
                        </AnimatePresence>
                        <div ref={chatEndRef} />
                    </div>
                    <ChatFooter onSendMessage={handleSendMessage} />
                </main>
            </div>
        </>
    );
}
