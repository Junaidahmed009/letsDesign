import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
