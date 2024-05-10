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
<<<<<<< HEAD
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
=======
      <Button variant="contained" onClick={(console.log("test"))}>Hello world4</Button>
>>>>>>> e7b2d7fd7951f68675c1a8113a9c564485c3d809
    </div>
  );
}

export default App;
