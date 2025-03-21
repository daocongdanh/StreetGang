import React from "react";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem("user");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
