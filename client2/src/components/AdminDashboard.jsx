import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const initialPendingUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.d@example.com",
        role: "User",
        status: "Pending Approval",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@nutrition.co",
        role: "Dietitian",
        status: "Pending Approval",
    },
    {
        id: 3,
        name: "Peter Jones",
        email: "peter.j@example.com",
        role: "User",
        status: "Pending Approval",
    },
    {
        id: 4,
        name: "Dr. Emily White",
        email: "emily.white@health.org",
        role: "Dietitian",
        status: "Pending Approval",
    },
];

// --- Sub-components ---

const Sidebar = () => (
    <aside className="w-64 bg-gray-800 flex-shrink-0 hidden md:flex md:flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <svg
                className="w-10 h-10 text-indigo-400"
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
            </svg>
            <h1 className="text-2xl font-bold ml-2 text-white">Admin</h1>
        </div>
        <nav className="mt-4">
            <a
                href="#"
                className="flex items-center py-3 px-6 bg-gray-700 text-white"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <span className="ml-4">User Validation</span>
            </a>
            <a
                href="#"
                className="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 21H9"
                    ></path>
                </svg>
                <span className="ml-4">Manage Users</span>
            </a>
        </nav>
    </aside>
);

const UserValidationTable = ({ users, onApprove, onDeny }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case "Approved":
                return "text-green-400";
            case "Denied":
                return "text-red-400";
            default:
                return "text-yellow-400";
        }
    };

    return (
        <div className="mt-8 bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {/* The <tbody> tag is necessary here to wrap the animated rows */}
                    <tbody>
                        <AnimatePresence>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gray-800 border-b border-gray-700"
                                    >
                                        <td className="px-6 py-4 font-medium text-white">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role}
                                        </td>
                                        <td
                                            className={`px-6 py-4 font-semibold ${getStatusClass(user.status)}`}
                                        >
                                            {user.status}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.status ===
                                            "Pending Approval" ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            onApprove(user.id)
                                                        }
                                                        className="font-medium text-green-500 hover:underline mr-4"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            onDeny(user.id)
                                                        }
                                                        className="font-medium text-red-500 hover:underline"
                                                    >
                                                        Deny
                                                    </button>
                                                </>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <td
                                        colSpan="5"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No pending users to validate.
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Main Admin Dashboard Component ---

export default function AdminDashboard() {
    const [users, setUsers] = useState(initialPendingUsers);

    const handleApprove = (userId) => {
        setUsers(
            users.map((user) =>
                user.id === userId ? { ...user, status: "Approved" } : user,
            ),
        );
    };

    const handleDeny = (userId) => {
        setUsers(
            users.map((user) =>
                user.id === userId ? { ...user, status: "Denied" } : user,
            ),
        );
    };

    return (
        <>
            <style>{`
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #1f2937; }
                ::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #6b7280; }
            `}</style>
            <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    <h1 className="text-3xl font-bold text-white">
                        User Validation
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Review and approve new account registrations.
                    </p>
                    <UserValidationTable
                        users={users}
                        onApprove={handleApprove}
                        onDeny={handleDeny}
                    />
                </main>
            </div>
        </>
    );
}
