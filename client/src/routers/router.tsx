import { createBrowserRouter } from "react-router-dom";
import { Root, Login, Register, ErrorFallback } from "./import";

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
    ],
  },
]);

export default router;
