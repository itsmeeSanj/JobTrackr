import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated && location.pathname === "/verify-email") {
    return <Outlet />;
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
