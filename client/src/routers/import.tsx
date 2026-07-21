import React from "react";
export const Root = React.lazy(() => import("../layout/RootLayout"));
export const ErrorFallback = React.lazy(
  () => import("../components/errorFallback/ErrorFallback"),
);
export const PublicRoute = React.lazy(() => import("./PublicRouter"));
export const ProtectedRoute = React.lazy(() => import("./ProtectedRouter"));

// auth pages
export const Login = React.lazy(() => import("../components/auth/login/Login"));
export const Register = React.lazy(
  () => import("../components/auth/register/Register"),
);
export const ResetPassword = React.lazy(
  () => import("../components/auth/resetPassword/ResetPassword"),
);
