import "./App.css";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mitarbeiterverwaltung from "./Components/Mitarbeiterverwaltung";
import Dashboard from "./Components/Dashboard";
import UserChannel from "./Components/UserChannel";
import Tasks from "./Components/Tasks";
import EmployeeList from "./Components/EmployeeList";
import Terminmanager from "./Components/Terminmanager";
import { useEffect, useContext } from "react";

import { AdminContext } from "./Components/AdminContext";
import { ApplicationContext } from "./Components/ApplicationContext";
import Info from "./Components/Info";
import CreateSchedule from "./Components/CreateSchedule";
import Schedule from "./Components/Schedule";
import LoggedOut from "./Components/LoggedOut";
import Application from "./Components/Application";

/*
npx json-server --watch ./src/helper/db.json --port 8000
*/

function App() {
  useEffect(() => {
    document.title = "ZOP";
  });

  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { isApplication, setIsApplication } = useContext(ApplicationContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/loggedout" element={<LoggedOut />} />
          <Route exact path="/" element={<Login />} />
          {isApplication && (
            <Route exact path="/application" element={<Application />} />
          )}
          {!isApplication && (
            <>
              <Route exact path="/tasks" element={<Tasks />} />
              <Route exact path="/userchannel" element={<UserChannel />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route
                exact
                path="/forgotpassword"
                element={<ForgotPassword />}
              />
              <Route exact path="/terminmanager" element={<Terminmanager />} />
              <Route exact path="/info" element={<Info />} />

              <Route exact path="/ablaufplan" element={<Schedule />} />
              {isAdmin && (
                <Route
                  exact
                  path="/ablaufplanerstellen"
                  element={<CreateSchedule />}
                />
              )}
              {isAdmin && (
                <Route
                  exact
                  path="/mitarbeiterverwaltung"
                  element={<Mitarbeiterverwaltung />}
                />
              )}
              <Route exact path="/employeelist" element={<EmployeeList />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
