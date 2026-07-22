import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  ProjectOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const menuItems = [
  {
    key: "/dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
  },
  {
    key: "/applications",
    icon: <UnorderedListOutlined />,
    label: "Applications",
  },
  {
    key: "/kanban",
    icon: <ProjectOutlined />,
    label: "Kanban",
  },
  {
    key: "/profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];

interface Props {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        scrollbarWidth: "thin",
        background: "#4F46E5",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 56,
          margin: "12px 16px",
          borderRadius: 10,
          background: "#4F46E5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {collapsed ? (
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>
            J
          </span>
        ) : (
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
            JobTrackr
          </span>
        )}
      </div>

      {/* Nav items */}
      <Menu
        mode='inline'
        className='bg-[#4F46E5]!'
        selectedKeys={[location.pathname]} // ← highlights active page
        items={menuItems}
        onClick={({ key }) => navigate(key)} // ← navigates on click
      />
    </Sider>
  );
}
