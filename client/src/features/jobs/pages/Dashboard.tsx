import React from "react";
import { Col, Row, Spin, Alert, Card } from "antd";

import { useAuth } from "../../auth/hooks/useAuth";
import type { Job, JobStats } from "../../../types/job.types";
import { getJobs, getStats } from "../services/jobServices";
import {
  getAllUsers,
  getPlatformStats,
  type AdminUser,
  type PlatformStats,
} from "../../admin/services/adminService";

import StatsGrid from "../components/StatsGrid ";
import StatusPieChart from "../components/StatusPieChart";
import StatusBarChart from "../components/StatusBarChart";
import RecentJobTable from "../components/RecentJobTable";
import AdminStatsGrid from "../components/admin/AdminStatsGrid";
import AdminUsersTable from "../components/admin/AdminUsersTable";
import WelcomeBanner from "../components/WelcomeBanner";

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role == "admin";

  const [stats, setStats] = React.useState<JobStats | null>(null);
  const [recentJobs, setRecentJobs] = React.useState<Job[]>([]);

  // admin data
  const [platformStats, setPlatformStats] =
    React.useState<PlatformStats | null>(null);
  const [users, setUsers] = React.useState<AdminUser[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // ── Fetch data based on role  ─────────────────────
  const loadData = async () => {
    try {
      setLoading(true);

      if (isAdmin) {
        const [platformData, usersData, statsData, jobsData] =
          await Promise.all([
            getPlatformStats(),
            getAllUsers(),
            getStats(),
            getJobs(),
          ]);
        setPlatformStats(platformData);
        setUsers(usersData);
        setStats(statsData);
        setRecentJobs(jobsData.slice(0, 5));
      } else {
        const [statsData, jobsData] = await Promise.all([
          getStats(),
          getJobs(),
        ]);
        setStats(statsData);
        setRecentJobs(jobsData.slice(0, 5));
      }
    } catch (err) {
      const e = err as Error;
      setError(e.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user) loadData();
  }, [isAdmin, user]);

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
      <WelcomeBanner
        isAdmin={isAdmin}
        user={user}
        stats={stats}
        platform={platformStats}
      />

      {/* ── Error ── */}
      {error && <Alert type='error' showIcon className='mb-4' />}

      {isAdmin && (
        <>
          <Card
            title={
              <h2 className='text-[15px] uppercase font-bold'>
                Platform Overview
              </h2>
            }
          >
            <AdminStatsGrid stats={platformStats} />
          </Card>

          {/* StatsGrid */}
          <Card
            title={
              <h2 className='text-[15px] uppercase font-bold'>
                My Applications
              </h2>
            }
            className='my-4!'
          >
            <StatsGrid stats={stats} />
          </Card>

          <AdminUsersTable users={users} onRefresh={loadData} />
        </>
      )}

      {!isAdmin && (
        <>
          <StatsGrid stats={stats} />

          <Row gutter={[16, 16]} className='mb-4'>
            <Col xs={24} lg={12}>
              <StatusPieChart stats={stats} />
            </Col>
            <Col xs={24} lg={12}>
              <StatusBarChart stats={stats} />
            </Col>
          </Row>

          <RecentJobTable jobs={recentJobs} />
        </>
      )}
    </>
  );
}
