import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const FloatingShape = ({ initial, animate, transition, className }) => (
  <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
  />
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Check if user account is approved (for non-admin users)
      if (data.user?.status === "Pending" && data.user?.userType !== "admin") {
        setError("Your account is pending approval. Please wait for admin verification.");
        setLoading(false);
        return;
      }

      if (data.user?.status === "Denied") {
        setError("Your account has been denied. Please contact support.");
        setLoading(false);
        return;
      }

      // Save JWT and complete user object
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Save the full user object
      localStorage.setItem("role", data.user?.userType || "user"); // Keep for backward compatibility

      // Redirect based on role
      if (data.user?.userType === "admin") {
        navigate("/admindashboard");
      } else if (data.user?.userType === "dietitian") {
        navigate("/dietitiondashboard");
      } else {
        navigate("/overview");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
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
                disabled={loading}
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-indigo-400 hover:underline">
                Forgot Password?
              </Link>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              whileHover={!loading ? {
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
              } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </motion.button>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-indigo-400 hover:underline">
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}