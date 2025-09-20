import React, { useState } from "react";
import logo from "./assets/logo.png";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ThoughtForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("Title and Description are required!", {
        position: "bottom-right",
      });
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/addthought`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          data: {
            email: localStorage.getItem("email"),
            title,
            description,
            priority,
            createdAt: new Date(),
          },
        }),
      });
      const data = await res.json();
      console.log("Response:", data);
      if (data.Access === "Forbidden Access") {
        toast.error("Forbidden Access. Login again!", {
          position: "bottom-right",
        });
        return;
      }
      toast("Thought added successfully!", { position: "bottom-right" });
    } catch (err) {
      toast.error(err.message, { position: "bottom-right" });
    }

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-green-600">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src={logo} alt="logo" className="h-12 w-12" />
          </div>

          <h2 className="mb-6 text-center text-xl font-semibold">
            Capture Your Thoughts
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                placeholder="E.g., Research web frameworks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                placeholder="Details about exploring React, Vue, Angular..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              >
                <option value="High">🔥 High</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌱 Low</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 to-green-400 px-4 py-2 font-medium text-white shadow hover:opacity-90"
              >
                Save Thought
              </button>
              <NavLink to=".././workList">
                <button
                  type="button"
                  className="flex-1 rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Go work list
                </button>
              </NavLink>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtForm;
