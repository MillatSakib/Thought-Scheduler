import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import App from "./App";
import ThoughtForm from "./ThoughtForm";
import CompletedTask from "./CompletedTask";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route goes to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* After login, show dashboard */}
      <Route path="/dashboard" element={<ThoughtForm />} />
      <Route path="/workList" element={<App />} />
      <Route path="/completedTasks" element={<CompletedTask />} />
      {
        //<ThoughtForm />} />
      }
      {/* Catch-all → redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
