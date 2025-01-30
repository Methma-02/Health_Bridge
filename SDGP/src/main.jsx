import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Import the App component
import "./index.css"; // Optional: Import global styles if you have them

// Render the App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
