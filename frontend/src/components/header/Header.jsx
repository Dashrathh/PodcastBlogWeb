import React, { useState, useEffect } from "react";
import { FaMicrophone, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const Header = () => {
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  useEffect(() => {
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
    <header className="bg-indigo-700 text-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Section - Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FaMicrophone className="text-2xl" />
          <h1 className="text-2xl font-bold tracking-wide">PodcastBlog</h1>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="text-2xl sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Section - Navigation */}
        <nav
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 fixed top-0 left-0 sm:static h-full sm:h-auto w-3/4 sm:w-auto bg-indigo-800 sm:bg-transparent z-50 sm:z-auto flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 items-start sm:items-center p-8 sm:p-0 transform transition-transform duration-300 ease-in-out`}
        >
          <Link
            to="/"
            className="hover:text-indigo-300 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/podcasts"
            className="hover:text-indigo-300 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Podcasts
          </Link>
          <Link
            to="/blogs"
            className="hover:text-indigo-300 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="hover:text-indigo-300 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          {/* User Section */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)} // Open dropdown on hover
              onMouseLeave={() => setTimeout(() => setDropdownOpen(false), 600)} // Add delay before hiding
            >
              {/* Circle with First Letter */}
              <div className="w-10 h-10 flex items-center justify-center bg-white text-indigo-700 font-bold rounded-full cursor-pointer">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white text-indigo-700 rounded shadow-lg w-48 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-indigo-100 transition-colors duration-1000"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 hover:bg-indigo-100 transition-colors duration-1000"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
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
