import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ClientChat from "./components/ClientChat";
import DietitianDashboard from "./components/DietitianDashboard";
import ManageUsers from "./components/ManageUsers";
import InteractiveWorkoutPlanner from "./components/InteractiveWorkoutPlanner";
import Overview from "./components/Overview";
import Trends from "./components/Trends";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/resetpassword/:token"
                    element={<ResetPassword />}
                />
                <Route path="/clientchat" element={<ClientChat />} />
                <Route
                    path="/dietitiondashboard"
                    element={<DietitianDashboard />}
                />
                <Route path="/manageusers" element={<ManageUsers />} />
                <Route
                    path="/interactiveworkoutplanner"
                    element={<InteractiveWorkoutPlanner />}
                />
                <Route path="overview" element={<Overview />} />
                <Route path="trends" element={<Trends />} />
            </Routes>
        </Router>
    );
}

export default App;
