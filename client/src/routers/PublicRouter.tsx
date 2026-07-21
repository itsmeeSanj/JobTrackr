// src/routers/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  // ── if logged in → redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
