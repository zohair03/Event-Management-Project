import React from "react";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutes = ({ allowedRoles, isAuthenticated, role }) => {
  if (!isAuthenticated) {
    return <Navigate to="/loginPage" />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("allowedRoles if excuted")
    return <Navigate to="/loginPage" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;