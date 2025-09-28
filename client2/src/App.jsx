import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ClientChat from "./components/ClientChat";
import DietitianDashboard from "./components/DietitianDashboard";
import ManageUsers from "./components/ManageUsers";
import InteractiveWorkoutPlanner from "./components/InteractiveWorkoutPlanner";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/resetpassword/:token" element={<ResetPassword />} />
                <Route path="/clientchat" element={<ClientChat />} />
                <Route path="/dietitiondashboard" element={<DietitianDashboard />} />
                <Route path="/manageusers" element={<ManageUsers />} />
                <Route path="/interactiveworkoutplanner" element={<InteractiveWorkoutPlanner />} />
            </Routes>
        </Router>
    );
}

export default App;
