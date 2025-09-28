import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const FloatingShape = ({ className, ...rest }) => (
    <motion.div
        {...rest}
        className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
    />
);

export default function ResetPassword() {
    const { token } = useParams(); 
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }
        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        try {
            const res = await axios.post(
                `http://localhost:4000/api/password/resetpassword/${token}`, 
                { password: newPassword }
            );

            alert(res.data.message || "Password reset successfully!");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 overflow-hidden relative p-4">
            {/* Floating shapes omitted for brevity */}
            <motion.div
                key="reset-password"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 z-10"
            >
                <h1 className="text-3xl font-bold text-white text-center">
                    Enter New Password
                </h1>
                <p className="text-gray-400 text-center">
                    Please enter your new password below.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="new-password"
                            className="text-sm font-medium text-gray-300"
                        >
                            New Password
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="text-sm font-medium text-gray-300"
                        >
                            Confirm New Password
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
                    >
                        Reset Password
                    </button>
                    <p className="text-sm text-gray-400 text-center">
                        Remembered your password?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-400 hover:underline"
                        >
                            Back to Login
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
