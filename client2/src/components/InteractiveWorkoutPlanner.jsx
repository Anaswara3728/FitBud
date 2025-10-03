import React, { useState, useEffect } from "react";

// Local formatMuscleName function
const formatMuscleName = (muscle) => {
    if (!muscle) return "";
    return muscle.charAt(0).toUpperCase() + muscle.slice(1);
};

const InteractiveWorkoutPlanner = ({ workoutData }) => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [currentPlan, setCurrentPlan] = useState([]);
  const [planName, setPlanName] = useState("");
  const [savedPlans, setSavedPlans] = useState([]);

  const fetchSavedPlans = async () => {
    try {
      const response = await fetch("http://localhost:4000/plans");
      const data = await response.json();
      setSavedPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchSavedPlans();
  }, []);

  const handleAddToPlan = (exercise) => {
    if (!currentPlan.find((p) => p.exercise === exercise)) {
      setCurrentPlan([...currentPlan, { exercise, muscle: selectedMuscle }]);
    }
  };

  const handleRemoveFromPlan = (index) => {
    const newPlan = [...currentPlan];
    newPlan.splice(index, 1);
    setCurrentPlan(newPlan);
  };

  const handleSavePlan = async () => {
    if (!planName || currentPlan.length === 0) return;
    try {
      const response = await fetch("http://localhost:4000/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: planName, exercises: currentPlan }),
      });
      const savedPlan = await response.json();
      setSavedPlans([...savedPlans, savedPlan]);
      setCurrentPlan([]);
      setPlanName("");
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  const handleDeletePlan = async (index) => {
    const planToDelete = savedPlans[index];
    try {
      await fetch(`http://localhost:4000/plans/${planToDelete._id}`, {
        method: "DELETE",
      });
      const updatedPlans = savedPlans.filter((_, i) => i !== index);
      setSavedPlans(updatedPlans);
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleLoadPlan = async (index) => {
    const planToLoad = savedPlans[index];
    try {
      const response = await fetch(`http://localhost:4000/plans/${planToLoad._id}`);
      const data = await response.json();
      setCurrentPlan(data.exercises);
      setPlanName(data.name);
    } catch (error) {
      console.error("Error loading plan:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Exercises List */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4">
          Exercises for{" "}
          <span className="text-red-400">{formatMuscleName(selectedMuscle)}</span>
        </h2>
        {selectedMuscle && workoutData[selectedMuscle] ? (
          <ul className="space-y-2">
            {workoutData[selectedMuscle].map((workout) => (
              <li
                key={workout}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-md"
              >
                <span>{workout}</span>
                <button
                  onClick={() => handleAddToPlan(workout)}
                  className="bg-green-500 hover:bg-green-600 rounded-full w-7 h-7 flex items-center justify-center text-white font-bold text-lg"
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center py-4">
            Click a muscle to see exercises.
          </p>
        )}
      </div>

      {/* Current Plan */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4">
          Current Workout Plan
        </h2>
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Name Your Workout Plan"
            className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {currentPlan.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {currentPlan.map((p, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-800 p-3 rounded-md"
                >
                  <div>
                    <p className="font-semibold">{p.exercise}</p>
                    <p className="text-xs text-gray-400">{formatMuscleName(p.muscle)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromPlan(index)}
                    className="bg-red-500 hover:bg-red-600 rounded-full w-7 h-7 flex items-center justify-center text-white font-bold text-lg"
                  >
                    -
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Add exercises to build your plan.
            </p>
          )}
        </div>
        <button
          onClick={handleSavePlan}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Save Plan
        </button>
      </div>

      {/* Saved Plans */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4">
          Saved Plans
        </h2>
        {savedPlans.length > 0 ? (
          <ul className="space-y-4">
            {savedPlans.map((plan, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-red-400">{plan.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLoadPlan(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md text-sm"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDeletePlan(index)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 list-disc list-inside">
                  {plan.exercises.map((ex, i) => (
                    <li key={i}>{ex.exercise}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center py-4">No saved plans yet.</p>
        )}
      </div>
    </div>
  );
};

export default InteractiveWorkoutPlanner;
