import React, { useState, useEffect } from "react";
import "./Overview.css";
import fullbodyWorkout from "./assets/fullbodyWorkout.jpg"
import run from "./assets/run.jpg"
import { useNavigate } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import Header from "./components/Header";

const Overview = () => {
  
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setStats([
        { label: "Steps", value: 8450, trend: "+15%", type: "positive" },
        { label: "Calories Burned", value: 320, trend: "-5%", type: "negative" },
        { label: "Active Minutes", value: 45, trend: "+10%", type: "positive" },
      ]);

      setGoal(75); // Goal percentage

      setWorkouts([
        {
          type: "Strength Training",
          title: "Full Body Workout",
          duration: "30 minutes",
          image: fullbodyWorkout,
        },
        {
          type: "Cardio",
          title: "Morning Run",
          duration: "45 minutes",
          image: run,
        },
      ]);
    }, 1000); // Simulate network delay
  }, []);

  return (
    <div className="dashboard">
      <Header/>
      <main className="dashboard-body">
        <h2>Overview</h2>
        <p className="welcome">Welcome back, Chloe</p>

        <div className="stats">
          {stats.map((item, index) => (
            <div className="card" key={index}>
              <p className="label">{item.label}</p>
              <h3>{item.value}</h3>
              <p className={item.type}>{item.trend}</p>
            </div>
          ))}
        </div>

        <div className="activity">
          <h3>Today's Activity</h3>
          <p>Daily Goal</p>
          <div className="progress-bar">
            <div className="filled" style={{ width: `${goal}%` }}></div>
          </div>
          <p className="goal-percentage">{goal}%</p>
        </div>

        <div className="quick-actions">
          <button className="start-btn">Start Workout</button>
          <button className="view-btn" onClick={() => navigate("/trends")}>View Trends</button>
        </div>

        <div className="workouts">
          <h3>Recent Workouts</h3>
          {workouts.map((workout, index) => (
            <div className="workout-card" key={index}>
              <div>
                <p className="category">{workout.type}</p>
                <h4>{workout.title}</h4>
                <p>{workout.duration}</p>
              </div>
              <img src={workout.image} alt={workout.title} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Overview;
