import "./App.css";
import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom"; // Add BrowserRouter
import ResourceDetail from "./components/ResourceDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"
import ResourceReviews from "./components/ResourceReviews";
import ResourceManagement from "./components/ResourceManagement";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <div>
      <Navigation token={token} setToken={setToken} />
      <div id="container">
        <h1> Coding Resource Review Website 💻</h1>
      </div>
      <div id="main-section">
        <Routes>
          <Route
            path="/"
            element={<Home setToken={setToken} token={token} />}
          />
          <Route
            path="/resources/:id"
            element={<ResourceDetail setToken={setToken} token={token} />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/register"
            element={<Register setToken={setToken} token={token} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute token={token}>
                <Profile setToken={setToken} token={token} />
              </ProtectedRoute>
            }
            />
            <Route
            path="/resourcereviews"
            element={<ResourceReviews setToken={setToken} token={token} />}
          />
          <Route
            path="/resourcemanagement"
            element={<ResourceManagement setToken={setToken} token={token} />}
            />
        </Routes>
      </div>
    </div>
  );
}

export default App;
