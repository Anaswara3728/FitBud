import React from "react";
import { useNavigate } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import logo from "../assets/fitbud-logo.png"; 

import "../Header.css"; 

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="dashboard-header">
      <div className="logo-section" onClick={() => navigate("/overview")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="FitBud Logo" className="fitbud-logo" />
        <span className="logo-text">FitBud</span>
      </div>

      <div className="dashboard-nav">
        <button className="nav-btn" onClick={() => navigate("/overview")}>Overview</button>
        <button className="nav-btn">Workouts</button>
        <button className="nav-btn" onClick={() => navigate("/trends")}>Trends</button>
        <button className="nav-btn">Community</button>
      </div>

      <div className="profile-section">
        <MdNotificationsNone className="bell" />
        <img
          className="avatar"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
        />
      </div>
    </header>
  );
};

export default Header;
