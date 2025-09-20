import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.png"; // Assuming you have a logo in assets
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log("Response:", data);
      if (data.message === "Invalid credentials") {
        toast.error("Invalid credentials!", {
          position: "bottom-right",
        });
        return;
      }
      navigate("/dashboard");
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
    } catch (err) {
      toast.error(err.message, { position: "bottom-right" });
    }
  };

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
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex gap-4">
            <button
              className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 to-green-400 px-4 py-2 font-medium text-white shadow hover:opacity-90"
              onClick={handleSubmit}
            >
              Login
            </button>

            <NavLink
              to=".././signup"
              className="flex-1 rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              <button type="button">Sign Up</button>
            </NavLink>
          </div>
        </div>

        {/* Social login */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Or continue with:
          <div className="mt-3 flex justify-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">🌐</button>
            <button className="text-gray-500 hover:text-gray-700">🍏</button>
            <button className="text-gray-500 hover:text-gray-700">🔵</button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
