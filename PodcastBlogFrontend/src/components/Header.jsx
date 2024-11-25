// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl font-bold"> 
          <Link to="/">MyWebsite</Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-yellow-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300">About</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-yellow-300">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
