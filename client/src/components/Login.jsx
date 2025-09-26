import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// A component for the floating background shapes
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

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Reset role to user on logout for a clean state
    setRole("user"); 
  };
  
  // Animation variants for staggering children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: {
        opacity: 0,
        y: -30,
        transition: {
            duration: 0.3
        }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 overflow-hidden relative">
      {/* Dynamic Background Orbs */}
      <FloatingShape 
        className="w-72 h-72 bg-indigo-500" 
        initial={{ y: "-20vh", x: "-20vw" }} 
        animate={{ y: "100vh", x: "100vw" }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      <FloatingShape 
        className="w-96 h-96 bg-purple-500" 
        initial={{ y: "50vh", x: "80vw" }} 
        animate={{ y: "-50vh", x: "-20vw" }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
       <FloatingShape 
        className="w-60 h-60 bg-teal-500" 
        initial={{ y: "100vh", x: "20vw" }} 
        animate={{ y: "-10vh", x: "50vw" }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
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
              <motion.svg
                variants={itemVariants}
                className="w-16 h-16 mx-auto text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </motion.svg>
              <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mt-2">FitTrack</motion.h1>
              <motion.p variants={itemVariants} className="text-gray-400">Please select your role and login.</motion.p>
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
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  defaultValue="demo@example.com"
                  className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="text-sm font-medium text-gray-300">Password</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  defaultValue="password"
                  className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                  required
                />
              </motion.div>

               <motion.div variants={itemVariants} className="flex items-center justify-end">
                  <a href="#" className="text-sm text-indigo-400 hover:underline">Forgot Password?</a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="text-sm font-medium text-gray-300">I am a...</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                >
                  <option value="user">User</option>
                  <option value="dietitian">Dietitian / Nutritionist</option>
                  <option value="admin">Admin</option>
                </select>
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out shadow-lg"
              >
                Login
              </motion.button>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-gray-400">
                  Don’t have an account?{" "}
                  <a href="#" className="font-medium text-indigo-400 hover:underline">Sign Up</a>
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold text-white"
              >
                Welcome to the <span className="text-indigo-400">
                {role === "admin"
                  ? "Admin Dashboard"
                  : role === "dietitian"
                  ? "Dietitian Dashboard"
                  : "User Dashboard"}
                </span>!
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-gray-400 mt-2"
              >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
