import { Col, Row } from "antd";
import {
  CloseCircleOutlined,
  RiseOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import StatsCard from "./StatsCard";
import type { JobStats } from "../../../types/job.types";

interface Props {
  stats: JobStats | null;
}

export default function StatsGrid({ stats }: Props) {
  const cards = [
    {
      title: "Total Applications",
      value: stats?.total ?? 0,
      icon: <TeamOutlined size={10} />,
      color: "#4F46E5",
    },
    {
      title: "Interviews",
      value: stats?.interview ?? 0,
      icon: <RiseOutlined size={10} />,
      color: "#F59E0B",
    },
    {
      title: "Offers",
      value: stats?.offer ?? 0,
      icon: <TrophyOutlined size={10} />,
      color: "#10B981",
    },
    {
      title: "Rejected",
      value: stats?.rejected ?? 0,
      icon: <CloseCircleOutlined size={10} />,
      color: "#EF4444",
    },
  ];

  return (
    <Row gutter={[16, 16]} className='mb-4'>
      {cards.map((card) => (
        <Col xs={24} sm={12} lg={12} key={card.title}>
          <StatsCard {...card} />
        </Col>
      ))}
    </Row>
  );
}
