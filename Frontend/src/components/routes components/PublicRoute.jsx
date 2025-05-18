import useAuth from "../../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth?.user) {
    return <Navigate to={from} replace={true} />;
  }

  return <Outlet />;
};

export default PublicRoute;
