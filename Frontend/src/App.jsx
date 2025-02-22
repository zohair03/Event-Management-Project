import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import CreateEvent from "./components/CreateEvent";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import UpdateEvent from "./components/UpdateEvent";
import Navbar from "./components/Navbar";
import SignUpPage from "./components/SignUpPage";
import NotFound from "./components/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar user={} />
          <LandingPage />
        </div>
      ),
    },
    {
      path: "/loginPage",
      element: (
        <div>
          <Navbar />
          <LoginPage />
        </div>
      ),
    },
    {
      path: "/signUpPage",
      element: (
        <div>
          <Navbar />
          <SignUpPage />
        </div>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <div>
          <Navbar />
          <Dashboard />
        </div>
      ),
    },
    {
      path: "/createEvent",
      element: (
        <div>
          <Navbar />
          <CreateEvent />
        </div>
      ),
    },
    {
      path: "/updateEvent",
      element: <UpdateEvent />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
