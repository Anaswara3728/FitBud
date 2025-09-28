// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Floating background shape component
const FloatingShape = ({ initial, animate, transition, className }) => (
  <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
  />
);

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setLoggedIn(true);
      setRole(userRole || "user");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save JWT and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user?.role || "user");
      setRole(data.user?.role || "user");
      setLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole("user");
    setEmail("");
    setPassword("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 overflow-hidden relative">
      {/* Floating shapes */}
      <FloatingShape
        className="w-72 h-72 bg-indigo-500"
        initial={{ y: "-20vh", x: "-20vw" }}
        animate={{ y: "100vh", x: "100vw" }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
      />
      <FloatingShape
        className="w-96 h-96 bg-purple-500"
        initial={{ y: "50vh", x: "80vw" }}
        animate={{ y: "-50vh", x: "-20vw" }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "reverse" }}
      />
      <FloatingShape
        className="w-60 h-60 bg-teal-500"
        initial={{ y: "100vh", x: "20vw" }}
        animate={{ y: "-10vh", x: "50vw" }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      <AnimatePresence mode="wait">
        {!loggedIn ? (
          <motion.div
            key="login"
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
              exit="exit"
              className="text-center"
            >
              <motion.h1
                variants={itemVariants}
                className="text-3xl font-bold text-white mt-2"
              >
                FitTrack
              </motion.h1>
              <motion.p variants={itemVariants} className="text-gray-400">
                Please login to your account.
              </motion.p>
            </motion.div>

            <motion.form
              onSubmit={handleLogin}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={itemVariants}>
                <label className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                  required
                />
              </motion.div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <motion.div variants={itemVariants} className="flex items-center justify-end">
                <Link to="/forgotpassword" className="text-sm text-indigo-400 hover:underline">
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out shadow-lg"
              >
                Login
              </motion.button>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-gray-400">
                  Don’t have an account?{" "}
                  <Link to="/register" className="font-medium text-indigo-400 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </motion.div>
            </motion.form>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-md text-center bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 z-10"
          >
            <motion.h1 variants={itemVariants} className="text-4xl font-bold text-white">
              Welcome to the{" "}
              <span className="text-indigo-400">
                {role === "admin"
                  ? "Admin Dashboard"
                  : role === "dietician"
                  ? "Dietician Dashboard"
                  : "User Dashboard"}
              </span>
              !
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-400 mt-2">
              You have been successfully logged in.
            </motion.p>
            <motion.button
              variants={itemVariants}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
