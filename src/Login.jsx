import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.png"; // Assuming you have a logo in assets

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-green-600">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="h-12 w-12" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-semibold">
          Thought Scheduler
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex gap-4">
            <NavLink
              to=".././dashboard"
              className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 to-green-400 px-4 py-2 font-medium text-white shadow hover:opacity-90"
            >
              <button>Login</button>
            </NavLink>
            <NavLink
              to=".././signup"
              className="flex-1 rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              <button type="button">Sign Up</button>
            </NavLink>
          </div>
        </form>

        {/* Social login */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Or continue with:
          <div className="mt-3 flex justify-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">🌐</button>
            <button className="text-gray-500 hover:text-gray-700">🍏</button>
            <button className="text-gray-500 hover:text-gray-700">🔵</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
