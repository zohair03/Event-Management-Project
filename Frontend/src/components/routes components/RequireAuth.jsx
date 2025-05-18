import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.jsx";


const RequiredAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return allowedRoles.includes(auth?.user?.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unAuthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace/>
  );
};

export default RequiredAuth;
