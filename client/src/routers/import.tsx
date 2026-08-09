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
export const VerifyEmail = React.lazy(
  () => import("../components/auth/verifyEmail/VerifyEmail"),
);

// pages
export const AppLayout = React.lazy(() => import("../layout/AppLayout"));
export const Dashboard = React.lazy(
  () => import("../features/jobs/pages/Dashboard"),
);
export const Applications = React.lazy(
  () => import("../features/jobs/pages/applications/Applications"),
);
export const AddApplications = React.lazy(
  () => import("../features/jobs/pages/applications/AddApplications"),
);
export const Profile = React.lazy(
  () => import("../features/jobs/pages/profile/Profile"),
);
export const ChangePassword = React.lazy(
  () => import("../features/jobs/pages/changePassword/ChangePassword"),
);
