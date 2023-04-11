import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category";
import Data from "../pages/Data";
import Habit from "../pages/Habit";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="Dashboard" element={<Dashboard />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Category" element={<Category />} /> 
      <Route path="/Habit" element={<Habit />} />
      <Route path="/Data" element={<Data />} />
    </Routes>
  );
};

export default Router;
