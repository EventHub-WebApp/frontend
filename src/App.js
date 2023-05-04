import React from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ValidateEmail from "./components/ValidateEmail/ValidateEmail";
import CreateEvent from "./components/CreateEvent/CreateEvent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/create-account" element={<Signup />}></Route>
        <Route exact path="/validate-email" element={<ValidateEmail/>}></Route>
        <Route exact path="/events" element={<CreateEvent/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;