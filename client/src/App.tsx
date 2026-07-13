import React from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";

import router from "./routers/router";

function App() {
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4F46E5",
            borderRadius: 8,
            fontFamily: "Inter, sans-serif",
          },
          components: {
            Form: {
              itemMarginBottom: 16,
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;
