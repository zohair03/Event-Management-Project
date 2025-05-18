import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateEvent from "./components/page components/CreateEvent";
import Home from "./components/page components/Home.jsx";
import LandingPage from "./components/page components/LandingPage";
import LoginPage from "./components/login components/LoginPage.jsx";
import UpdateEvent from "./components/page components/UpdateEvent";
import SignUpPage from "./components/login components/SignUpPage";
import NotFound from "./components/routes components/NotFound";
import Layout from "./components/routes components/Layout.jsx";
import RequiredAuth from "./components/routes components/RequireAuth.jsx";
import AllUsers from "./components/page components/AllUsers.jsx";
import UnAuthorized from "./components/routes components/UnAuthorized.jsx";
import PublicRoute from "./components/routes components/PublicRoute.jsx";
import UserEvents from "./components/reuseable components/Profile.jsx";
import EventPage from "./components/reuseable components/EventPage.jsx";
import UpdateProfile from "./components/page components/UpdateProfile.jsx";

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
          <Route path="/home" element={<Home />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/updateEvent" element={<UpdateEvent />} />
          <Route path="/profile" element={<UserEvents />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Route>

        {/* Only admin */}
        <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
          <Route path="/allUsers" element={<AllUsers />} />
        </Route>

        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/unAuthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
