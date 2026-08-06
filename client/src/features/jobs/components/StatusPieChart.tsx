import { Card, Empty } from "antd";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { JobStats } from "../../../types/job.types";

const PIE_COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444"];
interface Props {
  stats: JobStats | null;
}

export default function StatusPieChart({ stats }: Props) {
  // ── Pie chart data ────────────────────────────────
  const pieData = stats
    ? [
        { name: "Applied", value: stats.applied },
        { name: "Interview", value: stats.interview },
        { name: "Offer", value: stats.offer },
        { name: "Rejected", value: stats.rejected },
      ].filter((d) => d.value > 0)
    : [];
  return (
    <Card
      title={
        <h2 className='text-[15px] uppercase font-bold'>
          Application breakdown
        </h2>
      }
      className='text-sm!'
    >
      {pieData.length > 0 ? (
        <ResponsiveContainer width='100%' height={260}>
          <PieChart>
            <Pie
              data={pieData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey='value'
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Empty description='No applications yet' />
      )}
    </Card>
  );
}
