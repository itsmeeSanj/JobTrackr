// src/features/jobs/pages/Dashboard.tsx
import React from "react";
import dayjs from "dayjs";
import { Col, Row, Spin, Alert } from "antd";
import relativeTime from "dayjs/plugin/relativeTime";

import { useAuth } from "../../auth/hooks/useAuth";
import type { Job, JobStats } from "../../../types/job.types";
import { getJobs, getStats } from "../services/jobServices";

import StatsGrid from "../components/StatsGrid ";
import StatusPieChart from "../components/StatusPieChart";
import StatusBarChart from "../components/StatusBarChart";
import RecentJobTable from "../components/RecentJobTable";

dayjs.extend(relativeTime);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = React.useState<JobStats | null>(null);
  const [recentJobs, setRecentJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // ── Fetch stats + recent jobs ─────────────────────
  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsData, jobsData] = await Promise.all([
          getStats(),
          getJobs(),
        ]);
        setStats(statsData);
        setRecentJobs(jobsData.slice(0, 5)); // ← last 5 jobs
      } catch (err) {
        const e = err as Error;
        setError(e.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <>
      {/* ── Welcome banner ── */}
      <div
        className='rounded-2xl py-7 px-4 mb-4'
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
        }}
      >
        <h2 className='text-xl font-bold pb-1 text-white'>
          Welcome back, <span className='capitalize'>{user?.name}</span>!
        </h2>
        <p className='text-sm text-gray-100'>
          {dayjs().format("dddd, MMMM D, YYYY")} · {stats?.thisWeek ?? 0}{" "}
          applications this week
        </p>
      </div>

      {/* ── Error ── */}
      {error && <Alert type='error' showIcon className='mb-4' />}

      {/* ── Stats cards ── */}
      <StatsGrid stats={stats} />

      {/* ── Charts row ── */}
      <Row gutter={[16, 16]} className='mb-4'>
        {/* Pie chart */}
        <Col xs={24} lg={12}>
          <StatusPieChart stats={stats} />
        </Col>

        {/* Bar chart */}
        <Col xs={24} lg={12}>
          <StatusBarChart stats={stats} />
        </Col>
      </Row>

      {/* ── Recent applications ── */}
      <RecentJobTable jobs={recentJobs} />
    </>
  );
}
