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
      width={230}
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
          minHeight: 56,
          margin: "0 0 12px ",
          padding: "16px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,.6)",
        }}
      >
        {collapsed ? (
          <span className='text-white font-bold text-xl'>J</span>
        ) : (
          <span className='text-white font-bold text-xl'>JobTrackr</span>
        )}
      </div>

      {/* Nav items */}
      <Menu
        mode='inline'
        className='bg-[#4F46E5]! '
        selectedKeys={[location.pathname]} // ← highlights active page
        items={menuItems}
        onClick={({ key }) => navigate(key)} // ← navigates on click
      />
    </Sider>
  );
}
