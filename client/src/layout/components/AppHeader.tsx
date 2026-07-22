import { Layout, Button, Avatar, Dropdown, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";

const { Header } = Layout;
const { Text } = Typography;

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppHeader({ collapsed, onToggle }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dropdownItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 24px 0 0",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left — collapse toggle */}
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{ fontSize: 16, width: 64, height: 64 }}
      />

      {/* Right — user avatar + dropdown */}
      <Dropdown menu={{ items: dropdownItems }} placement='bottomRight' arrow>
        <Space style={{ cursor: "pointer" }}>
          <Avatar
            size='small'
            icon={<UserOutlined />}
            style={{ backgroundColor: "#4F46E5" }}
          />
          <Text strong style={{ fontSize: 14 }}>
            {user?.name}
          </Text>
        </Space>
      </Dropdown>
    </Header>
  );
}
