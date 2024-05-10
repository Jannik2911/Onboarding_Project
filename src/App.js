import "./App.css";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Footer from "./Components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mitarbeiterverwaltung from "./Components/Mitarbeiterverwaltung";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
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
