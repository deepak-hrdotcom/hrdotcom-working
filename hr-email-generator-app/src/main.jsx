import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Line 3 (the error line) is gone!

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);