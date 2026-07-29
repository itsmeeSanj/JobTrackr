import { Card, Empty } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { JobStats } from "../../../types/job.types";

const BAR_DATA = [
  { name: "Applied", key: "applied", color: "#4F46E5" },
  { name: "Interview", key: "interview", color: "#F59E0B" },
  { name: "Offer", key: "offer", color: "#10B981" },
  { name: "Rejected", key: "rejected", color: "#EF4444" },
];

interface Props {
  stats: JobStats | null;
}
export default function StatusBarChart({ stats }: Props) {
  const barData = BAR_DATA.map((item) => ({
    name: item.name,
    count: stats?.[item.key as keyof JobStats] ?? 0,
    color: item.color,
  }));

  return (
    <Card
      title='Applications by status'
      bordered={false}
      style={{ borderRadius: 12 }}
    >
      {stats && stats.total > 0 ? (
        <ResponsiveContainer width='100%' height={260}>
          <BarChart
            data={barData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
            <XAxis dataKey='name' tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey='count' radius={[6, 6, 0, 0]}>
              {barData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Empty description='No data yet' />
      )}
    </Card>
  );
}
