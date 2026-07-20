import { createBrowserRouter } from "react-router-dom";
import { Root, Login, Register, ErrorFallback, ProtectedRoute } from "./import";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorFallback />,
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
        element: <ProtectedRoute />,
        children: [
          // ← app pages go here later
        ],
      },
    ],
  },
]);

export default router;
