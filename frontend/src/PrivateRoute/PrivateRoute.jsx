import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { auth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Still checking token → don’t redirect yet
    return <div>Loading...</div>;
  }

  // Only allow if user has a name (or any other identifier you store)
  if (auth && auth.name) {
    return <Outlet />;
  }

  // Otherwise, go to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
