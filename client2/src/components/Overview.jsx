import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    const [stats, setStats] = useState(null);
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found!");
                    return;
                }

                // Fetch overview data
                const res1 = await fetch("http://localhost:4000/api/overview", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const overviewData = await res1.json();

                // Fetch recent workouts
                const res2 = await fetch("http://localhost:4000/api/overview/recent", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const workoutsData = await res2.json();

                setStats(overviewData);
                setRecentWorkouts(workoutsData);

                // Debug logs
                console.log("Overview Data:", overviewData);
                console.log("Recent Workouts:", workoutsData);
            } catch (err) {
                console.error("Error fetching overview:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    if (loading) {
        return (
            <main className="p-8 text-white bg-gray-900 min-h-screen">
                <p>Loading overview...</p>
            </main>
        );
    }

    if (!stats) {
        return (
            <main className="p-8 text-white bg-gray-900 min-h-screen">
                <p>Failed to load overview.</p>
            </main>
        );
    }

    return (
        <main className="p-4 sm:p-8 bg-gray-900 text-white min-h-full">
            <h2 className="text-3xl font-bold mb-2">Overview</h2>
            <p className="text-gray-400 mb-6">Welcome back!</p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg text-gray-400">Steps</h3>
                    <p className="text-3xl font-bold mt-2">{stats.steps}</p>
                    <p className="text-sm text-green-400 mt-1">{stats.stepsChange} from yesterday</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg text-gray-400">Calories Burned</h3>
                    <p className="text-3xl font-bold mt-2">{stats.caloriesBurned}</p>
                    <p className="text-sm text-red-400 mt-1">{stats.caloriesChange} from yesterday</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg text-gray-400">Active Minutes</h3>
                    <p className="text-3xl font-bold mt-2">{stats.activeMinutes}</p>
                    <p className="text-sm text-green-400 mt-1">{stats.activeMinutesChange} from yesterday</p>
                </div>
            </div>

            {/* Daily Goal */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Today's Activity Goal</h3>
                <div className="w-full bg-gray-700 h-4 rounded-full">
                    <div
                        className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${stats.goalCompletion}%` }}
                    ></div>
                </div>
                <p className="mt-2 text-sm text-right text-gray-400">
                    {stats.goalCompletion}% Complete
                </p>
            </div>

            {/* Recent Workouts */}
            <h3 className="text-xl font-semibold mb-4">Recent Workouts</h3>
            <div className="space-y-4">
                {recentWorkouts.length > 0 ? (
                    recentWorkouts.map((w) => (
                        <div key={w._id} className="bg-slate-800 flex items-center justify-between p-4 rounded-xl shadow-lg">
                            <div className="flex items-center">
                                <div className="p-3 bg-indigo-500/20 rounded-lg mr-4">
                                    <span className="text-2xl">💪</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">{w.planId?.name || "Workout"}</p>
                                    <h4 className="text-lg font-semibold">{w.planName || "Custom Plan"}</h4>
                                    <p className="text-sm text-gray-400">{w.duration} minutes</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No recent workouts logged yet.</p>
                )}
            </div>

            {/* 🔹 Debug Panel */}
            <div className="mt-8 p-4 bg-gray-800 rounded text-sm overflow-auto max-h-64">
                <h3 className="font-semibold mb-2 text-indigo-400">Debug Data:</h3>
                <pre>{JSON.stringify({ stats, recentWorkouts }, null, 2)}</pre>
            </div>
        </main>
    );
}



export default function OverviewPage() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <AppHeader />
            <OverviewContent />
        </div>
    );
}
