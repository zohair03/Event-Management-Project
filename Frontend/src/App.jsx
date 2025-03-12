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
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoutes from "./components/ProtectedRoutes";
import {Roles} from "./roles.js";

function App() {
  const [userData, setUserData] = useState({});

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <div>
  //         <Navbar />
  //         <LandingPage />
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "/loginPage",
  //     element: (
  //       <div>
  //         <Navbar />
  //         <LoginPage />
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "/signUpPage",
  //     element: (
  //       <div>
  //         <Navbar />
  //         <SignUpPage />
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "/dashboard",
  //     element: (
  //       <div>
  //         <Navbar />
  //         <Dashboard />
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "/createEvent",
  //     element: (
  //       <div>
  //         <Navbar />
  //         <CreateEvent />
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "/updateEvent",
  //     element: <UpdateEvent />,
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
  // ]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <LandingPage />
              </>
            }
          />
          <Route
            path="/loginPage"
            element={
              <>
                <Navbar />
                <LoginPage />
              </>
            }
          />
          <Route
            path="/signUpPage"
            element={
              <>
                <Navbar />
                <SignUpPage />
              </>
            }
          />

          {/* protected routes */}
          <Route element={<ProtectedRoutes roles={[Roles.USER]} />}>
            <Route
              path="/createEvent"
              element={
                <>
                  <Navbar />
                  <CreateEvent />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              }
            />
            <Route path="/updateEvent" element={<UpdateEvent />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>

    // <div>
    //   <RouterProvider router={router} />
    // </div>
  );
}

export default App;
