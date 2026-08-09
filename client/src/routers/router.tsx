import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Root,
  Login,
  Register,
  ResetPassword,
  VerifyEmail,
  ErrorFallback,
  ProtectedRoute,
  PublicRoute,
  AppLayout,
  Profile,
  Dashboard,
  Applications,
  AddApplications,
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
          {
            path: "verify-email",
            element: <VerifyEmail />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          // ← app pages go here later
          {
            element: <AppLayout />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              {
                path: "applications",
                children: [
                  {
                    index: true,
                    element: <Applications />,
                  },
                  {
                    path: "add",
                    element: <AddApplications />,
                  },
                ],
              },
              { path: "profile", element: <Profile /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
