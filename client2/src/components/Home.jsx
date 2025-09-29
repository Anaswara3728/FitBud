// src/components/HomePage.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import the hook

const Home = () => {
    const navigate = useNavigate(); // Initialize the hook

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <header className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                    <span className="text-3xl">🍏</span>
                    <h1 className="text-2xl font-bold">FitTrack</h1>
                </div>
                <button
                    onClick={() => navigate("/login")} // Use navigate to change the page
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                    Login
                </button>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-extrabold leading-tight mb-4">
                            Transform Your Health, One Meal at a Time.
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Connect with professional dietitians, get
                            personalized meal plans, and track your progress
                            seamlessly. Your journey to a healthier lifestyle
                            starts here.
                        </p>
                        <button
                            onClick={() => navigate("/login")} // Use navigate here too
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
                        >
                            Get Started Today
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop"
                            alt="Healthy Salad Bowl"
                            className="rounded-xl shadow-2xl"
                        />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Home;
