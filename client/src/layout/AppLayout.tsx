import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader";

const { Content } = Layout;

function AppLayout() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar — defined once, used by all pages */}
      <Sidebar collapsed={collapsed} />

      <Layout>
        {/* Header — defined once, used by all pages */}
        <AppHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />

        {/* Page content — each page renders here */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 12,
            minHeight: 280,
          }}
        >
          <Outlet /> {/* ← Dashboard, Applications, Kanban render here */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
