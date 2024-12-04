import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Logout = () => {
  const { setUser } = useContext(UserContext); // Access setUser to clear the context
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    // Clear the user from context
    setUser(null);
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-between">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Yes, Log Out
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
