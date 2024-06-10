import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AdminProvider } from "./Components/AdminContext";
import { ApplicationProvider } from "./Components/ApplicationContext";
import { LoginProvider } from "./Components/LoginContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginProvider>
    <ApplicationProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </ApplicationProvider>
  </LoginProvider>
);
