import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { rootStore } from "./store/rootStore";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={rootStore}>
    <BrowserRouter>
      <StrictMode>
        <App />
        <ToastContainer autoClose={1000} />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
