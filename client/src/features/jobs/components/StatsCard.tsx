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
    <Card>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-[15px] uppercase font-bold mb-4'>{title}</h2>
          <p className='text-2xl text-gray-900'>
            {value}
            {suffix && (
              <span className='text-base font-normal ml-1'>{suffix}</span>
            )}
          </p>
        </div>
        <div
          className='w-13 h-13 rounded-xl flex items-center justify-center text-xl'
          style={{ backgroundColor: `${color}18`, color }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
