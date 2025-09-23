import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Options for formatting
  const options = {
    year: "numeric",
    month: "long", // "September"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Format using Intl API
  return date.toLocaleString("en-US", options);
}

function CompletedTask() {
  const [thoughts, setThoughts] = useState([]);
  useEffect(() => {
    // Fetch thoughts from backend
    const fetchThoughts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/completedTask`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await res.json();
        if (data.Access === "Forbidden Access") {
          // Handle forbidden access, maybe redirect to login
          return;
        }
        // setThoughts(data.thoughts);
        setThoughts(data);
      } catch (err) {
        console.error("Error fetching thoughts:", err);
      }
    };
    fetchThoughts();
  }, []);
  return (
    <>
      <App thoughts={thoughts} setThoughts={setThoughts} />
    </>
  );
}

const App = ({ thoughts, setThoughts }) => {
  const updateThoughts = async (id) => {
    const toastID = toast.loading("Updating...", {
      position: "bottom-right",
    });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/removeFromComplete/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      if (data.Access === "Forbidden Access") {
        toast.dismiss(toastID);
        toast.error("Forbidden Access. Login again!", {
          position: "bottom-right",
        });
        return;
      }
      // setThoughts(data.thoughts);
      toast.dismiss(toastID);
      toast("Thought marked as done successfully!", {
        position: "bottom-right",
      });
      setThoughts((prevThoughts) =>
        prevThoughts.filter((thought) => thought._id !== id)
      );
    } catch (err) {
      toast.dismiss(toastID);
      toast.error("Backend server error", {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-green-600">
      <div className="mt-5 w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex gap-4">
          <NavLink to=".././dashboard">
            <button
              type="button"
              className="flex-1 rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Add A task
            </button>
          </NavLink>
          <NavLink to=".././workList">
            <button
              type="button"
              className="flex-1 rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              See Work List
            </button>
          </NavLink>
        </div>
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
                <p className="text-sm text-gray-800 mt-1">
                  {thought.description}
                </p>
                <p className="mt-2 text-xs text-green-600">
                  Submitted: {formatDateTime(thought?.createdAt)}
                </p>
                <div className="mt-2 flex gap-3 text-gray-500 text-sm">
                  <button
                    onClick={() => updateThoughts(thought._id)}
                    className="hover:text-green-600 hover:cursor-pointer"
                  >
                    ❎ Remove from completed
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
