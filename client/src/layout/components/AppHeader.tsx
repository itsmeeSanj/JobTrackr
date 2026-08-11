import React from "react";
import { Layout, Button, Avatar, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";

import { useAuth } from "../../features/auth/hooks/useAuth";
import NotificationSidebar from "./NotificationSidebar";
import { getInitials } from "../../utils/stringUtils";

const { Header } = Layout;

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppHeader({ collapsed, onToggle }: Props) {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const dropdownItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Account",
      onClick: () => navigate("/profile"),
    },
    {
      key: "changepassword",
      icon: <RiLockPasswordLine />,
      label: "Change Password",
      onClick: () => navigate("/changepassword"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
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
        style={{ fontSize: 24, width: 64 }}
      />

      {/* Right — user avatar + dropdown */}
      <div className='flex items-center gap-x-2.5'>
        {/*  */}

        <NotificationSidebar
          open={open}
          showDrawer={showDrawer}
          close={onClose}
        />
        {/*  */}

        <Dropdown menu={{ items: dropdownItems }} placement='bottomLeft' arrow>
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              style={{
                backgroundColor: "#4F46E5",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {user?.name ? getInitials(user.name) : <UserOutlined />}
            </Avatar>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}
