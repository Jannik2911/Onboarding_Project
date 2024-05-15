import "./App.css";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Footer from "./Components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mitarbeiterverwaltung from "./Components/Mitarbeiterverwaltung";
import Dashboard from "./Components/Dashboard";
import UserChannel from "./Components/UserChannel";
import Tasks from "./Components/Tasks";
import EmployeeList from "./Components/EmployeeList";
import Layout from "./Components/Layout";
import DashboardComponent from "./Components/Dashboard";
import Terminmanager from "./Components/Terminmanager";
import { useEffect } from "react";

/*
npx json-server --watch ./src/helper/db.json --port 8000
*/

function App() {
  useEffect(() => {
    document.title = "Onboarding-Tool";
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/test" element={<Dashboard />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/employeelist" element={<EmployeeList />} />
          <Route exact path="/userchannel" element={<UserChannel />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/terminmanager" element={<Terminmanager />} />
          <Route
            exact
            path="/mitarbeiterverwaltung"
            element={<Mitarbeiterverwaltung />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
