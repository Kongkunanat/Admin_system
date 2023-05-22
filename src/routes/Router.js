import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import "../styles/Signin.css";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import Category from "../pages/Category";
import Data from "../pages/Data";
import Habit from "../pages/Habit";
// import Login from "../pages/login";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" element={<Dashboard  />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Category" element={<Category />} /> 
      <Route path="/Habit" element={<Habit />} />
      <Route path="/Data" element={<Data />} />
    </Routes>
  );
};

export default Router;