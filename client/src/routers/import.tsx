import React from "react";

export const Root = React.lazy(() => import("../layout/RootLayout"));
export const Login = React.lazy(() => import("../components/auth/login/Login"));
export const Register = React.lazy(
  () => import("../components/auth/register/Register"),
);

export const ErrorFallback = React.lazy(
  () => import("../components/errorFallback/ErrorFallback"),
);
export const ProtectedRoute = React.lazy(() => import("./ProtectedRouter"));
