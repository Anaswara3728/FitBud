import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";

// A reusable component for the floating background shapes
const FloatingShape = ({ className, ...rest }) => (
    <motion.div
        {...rest}
        className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
    />
);

// Animation variants used by the component
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 12 },
    },
};

// --- Reset Password Component ---
export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }
        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        alert("Password has been reset successfully! (This is a demo)");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 overflow-hidden relative p-4">
            <FloatingShape
                className="w-72 h-72 bg-purple-500"
                initial={{ y: "-20vh", x: "70vw" }}
                animate={{ y: "120vh", x: "-20vw" }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
            />
            <FloatingShape
                className="w-96 h-96 bg-indigo-500"
                initial={{ y: "50vh", x: "-20vw" }}
                animate={{ y: "-50vh", x: "120vw" }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
            />

            {/* The actual form content */}
            <motion.div
                key="reset-password"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 z-10"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl font-bold text-white"
                    >
                        Enter New Password
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-400 mt-2"
                    >
                        Please enter your new password below. Make sure it's
                        secure!
                    </motion.p>
                </motion.div>
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <label
                            htmlFor="new-password"
                            className="text-sm font-medium text-gray-300"
                        >
                            New Password
                        </label>
                        <motion.input
                            id="new-password"
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white"
                            required
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <label
                            htmlFor="confirm-password"
                            className="text-sm font-medium text-gray-300"
                        >
                            Confirm New Password
                        </label>
                        <motion.input
                            id="confirm-password"
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white"
                            required
                        />
                    </motion.div>
                    <motion.button
                        variants={itemVariants}
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
                    >
                        Reset Password
                    </motion.button>
                    <motion.div variants={itemVariants} className="text-center">
                        <p className="text-sm text-gray-400">
                            Remembered your password?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-indigo-400 hover:underline"
                            >
                                Back to Login
                            </Link>
                        </p>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
}
