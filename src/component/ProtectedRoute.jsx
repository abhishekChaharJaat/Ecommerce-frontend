import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if user is authenticated (e.g., token exists)
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token; // Convert to boolean
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
