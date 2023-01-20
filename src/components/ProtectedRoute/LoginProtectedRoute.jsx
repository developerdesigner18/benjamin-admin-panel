import React from "react";
import { Navigate } from "react-router-dom";

export default function LoginProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/"></Navigate>;
  } else {
    return children;
  }
}
