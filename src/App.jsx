import { useEffect } from "react";
import ThoughtList from "./ThoughtList";
import { useState } from "react";

function App() {
  const [thoughts, setThoughts] = useState([]);
  useEffect(() => {
    // Fetch thoughts from backend
    const fetchThoughts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/mythoughts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });
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
      <ThoughtList thoughts={thoughts} setThoughts={setThoughts} />
    </>
  );
}

export default App;
