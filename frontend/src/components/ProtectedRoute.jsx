// src/components/ProtectedRoute.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = UserContext();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login'); // Redirect to login page if not logged in
    return null; // Don't render anything if not logged in
  }

  return children; // If logged in, render the protected route
};

export default ProtectedRoute;
