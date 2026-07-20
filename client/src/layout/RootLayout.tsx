import { Outlet } from "react-router-dom";
import { AuthProvider } from "../features/auth/context/AuthProvider";

function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default RootLayout;
