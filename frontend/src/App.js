import './App.css';
import HomePage from './homepage.js';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./getstarted.js";
import HowItWorks from "./howitworks.js";
import Signup from './signup.js';
import Login from './login.js';
import Chat from './chatpage.js';






function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
  };
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path= "/signup" element={<Signup />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>}/>
        </Routes>

      </Router>
  );
}

export default App;
