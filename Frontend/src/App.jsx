import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import CreateEvent from "./components/CreateEvent";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import UpdateEvent from "./components/UpdateEvent";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <LandingPage />
        </div>
      ),
    },
    {
      path: "/loginPage",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/createEvent",
      element: (
        <div>
          <Navbar />
          <LandingPage />
        </div>
      ),
    },
    {
      path: "/updateEvent",
      element: <UpdateEvent />,
    },
  ]);

  return (

    <div>
      <Navbar/>
      <RouterProvider router={router}/>
    </div>
    
  )
}

export default App;