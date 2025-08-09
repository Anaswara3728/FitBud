// src/pages/CalorieCalculator.jsx
import React from 'react';
import './caloriecalculator.css'; 

const CalorieCalculator = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">FitTrack</div>
        <div className="navbar-right">
          <a href="#">Dashboard</a>
          <a href="#">Workouts</a>
          <a href="#">Nutrition</a>
          <a href="#">Community</a>
          <a href="#" className="notification-icon">🔔</a>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="profile"
          />
        </div>
      </nav>

      <div className="container">
        <h2>Calorie Calculator</h2>

        <label htmlFor="food-type">Food Intake</label>
        <select id="food-type">
          <option>Select Food Type</option>
        </select>
        <input type="text" placeholder="Enter Food Name" />
        <input type="number" placeholder="Enter Quantity (grams)" />

        <div className="item-list">
          <div className="item">
            <img src="https://img.icons8.com/color/48/apple.png" alt="Apple" />
            Apple - 150 cal
          </div>
          <div className="item">
            <img src="https://img.icons8.com/color/48/banana.png" alt="Banana" />
            Banana - 200 cal
          </div>
          <div className="item">
            <img src="https://img.icons8.com/color/48/chicken-breast.png" alt="Chicken" />
            Chicken Breast - 300 cal
          </div>
        </div>

        <label htmlFor="exercise-type">Exercise</label>
        <select id="exercise-type">
          <option>Select Exercise Type</option>
        </select>
        <input type="text" placeholder="Enter Exercise Name" />
        <input type="number" placeholder="Enter Repetitions" />

        <div className="item-list">
          <div className="item">
            <img src="https://img.icons8.com/color/48/running.png" alt="Running" />
            Running - 300 cal
          </div>
          <div className="item">
            <img src="https://img.icons8.com/color/48/bicycle.png" alt="Cycling" />
            Cycling - 250 cal
          </div>
          <div className="item">
            <img src="https://img.icons8.com/color/48/swimming.png" alt="Swimming" />
            Swimming - 200 cal
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-label">Calories Consumed</div>
          <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: '75%' }}></div>
          </div>
          <div style={{ textAlign: 'right' }}>1500/2000</div>

          <div className="progress-label">Calories Burned</div>
          <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: '50%' }}></div>
          </div>
          <div style={{ textAlign: 'right' }}>500/1000</div>

          <div className="note">
            You have a net calorie balance of 1000 calories remaining for the day.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
