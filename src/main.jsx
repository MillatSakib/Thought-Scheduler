import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ThoughtList from "./ThoughtList.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes"; // we’ll create this

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Login /> */}
    {/* <Signup /> */}
    {/* <ThoughtList /> */}
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
