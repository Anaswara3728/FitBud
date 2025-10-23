import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --- Sidebar Component ---
const Sidebar = ({ activeView, setActiveView }) => (
  <aside className="w-64 bg-gray-800 flex-shrink-0 hidden md:flex md:flex-col">
    <div className="flex items-center justify-center h-20 border-b border-gray-700">
      <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
      <h1 className="text-2xl font-bold ml-2 text-white">FitTrack Admin</h1>
    </div>
    <nav className="mt-4">
      {["validation", "manage"].map((view) => {
        const labels = { validation: "User Validation", manage: "Manage Users" };
        const icons = {
          validation: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ),
          manage: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 21H9"
              ></path>
            </svg>
          ),
        };
        return (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`flex items-center w-full text-left py-3 px-6 transition duration-200 ${
              activeView === view ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {icons[view]}
            <span className="ml-4">{labels[view]}</span>
          </button>
        );
      })}
    </nav>
  </aside>
);

// --- Mobile Menu ---
const MobileMenu = ({ activeView, setActiveView, isOpen, setIsOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: "spring", damping: 25 }}
          className="w-64 h-full bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h1 className="text-xl font-bold ml-2 text-white">Admin</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="mt-4">
            {["validation", "manage"].map((view) => {
              const labels = { validation: "User Validation", manage: "Manage Users" };
              const icons = {
                validation: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ),
                manage: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 21H9"
                    ></path>
                  </svg>
                ),
              };
              return (
                <button
                  key={view}
                  onClick={() => {
                    setActiveView(view);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full text-left py-3 px-6 transition duration-200 ${
                    activeView === view ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                >
                  {icons[view]}
                  <span className="ml-4">{labels[view]}</span>
                </button>
              );
            })}
          </nav>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Stats Card ---
const StatsCard = ({ icon, title, count, color }) => (
  <motion.div whileHover={{ scale: 1.02, y: -5 }} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-white mt-2">{count}</p>
      </div>
      <div className={`p-4 rounded-full ${color}`}>{icon}</div>
    </div>
  </motion.div>
);

// --- Toast ---
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
      type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
    } text-white`}
  >
    <div className="flex items-center gap-3">
      {type === "success" && (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      )}
      {type === "error" && (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </motion.div>
);

// --- User Table ---
const UserTable = ({ users, onAction, actionType, loading, onValidateEmail, validationResults, validatingEmail, activeView }) => {
  const getStatusClass = (status) => ({
    Approved: "text-green-400 bg-green-400/10",
    Denied: "text-red-400 bg-red-400/10",
    Pending: "text-yellow-400 bg-yellow-400/10",
  }[status] || "text-gray-400 bg-gray-400/10");

  const getValidationStatus = (userId) => {
    const result = validationResults[userId];
    if (!result) return null;
    return result.validation.isValid
      ? { class: "text-green-400", icon: "✓", text: "Valid" }
      : { class: "text-red-400", icon: "⚠", text: "Invalid" };
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  if (loading)
    return (
      <div className="mt-8 bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
        <p className="text-gray-400 mt-4">Loading users...</p>
      </div>
    );

  return (
    <div className="mt-8 bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Email Validation</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.length > 0 ? (
                users.map((user) => (
                  <motion.tr
                    key={user._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-white">{user.fullname}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.userType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getValidationStatus(user._id) ? (
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${getValidationStatus(user._id).class}`}>
                            {getValidationStatus(user._id).icon} {getValidationStatus(user._id).text}
                          </span>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onValidateEmail(user._id)}
                          disabled={validatingEmail === user._id}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {validatingEmail === user._id ? (
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                              <span>Validating</span>
                            </div>
                          ) : (
                            "Validate"
                          )}
                        </motion.button>
                      )}
                    </td>
                    <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          onAction(user._id, activeView === "validation" ? "approve" : "delete")
                        }
                        className={`px-3 py-1 rounded-lg text-white ${
                          activeView === "validation"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        } text-xs font-medium`}
                      >
                        {activeView === "validation" ? "Approve" : "Delete"}
                      </motion.button>
                      {activeView === "validation" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onAction(user._id, "deny")}
                          className="px-3 py-1 rounded-lg text-white bg-red-500 hover:bg-red-600 text-xs font-medium"
                        >
                          Deny
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Admin Dashboard ---
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState("validation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [validationResults, setValidationResults] = useState({});
  const [validatingEmail, setValidatingEmail] = useState(null);

  // --- Helper: Show toast ---
  const showToast = useCallback((message, type = "success", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  // --- Fetch Users ---
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Please login first", "error");
        return navigate("/login");
      }
      
      const endpoint = activeView === "manage" 
        ? "http://localhost:4000/api/admin/all-users" 
        : "http://localhost:4000/api/admin/pending";
      
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }
      
      console.log("Fetched data:", data);
      setUsers(data.users || []);
    } catch (err) {
      console.error("Fetch error:", err);
      showToast(err.message || "Error fetching users", "error");
    } finally {
      setLoading(false);
    }
  }, [activeView, navigate, showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- Handle Actions ---
  const handleAction = useCallback(
    async (userId, actionType) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showToast("Please login first", "error");
          return navigate("/login");
        }

        let res;

        if (actionType === "approve" || actionType === "deny") {
          res = await fetch(`http://localhost:4000/api/admin/${userId}/status`, {
            method: "PATCH",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              status: actionType === "approve" ? "Approved" : "Denied"
            })
          });
        } else if (actionType === "delete") {
          res = await fetch(`http://localhost:4000/api/admin/${userId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Action failed");

        showToast(data.message || `${actionType} successful`, "success");
        fetchUsers();
      } catch (err) {
        console.error(err);
        showToast(err.message || "Action failed", "error");
      }
    },
    [fetchUsers, navigate, showToast]
  );

  // --- Email Validation ---
  const validateEmail = useCallback(
    async (userId) => {
      setValidatingEmail(userId);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showToast("Please login first", "error");
          return navigate("/login");
        }
        
        const res = await fetch(`http://localhost:4000/api/admin/${userId}/validate-email`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Validation failed");

        setValidationResults((prev) => ({ ...prev, [userId]: data }));
        showToast("Email validation complete", "success");
      } catch (err) {
        console.error(err);
        showToast(err.message || "Validation failed", "error");
      } finally {
        setValidatingEmail(null);
      }
    },
    [navigate, showToast]
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <MobileMenu
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold capitalize">{activeView.replace("-", " ")}</h2>
          <button
            className="md:hidden px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            Menu
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Users"
            count={users.length}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            }
            color="bg-indigo-600"
          />
          <StatsCard
            title="Pending Users"
            count={users.filter((u) => u.status === "Pending").length}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            }
            color="bg-yellow-600"
          />
          <StatsCard
            title="Approved Users"
            count={users.filter((u) => u.status === "Approved").length}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            }
            color="bg-green-600"
          />
        </div>

        {/* User Table */}
        <UserTable
          users={users}
          loading={loading}
          onAction={handleAction}
          actionType={activeView === "validation" ? "approve" : "delete"}
          onValidateEmail={validateEmail}
          validationResults={validationResults}
          validatingEmail={validatingEmail}
          activeView={activeView}
        />
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}