import React from "react";
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

const ThoughtList = ({ thoughts, setThoughts }) => {
  const [filter, setFilter] = React.useState("All");
  const [initialLoading, setInitialLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/mythoughts`,
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
          setInitialLoading(false);
          return;
        }
        setThoughts(data);
        setInitialLoading(false);
      } catch (err) {
        console.error("Error fetching thoughts:", err);
        setInitialLoading(false);
      }
    };
    fetchThoughts();
  }, []);

  const handleFilterChange = async (e) => {
    const toastID = toast.loading("Fetching...", {
      position: "bottom-right",
    });
    setFilter(e.target.value);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/thought/${e.target.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.Access === "Forbidden Access") {
        toast.dismiss(toastID);
        toast.error("Forbidden Access. Login again!", {
          position: "bottom-right",
        });
        return;
      }
      setThoughts(data.thoughts);
      toast.dismiss(toastID);
    } catch (err) {
      toast.dismiss(toastID);
      toast.error("Backend server error", {
        position: "bottom-right",
      });
    }
  };
  const updateThoughts = async (id) => {
    const toastID = toast.loading("Updating...", {
      position: "bottom-right",
    });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/updatethought/${id}`,
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
  if (initialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-green-600">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }
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
          <NavLink to=".././completedTasks">
            <button
              type="button"
              className="flex-1 rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              See Completed Tasks
            </button>
          </NavLink>
        </div>
        <div>
          <label
            htmlFor="priority-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Priority
          </label>
          <select
            id="priority-filter"
            name="priority-filter"
            value={filter}
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
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
                    ✅ Mark as Done
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

export default ThoughtList;
