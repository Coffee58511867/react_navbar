import React from "react";

import { Routes, Route } from "react-router-dom";
import Register from "../components/Login";
import Login from "../components/Register";

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register/user" element={<Login />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
