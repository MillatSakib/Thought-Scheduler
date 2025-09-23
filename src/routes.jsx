import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import App from "./App";
import ThoughtForm from "./ThoughtForm";
import CompletedTask from "./CompletedTask";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route goes to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

      {/* Private routes */}
      <Route path="/dashboard" element={<PrivateRoute><ThoughtForm /></PrivateRoute>} />
      <Route path="/workList" element={<PrivateRoute><App /></PrivateRoute>} />
      <Route path="/completedTasks" element={<PrivateRoute><CompletedTask /></PrivateRoute>} />

      {/* Catch-all → redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
