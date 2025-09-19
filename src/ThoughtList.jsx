import React from "react";
import { NavLink } from "react-router-dom";

const ThoughtList = ({ thoughts }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-green-600">
      <div className="mt-5 w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <NavLink to=".././dashboard">
          <button
            type="button"
            className="flex-1 rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            Add A task
          </button>
        </NavLink>
        <div className="mt-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">
            Previously Submitted Thoughts
          </h3>
          <div className="space-y-4">
            {thoughts.length === 0 && (
              <p className="text-gray-500 text-sm">No thoughts yet...</p>
            )}
            {thoughts.map((thought, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-indigo-600">
                    {thought.title}
                  </h4>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full 
                  ${
                    thought.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : thought.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                  >
                    {thought.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {thought.description}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Submitted: {thought.createdAt.toLocaleString()}
                </p>
                <div className="mt-2 flex gap-3 text-gray-500 text-sm">
                  <button className="hover:text-green-600">
                    ✅ Mark as Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtList;
