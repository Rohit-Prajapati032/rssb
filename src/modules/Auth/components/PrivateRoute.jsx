// modules/Routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // JWT token check
  if (!token) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }
  return children;
};

export default PrivateRoute;
