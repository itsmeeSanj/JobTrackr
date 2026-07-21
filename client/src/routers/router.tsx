import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Root,
  Login,
  Register,
  ResetPassword,
  ErrorFallback,
  ProtectedRoute,
  PublicRoute,
} from "./import";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <Navigate to='/login' replace />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          // ← app pages go here later
        ],
      },
    ],
  },
]);

export default router;
