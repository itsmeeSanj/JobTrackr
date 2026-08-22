import { Col, Row } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  FileOutlined,
} from "@ant-design/icons";
import StatsCard from "../StatsCard";
import type { PlatformStats } from "../../../admin/services/adminService";

interface Props {
  stats: PlatformStats | null;
}

export default function AdminStatsGrid({ stats }: Props) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: <TeamOutlined />,
      color: "#4F46E5",
    },
    {
      title: "Verified Users",
      value: stats?.verifiedUsers ?? 0,
      icon: <CheckCircleOutlined />,
      color: "#10B981",
    },
    {
      title: "New This Week",
      value: stats?.newUsersThisWeek ?? 0,
      icon: <RiseOutlined />,
      color: "#F59E0B",
    },
    {
      title: "Total Jobs Tracked",
      value: stats?.totalJobs ?? 0,
      icon: <FileOutlined />,
      color: "#6366F1",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {cards.map((card) => (
        <Col xs={24} sm={12} lg={12} key={card.title}>
          <StatsCard {...card} />
        </Col>
      ))}
    </Row>
  );
}
