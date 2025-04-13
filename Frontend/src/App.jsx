import "./App.css";
import React,{useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import useAuth from "./Hooks/useAuth.jsx";

function App() {
  const {setAuth} = useAuth()
  const location = useLocation()  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/unAuthorized" element={<UnAuthorized />} />

        {/* user & admin */}
        <Route element={<RequiredAuth allowedRoles={["admin", "user"]} />}>
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updateEvent" element={<UpdateEvent />} />
        </Route>

        {/* Only admin */}
        <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
          <Route path="/allUsers" element={<AllUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;