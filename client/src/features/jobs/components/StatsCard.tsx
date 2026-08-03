// src/features/jobs/components/StatsCard.tsx
import { Card } from "antd";
import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  suffix?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color,
  suffix,
}: Props) {
  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-gray-500 text-sm mb-1'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>
            {value}
            {suffix && (
              <span className='text-base font-normal ml-1'>{suffix}</span>
            )}
          </p>
        </div>
        <div
          className='w-12 h-12 rounded-xl flex items-center justify-center text-2xl'
          style={{ backgroundColor: `${color}18`, color }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
