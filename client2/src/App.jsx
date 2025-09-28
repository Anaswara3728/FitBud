import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ClientChat from "./components/ClientChat";
import DietitianDashboard from "./components/DietitianDashboard";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/clientchat" element={<ClientChat />} />
                <Route
                    path="/dietitiondashboard"
                    element={<DietitianDashboard />}
                />
                
                
            </Routes>
        </Router>
    );
}

export default App;
