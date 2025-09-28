import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// A reusable component for the floating background shapes for a dynamic feel
const FloatingShape = ({ initial, animate, transition, className }) => (
  <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
  />
);

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:4000/api/auth/signup", {
            fullname: fullName,
            email,
            password,
            userType: role,
        });

        console.log(res.data);
        alert("User registered successfully!");
        navigate("/login"); // redirect to login page
    } catch (err) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.message || "Registration failed");
    }
};



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 overflow-hidden relative p-4">
      <FloatingShape
        className="w-72 h-72 bg-purple-500"
        initial={{ y: "-20vh", x: "70vw" }}
        animate={{ y: "120vh", x: "-20vw" }}
        transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      <FloatingShape
        className="w-96 h-96 bg-indigo-500"
        initial={{ y: "50vh", x: "-20vw" }}
        animate={{ y: "-50vh", x: "120vw" }}
        transition={{ duration: 45, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />

      <motion.div
        key="signup"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 z-10"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
          <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mt-2">
            Create an Account
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400">
            Join FitTrack to start your fitness journey.
          </motion.p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <label htmlFor="full-name" className="text-sm font-medium text-gray-300">Full Name</label>
            <motion.input
              id="full-name"
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
            <motion.input
              id="email"
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <motion.input
              id="password"
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="user-role" className="text-sm font-medium text-gray-300">I am a...</label>
            <select
              id="user-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
            >
              <option value="user">User</option>
              <option value="dietitian">Dietitian / Nutritionist</option>
              <option value="admin">Admin</option>
            </select>
          </motion.div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            variants={itemVariants}
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out shadow-lg"
          >
            Create Account
          </motion.button>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-400 hover:underline">
                Log In
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
