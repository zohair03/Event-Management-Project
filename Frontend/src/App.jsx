import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage.jsx";
import UpdateEvent from "./components/UpdateEvent";
import SignUpPage from "./components/SignUpPage";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout.jsx";
import RequiredAuth from "./components/RequireAuth.jsx";
import AllUsers from "./components/AllUsers.jsx";
import UnAuthorized from "./components/UnAuthorized.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import UserEvents from "./components/UserEvents.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Route>

        {/* user & admin */}
        <Route element={<RequiredAuth allowedRoles={["admin", "user"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/updateEvent" element={<UpdateEvent />} />
          <Route path="/myEvents" element={<UserEvents />} />
        </Route>

        {/* Only admin */}
        <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
          <Route path="/allUsers" element={<AllUsers />} />
        </Route>

        <Route path="/unAuthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
