import React, { useEffect } from "react";
import { FaMicrophone, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const Header = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    // Fetch the user data from localStorage on component mount
    const storeData = localStorage.getItem("user");
    if (storeData) {
      const parsedData = JSON.parse(storeData);
      setUser(parsedData);
    }

    return () => {
      setUser(null); // Cleanup on unmount
    };
  }, []);

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Section - Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FaMicrophone className="text-2xl" />
          <h1 className="text-2xl font-bold tracking-wide">PodcastBlog</h1>
        </Link>

        {/* Right Section - Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/podcasts"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            Podcasts
          </Link>
          <Link
            to="/blogs"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="hover:text-indigo-300 transition-colors duration-200"
          >
            About
          </Link>

          {/* User Section */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* User Initial */}
              <div className="w-10 h-10 flex items-center justify-center bg-white text-indigo-700 font-bold rounded-full">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              {/* Username and Dashboard Link */}
              <div className="hidden sm:flex flex-col items-start">
                <span className="font-medium">{user.username || "User"}  <Link
                  to="/dashboard"
                  className="text-sm text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
                >
                Dashboard
                </Link></span>
               
              </div>
              {/* Logout */}
              <Link
                to="/logout"
                className="flex items-center space-x-2 text-sm hover:text-indigo-300 transition-colors duration-200"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </div>
          ) : (
            // If user not logged in, show Sign Up
            <Link
              to="/signup"
              className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition-colors duration-200"
            >
              Sign Up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
