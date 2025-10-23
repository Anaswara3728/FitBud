import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#1e2a3a] px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl"></span>
        <svg
          className="w-10 h-10 text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>

        <h1 className="text-xl font-semibold text-white">FitTrack</h1>
      </div>

      {/* Navigation */}
      <nav className="flex gap-6">
        <Link
          to="/overview"
          className="text-gray-200 hover:text-blue-400 font-medium transition-colors"
        >
          Overview
        </Link>
        <Link
          to="/interactiveworkoutplanner"
          className="text-gray-200 hover:text-blue-400 font-medium transition-colors"
        >
          Workouts
        </Link>
        <Link
          to="/trends"
          className="text-gray-200 hover:text-blue-400 font-medium transition-colors"
        >
          Trends
        </Link>
        <Link
          to="/clientchat"
          className="text-gray-200 hover:text-blue-400 font-medium transition-colors"
        >
          Chat
        </Link>
      </nav>
    </header>
  );
}
