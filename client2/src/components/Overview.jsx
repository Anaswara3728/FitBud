import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

// --- App Header Component ---
const AppHeader = () => (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-800 border-b border-gray-700 flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
            <div className="text-2xl">🏋️</div>
            <h1 className="text-2xl font-bold text-white">FitTrack</h1>
        </div>
        <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8 text-gray-300">
                <li>
                    <Link
                        to="/overview"
                        className="font-semibold text-indigo-400"
                        aria-current="page"
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
                    <Link
                        to="/trends"
                        className="hover:text-indigo-400 transition-colors"
                    >
                        Trends
                    </Link>
                </li>
                <li>
                    <Link
                        to="/clientchat"
                        className="hover:text-indigo-400 transition-colors"
                    >
                        Chat
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
);

// --- Overview Content Component ---
function OverviewContent() {
    return (
        <main className="p-4 sm:p-8 bg-gray-900 text-white min-h-full">
            <h2 className="text-3xl font-bold mb-2">Overview</h2>
            <p className="text-gray-400 mb-6">Welcome back, Chloe</p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg text-gray-400">Steps</h3>
                    <p className="text-3xl font-bold mt-2">8,450</p>
                    <p className="text-sm text-green-400 mt-1">
                        +15% from yesterday
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg text-gray-400">Calories Burned</h3>
                    <p className="text-3xl font-bold mt-2">320</p>
                    <p className="text-sm text-red-400 mt-1">
                        -5% from yesterday
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg text-gray-400">Active Minutes</h3>
                    <p className="text-3xl font-bold mt-2">45</p>
                    <p className="text-sm text-green-400 mt-1">
                        +10% from yesterday
                    </p>
                </div>
            </div>

            {/* Daily Goal */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">
                    Today's Activity Goal
                </h3>
                <div className="w-full bg-gray-700 h-4 rounded-full">
                    <div
                        className="bg-indigo-500 h-4 rounded-full"
                        style={{ width: "75%" }}
                    ></div>
                </div>
                <p className="mt-2 text-sm text-right text-gray-400">
                    75% Complete
                </p>
            </div>

            {/* Recent Workouts */}
            <h3 className="text-xl font-semibold mb-4">Recent Workouts</h3>
            <div className="space-y-4">
                <div className="bg-slate-800 flex items-center justify-between p-4 rounded-xl shadow-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-indigo-500/20 rounded-lg mr-4">
                            <span className="text-2xl">💪</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">
                                Strength Training
                            </p>
                            <h4 className="text-lg font-semibold">
                                Full Body Workout
                            </h4>
                            <p className="text-sm text-gray-400">30 minutes</p>
                        </div>
                    </div>
                    <img
                        src="https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Workout"
                        className="w-28 h-20 rounded-lg object-cover hidden sm:block"
                    />
                </div>
                <div className="bg-slate-800 flex items-center justify-between p-4 rounded-xl shadow-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-indigo-500/20 rounded-lg mr-4">
                            <span className="text-2xl">🏃</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Cardio</p>
                            <h4 className="text-lg font-semibold">
                                Morning Run
                            </h4>
                            <p className="text-sm text-gray-400">45 minutes</p>
                        </div>
                    </div>
                    <img
                        src="https://images.pexels.com/photos/1199590/pexels-photo-1199590.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Run"
                        className="w-28 h-20 rounded-lg object-cover hidden sm:block"
                    />
                </div>
            </div>
        </main>
    );
}

// --- Main Page Component (Default Export) ---
// Note: BrowserRouter is included to make this component runnable standalone.
// In your main app, you would remove BrowserRouter from here and wrap your <Routes> in it.
export default function OverviewPage() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <AppHeader />
            <OverviewContent />
        </div>
    );
}
