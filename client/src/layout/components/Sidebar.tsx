import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const menuItems = [
  {
    key: "/dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
  },
  // {
  //   key: "/applications",
  //   label: "Applications",
  //   icon: <UnorderedListOutlined />,
  //   children: [
  //     { key: "5", label: "Create" },
  //     { key: "7", label: "Option 7" },
  //     { key: "8", label: "Option 8" },
  //   ],
  // },
  {
    key: "/applications",
    icon: <UnorderedListOutlined />,
    label: "Applications",
  },
  // {
  //   key: "/kanban",
  //   icon: <ProjectOutlined />,
  //   label: "Kanban",
  // },
];

interface Props {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, onCollapse }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      trigger={null}
      breakpoint='md'
      collapsedWidth={64}
      onBreakpoint={(broken) => {
        onCollapse(broken);
      }}
      collapsible
      collapsed={collapsed}
      width={250}
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
          padding: collapsed ? "16px 0" : "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,.3)",
        }}
      >
        {collapsed ? (
          <span
            className='text-white font-bold text-xl'
            style={{
              display: "inline-block",
              textAlign: "center",
              width: "100%",
            }}
          >
            J
          </span>
        ) : (
          <span className='text-white font-bold text-xl tracking-wide w-full text-left'>
            JobTrackr
          </span>
        )}
      </div>

      {/* Nav items */}
      <Menu
        mode='inline'
        className='bg-[#4F46E5]! '
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        // 4. Overrides internal default antd paddings to cleanly fit 64px limits
        inlineIndent={20}
      />
    </Sider>
  );
}
