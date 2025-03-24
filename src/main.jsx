import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { rootStore } from "./store/rootStore";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify/unstyled";

createRoot(document.getElementById("root")).render(
 
    <Provider store={rootStore}>
      <BrowserRouter>
        <ToastContainer />
        <StrictMode>
        <App />
        </StrictMode>
      </BrowserRouter>
    </Provider>

);
