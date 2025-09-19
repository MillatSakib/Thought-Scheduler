import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.png";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("New User Registration:", form);
    // Here you would call your backend API (Express + MongoDB) to create user
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-green-600">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-12 w-12" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-semibold">
          Create an Account
        </h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-green-400 px-4 py-2 font-medium text-white shadow hover:opacity-90"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-indigo-600 hover:underline">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
