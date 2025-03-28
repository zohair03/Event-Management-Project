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
;

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    _id: '',
    name: '',
    userName: '',
    email: '',
    role: ''
  });


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


  function jwtAuthToken(data){
    setToken(data)
    console.log(token)
  }
  function userCredentials(data){
    setUser(data)
    console.log(user)
  }

  function  checkAuthentication(){
    return true;
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar profile={user.name} />
                <LandingPage />
              </>
            }
          />
          <Route
            path="/loginPage"
            element={
              <>
                <Navbar profile={user.name} />
                <LoginPage token={jwtAuthToken} user={userCredentials} />
              </>
            }
          />
          <Route
            path="/signUpPage"
            element={
              <>
                <Navbar profile={user.name} />
                <SignUpPage />
              </>
            }
          />

          {/* protected routes */}
          <Route
            element={
              <ProtectedRoutes
                allowedRoles={["admin","user"]}
                isAuthenticated={checkAuthentication}
                role={user.role}
              />
            }
          >
            <Route
              path="/createEvent"
              element={
                <>
                  <Navbar profile={user.name} />
                  <CreateEvent token={token} />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <Navbar profile={user.name} />
                  <Dashboard token={token} />
                </>
              }
            />
            <Route
              path="/updateEvent"
              element={<UpdateEvent token={token} />}
            />
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
