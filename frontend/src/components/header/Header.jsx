import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import UserContext from '../../context/UserContext';

// const {username} = UserContext()
const Header = () => {
  const [username, setUsername] = useState('');

  // Fetch username from localStorage or API
  useEffect(() => {
    // Example: Replace with your authentication logic
    const storedUsername = localStorage.getItem('username') // Default for demo
    setUsername(storedUsername);
  }, []);

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Section - Logo and Icon */}
        <div className="flex items-center space-x-2">
          <FaMicrophone className="text-2xl" />
          <h1 className="text-2xl font-bold">PodcastBlog</h1>
        </div>

        {/* Right Section - Navigation */}
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-indigo-200">
            Home
          </Link>
          <Link to="/Podcasts" className="hover:text-indigo-200">
            Podcasts
          </Link>
          <Link to="/Blogs" className="hover:text-indigo-200">
            Blogs
          </Link>
          <Link to="/about" className="hover:text-indigo-200">
            About
          </Link>

          {/* Check if user is logged in */}
          {username ? (
            <div className="flex items-center space-x-4">
              {/* Circle with First Letter */}
              <div className="w-8 h-8 flex items-center justify-center bg-white text-indigo-600 font-bold rounded-full">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block">{username}</span>
            </div>
          ) : (
            // If not logged in, show Sign Up
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition-colors"
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
