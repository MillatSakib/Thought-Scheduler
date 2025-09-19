import React, { useState } from "react";
import logo from "./assets/logo.png";
import { NavLink } from "react-router-dom";

const ThoughtForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description, createdAt: new Date() });
    setTitle("");
    setDescription("");
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

          <form onSubmit={handleSubmit} className="space-y-4">
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
                // value={priority}
                // onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
              >
                <option value="High">🔥 High</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌱 Low</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThoughtForm;
