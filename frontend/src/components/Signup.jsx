import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState(""); // Removed confirmPassword state
    const [error, setError] = useState(""); // Error state for handling validation
    const navigate = useNavigate(); // Hook for navigation

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validation
        if (!username || !email || !password || !fullname) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, fullname, password }), // No confirmPassword now
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Signup failed");
            }

            setError(""); // Clear error if signup is successful
           
            navigate("/dashboard"); // Redirect to login page after signup
        } catch (error) {
            setError(error.message); // Display error if any
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-96"
                onSubmit={handleSignup}
            >
                <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
                {error && (
                    <div className="bg-red-500 text-white p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name:</label>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                    Signup
                </button>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
