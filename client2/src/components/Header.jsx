import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#1e2a3a] px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏋️</span>
        <h1 className="text-xl font-semibold">FitTrack</h1>
      </div>
      <nav className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Overview</Link>
        <Link to="/workouts" className="hover:text-blue-400">Workouts</Link>
        <Link to="/trends" className="hover:text-blue-400">Trends</Link>
        <Link to="/chat" className="hover:text-blue-400">Chat</Link>
      </nav>
    </header>
  );
}
