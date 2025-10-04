import { Link } from "react-router-dom";

export default function Overview() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-2">Overview</h2>
      <p className="text-gray-400 mb-6">Welcome back, Chloe</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1e293b] p-6 rounded-xl shadow">
          <h3 className="text-lg">Steps</h3>
          <p className="text-2xl font-bold">8,450</p>
          <p className="text-green-400">+15%</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow">
          <h3 className="text-lg">Calories Burned</h3>
          <p className="text-2xl font-bold">320</p>
          <p className="text-red-400">-5%</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl shadow">
          <h3 className="text-lg">Active Minutes</h3>
          <p className="text-2xl font-bold">45</p>
          <p className="text-green-400">+10%</p>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="mb-8">
        <h3 className="text-lg mb-2">Today's Activity</h3>
        <div className="w-full bg-gray-700 h-2 rounded">
          <div className="bg-blue-500 h-2 rounded w-3/4"></div>
        </div>
        <p className="mt-1 text-sm text-gray-400">Daily Goal 75%</p>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center mb-8">
        <button className="bg-blue-600 px-4 py-2 rounded-lg">Start Workout</button>
        <Link to="/trends" className="bg-gray-700 px-4 py-2 rounded-lg">
          View Trends
        </Link>
      </div>

      {/* Recent Workouts */}
      <h3 className="text-lg mb-4">Recent Workouts</h3>
      <div className="space-y-4">
        <div className="bg-[#1e293b] flex items-center justify-between p-4 rounded-xl">
          <div>
            <p className="text-sm text-gray-400">Strength Training</p>
            <h4 className="text-lg font-semibold">Full Body Workout</h4>
            <p className="text-sm text-gray-400">30 minutes</p>
          </div>
          <img
            src="https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg"
            alt="Workout"
            className="w-28 h-20 rounded-lg object-cover"
          />
        </div>
        <div className="bg-[#1e293b] flex items-center justify-between p-4 rounded-xl">
          <div>
            <p className="text-sm text-gray-400">Cardio</p>
            <h4 className="text-lg font-semibold">Morning Run</h4>
            <p className="text-sm text-gray-400">45 minutes</p>
          </div>
          <img
            src="https://images.pexels.com/photos/1199590/pexels-photo-1199590.jpeg"
            alt="Run"
            className="w-28 h-20 rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
