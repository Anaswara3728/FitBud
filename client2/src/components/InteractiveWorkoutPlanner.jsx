import React, { useState, useEffect } from "react";

const workoutData = {
  traps: ["Barbell Shrugs", "Dumbbell Shrugs", "Face Pulls", "Upright Rows"],
  "traps-middle": ["Seated Cable Rows", "Bent-Over Dumbbell Rows", "T-Bar Rows"],
  lats: ["Pull-Ups", "Lat Pulldowns", "Bent-Over Barbell Rows", "Single-Arm Dumbbell Rows"],
  "rear-shoulders": ["Bent-Over Dumbbell Raise", "Face Pulls", "Reverse Pec-Deck"],
  triceps: ["Tricep Dips", "Skull Crushers", "Tricep Pushdowns", "Close-Grip Bench Press"],
  lowerback: ["Deadlifts", "Good Mornings", "Back Extensions (Hyperextensions)"],
  glutes: ["Squats", "Hip Thrusts", "Lunges", "Romanian Deadlifts"],
  hamstrings: ["Romanian Deadlifts", "Leg Curls", "Good Mornings", "Kettlebell Swings"],
  chest: ["Bench Press", "Dumbbell Flyes", "Incline Press", "Push-Ups"],
  "front-shoulders": ["Overhead Press", "Arnold Press", "Front Dumbbell Raises"],
  biceps: ["Barbell Curls", "Dumbbell Hammer Curls", "Preacher Curls", "Chin-Ups"],
  forearms: ["Wrist Curls", "Reverse Wrist Curls", "Farmer's Walk"],
  obliques: ["Russian Twists", "Side Plank", "Bicycle Crunches", "Wood Chops"],
  quads: ["Barbell Squats", "Leg Press", "Lunges", "Leg Extensions"],
  abdominals: ["Crunches", "Leg Raises", "Plank", "Hanging Knee Raises"],
  calves: ["Standing Calf Raises", "Seated Calf Raises", "Jump Rope", "Leg Press Calf Press"],
  hands: ["Hand Grippers", "Plate Pinches"],
};

const AppHeader = () => (
  <header className="flex items-center justify-between px-8 py-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
    <div className="flex items-center space-x-4">
      <div className="text-2xl">🏋</div>
      <h1 className="text-2xl font-bold text-white">FitTrack</h1>
    </div>
    <nav>
      <ul className="flex items-center space-x-8 text-gray-300">
        <li><a href="#overview" className="hover:text-indigo-400 transition-colors">Overview</a></li>
        <li><a href="#workouts" className="font-semibold text-indigo-400">Workouts</a></li>
        <li><a href="#trends" className="hover:text-indigo-400 transition-colors">Trends</a></li>
        <li><a href="#chat" className="hover:text-indigo-400 transition-colors">Chat</a></li>
      </ul>
    </nav>
  </header>
);

const formatMuscleName = (id) => {
  if (!id) return "None";
  return id.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

const AnteriorView = ({ selectedMuscle, onMuscleClick }) => {
  const getClassName = (muscle) =>
    `cursor-pointer transition-colors duration-200 ease-in-out ${selectedMuscle === muscle ? "text-red-500" : "text-gray-400 hover:text-red-300"}`;

  return (
    <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <g id="chest" className={getClassName("chest")} onClick={() => onMuscleClick("chest")}>
        <ellipse cx="150" cy="120" rx="30" ry="50" fill="currentColor" />
        <ellipse cx="250" cy="120" rx="30" ry="50" fill="currentColor" />
      </g>
      <g id="abdominals" className={getClassName("abdominals")} onClick={() => onMuscleClick("abdominals")}>
        <rect x="170" y="180" width="60" height="100" rx="10" fill="currentColor" />
      </g>
      <g id="obliques" className={getClassName("obliques")} onClick={() => onMuscleClick("obliques")}>
        <ellipse cx="140" cy="220" rx="15" ry="60" fill="currentColor" />
        <ellipse cx="260" cy="220" rx="15" ry="60" fill="currentColor" />
      </g>
      <g id="front-shoulders" className={getClassName("front-shoulders")} onClick={() => onMuscleClick("front-shoulders")}>
        <circle cx="110" cy="100" r="25" fill="currentColor" />
        <circle cx="290" cy="100" r="25" fill="currentColor" />
      </g>
      <g id="biceps" className={getClassName("biceps")} onClick={() => onMuscleClick("biceps")}>
        <ellipse cx="90" cy="150" rx="18" ry="35" fill="currentColor" />
        <ellipse cx="310" cy="150" rx="18" ry="35" fill="currentColor" />
      </g>
      <g id="forearms" className={getClassName("forearms")} onClick={() => onMuscleClick("forearms")}>
        <rect x="70" y="190" width="30" height="80" rx="15" fill="currentColor" />
        <rect x="300" y="190" width="30" height="80" rx="15" fill="currentColor" />
      </g>
      <g id="quads" className={getClassName("quads")} onClick={() => onMuscleClick("quads")}>
        <ellipse cx="170" cy="380" rx="25" ry="80" fill="currentColor" />
        <ellipse cx="230" cy="380" rx="25" ry="80" fill="currentColor" />
      </g>
      <g id="calves" className={getClassName("calves")} onClick={() => onMuscleClick("calves")}>
        <ellipse cx="170" cy="520" rx="20" ry="50" fill="currentColor" />
        <ellipse cx="230" cy="520" rx="20" ry="50" fill="currentColor" />
      </g>
    </svg>
  );
};

const PosteriorView = ({ selectedMuscle, onMuscleClick }) => {
  const getClassName = (muscle) =>
    `cursor-pointer transition-colors duration-200 ease-in-out ${selectedMuscle === muscle ? "text-red-500" : "text-gray-400 hover:text-red-300"}`;

  return (
    <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <g id="traps" className={getClassName("traps")} onClick={() => onMuscleClick("traps")}>
        <path d="M 150 80 L 200 60 L 250 80 L 230 110 L 170 110 Z" fill="currentColor" />
      </g>
      <g id="rear-shoulders" className={getClassName("rear-shoulders")} onClick={() => onMuscleClick("rear-shoulders")}>
        <circle cx="110" cy="100" r="25" fill="currentColor" />
        <circle cx="290" cy="100" r="25" fill="currentColor" />
      </g>
      <g id="triceps" className={getClassName("triceps")} onClick={() => onMuscleClick("triceps")}>
        <ellipse cx="90" cy="150" rx="18" ry="35" fill="currentColor" />
        <ellipse cx="310" cy="150" rx="18" ry="35" fill="currentColor" />
      </g>
      <g id="lats" className={getClassName("lats")} onClick={() => onMuscleClick("lats")}>
        <ellipse cx="140" cy="160" rx="30" ry="70" fill="currentColor" />
        <ellipse cx="260" cy="160" rx="30" ry="70" fill="currentColor" />
      </g>
      <g id="lowerback" className={getClassName("lowerback")} onClick={() => onMuscleClick("lowerback")}>
        <rect x="170" y="200" width="60" height="60" rx="10" fill="currentColor" />
      </g>
      <g id="glutes" className={getClassName("glutes")} onClick={() => onMuscleClick("glutes")}>
        <ellipse cx="170" cy="300" rx="30" ry="40" fill="currentColor" />
        <ellipse cx="230" cy="300" rx="30" ry="40" fill="currentColor" />
      </g>
      <g id="hamstrings" className={getClassName("hamstrings")} onClick={() => onMuscleClick("hamstrings")}>
        <ellipse cx="170" cy="380" rx="25" ry="70" fill="currentColor" />
        <ellipse cx="230" cy="380" rx="25" ry="70" fill="currentColor" />
      </g>
      <g id="calves" className={getClassName("calves")} onClick={() => onMuscleClick("calves")}>
        <ellipse cx="170" cy="520" rx="20" ry="50" fill="currentColor" />
        <ellipse cx="230" cy="520" rx="20" ry="50" fill="currentColor" />
      </g>
    </svg>
  );
};

// ---------------- MAIN COMPONENT ----------------

const InteractiveWorkoutPlanner = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [view, setView] = useState("back");
  const [currentPlan, setCurrentPlan] = useState([]);
  const [planName, setPlanName] = useState("");
  const [savedPlans, setSavedPlans] = useState([]);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:4000/api/workout-plans";
  const WORKOUT_URL = "http://localhost:4000/api/workouts";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  };

  useEffect(() => {
    fetchSavedPlans();
  }, []);

  const fetchSavedPlans = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL, { headers: getAuthHeaders() });
      if (response.ok) {
        const plans = await response.json();
        setSavedPlans(plans);
      } else if (response.status === 401) {
        setError("Please log in to view your workout plans");
      } else {
        setError("Failed to load workout plans");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlan = (exercise) => {
    if (!selectedMuscle) return;
    const newExercise = { muscle: selectedMuscle, exercise };
    if (!currentPlan.some((p) => p.exercise === exercise)) setCurrentPlan([...currentPlan, newExercise]);
  };

  const handleRemoveFromPlan = (index) => {
    setCurrentPlan(currentPlan.filter((_, i) => i !== index));
  };

  const handleSavePlan = async () => {
    if (!planName.trim() || currentPlan.length === 0) return alert("Name your plan and add exercises.");
    try {
      const method = editingPlanId ? "PUT" : "POST";
      const url = editingPlanId ? `${API_URL}/${editingPlanId}` : API_URL;
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: planName, exercises: currentPlan })
      });
      if (response.ok) {
        await fetchSavedPlans();
        setPlanName(""); setCurrentPlan([]); setEditingPlanId(null);
        alert(`Workout plan ${editingPlanId ? "updated" : "saved"} successfully!`);
      } else if (response.status === 401) alert("Please log in to save plans");
      else alert("Failed to save plan");
    } catch (err) {
      console.error(err); alert("Failed to save plan");
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      const response = await fetch(`${API_URL}/${planId}`, { method: "DELETE", headers: getAuthHeaders() });
      if (response.ok) { await fetchSavedPlans(); alert("Deleted successfully!"); }
      else alert("Failed to delete plan");
    } catch (err) { console.error(err); alert("Failed to delete plan"); }
  };

  const handleLoadPlan = (plan) => {
    setPlanName(plan.name);
    setCurrentPlan(plan.exercises);
    setEditingPlanId(plan._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setPlanName(""); setCurrentPlan([]); setEditingPlanId(null);
  };

  const handleLogWorkout = async (plan) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in to log a workout.");

      const response = await fetch(WORKOUT_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          planId: plan._id,
          planName: plan.name,
          duration: 30,
          caloriesBurned: 200,
          notes: "Logged from plan"
        })
      });
      if (response.ok) alert("Workout logged successfully!");
      else if (response.status === 401) alert("Please log in to log workouts");
      else alert("Failed to log workout");
    } catch (err) {
      console.error(err);
      alert("Error logging workout");
    }
  };

  if (loading) return <div className="bg-gray-800 text-white min-h-screen font-sans"><AppHeader /><p className="text-center py-8">Loading workout plans...</p></div>;

  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans p-4 sm:p-6 md:p-8">
      <AppHeader />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-500 tracking-tight">Interactive Workout Planner</h1>
          <p className="text-gray-300 mt-2 text-lg">Build, save, and manage your custom workout routines.</p>
          {error && <p className="text-yellow-400 mt-2 text-sm bg-yellow-900/20 p-2 rounded">{error}</p>}
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg sticky top-8">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button onClick={() => setView("back")} className={`px-6 py-2 rounded-md font-semibold transition-colors ${view==="back"?"bg-red-600":"bg-gray-700 hover:bg-gray-600"}`}>Back</button>
              <button onClick={() => setView("front")} className={`px-6 py-2 rounded-md font-semibold transition-colors ${view==="front"?"bg-red-600":"bg-gray-700 hover:bg-gray-600"}`}>Front</button>
            </div>
            <div className="w-full max-w-sm mx-auto">
              {view==="back" ? <PosteriorView selectedMuscle={selectedMuscle} onMuscleClick={setSelectedMuscle} /> : <AnteriorView selectedMuscle={selectedMuscle} onMuscleClick={setSelectedMuscle} />}
            </div>
          </div>

          <div className="space-y-8">
            {/* Exercise List */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4">
                Exercises for <span className="text-red-400">{formatMuscleName(selectedMuscle)}</span>
              </h2>
              {selectedMuscle && workoutData[selectedMuscle] ? (
                <ul className="space-y-2">
                  {workoutData[selectedMuscle].map((workout) => (
                    <li key={workout} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                      <span>{workout}</span>
                      <button onClick={() => handleAddToPlan(workout)} className="bg-green-500 hover:bg-green-600 rounded-full w-7 h-7 flex items-center justify-center text-white font-bold text-lg">+</button>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-gray-400 text-center py-4">Click a muscle to see exercises.</p>}
            </div>

            {/* Current / Edit Plan */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4">{editingPlanId?"Edit Workout Plan":"Current Workout Plan"}</h2>
              <div className="space-y-3 mb-4">
                <input type="text" value={planName} onChange={(e)=>setPlanName(e.target.value)} placeholder="Name Your Workout Plan" className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
                {currentPlan.length>0 ? (
                  <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {currentPlan.map((p,i)=>(
                      <li key={i} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                        <div>
                          <p className="font-semibold">{p.exercise}</p>
                          <p className="text-xs text-gray-400">{formatMuscleName(p.muscle)}</p>
                        </div>
                        <button onClick={()=>handleRemoveFromPlan(i)} className="bg-red-500 hover:bg-red-600 rounded-full w-7 h-7 flex items-center justify-center text-white font-bold text-lg">-</button>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-400 text-center py-4">Add exercises to build your plan.</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={handleSavePlan} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">{editingPlanId?"Update Plan":"Save Plan"}</button>
                {editingPlanId && <button onClick={handleCancelEdit} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancel</button>}
              </div>
            </div>

            {/* Saved Plans */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4">Saved Plans</h2>
              {savedPlans.length>0 ? (
                <ul className="space-y-4">
                  {savedPlans.map(plan=>(
                    <li key={plan._id} className="bg-gray-800 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-red-400">{plan.name}</h3>
                        <div className="flex space-x-2">
                          <button onClick={()=>handleLoadPlan(plan)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md text-sm">Edit</button>
                          <button onClick={()=>handleDeletePlan(plan._id)} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-md text-sm">Delete</button>
                          <button onClick={()=>handleLogWorkout(plan)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md text-sm">Log Workout</button>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-300 list-disc list-inside">{plan.exercises.map((ex,i)=><li key={i}>{ex.exercise}</li>)}</ul>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-gray-400 text-center py-4">No saved plans yet.</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InteractiveWorkoutPlanner;
