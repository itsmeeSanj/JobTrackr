import React from "react";
import {
  Avatar,
  Badge,
  Drawer,
  Flex,
  List,
  Typography,
  Empty,
  Spin,
  Tag,
} from "antd";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getInitials } from "../../utils/stringUtils";
import { getFollowUpJobs } from "../../features/jobs/services/jobServices";
import type { Job } from "../../types/job.types";

dayjs.extend(relativeTime);

// ── Avatar color based on company name ───────────
const colors = ["#4F46E5", "#7265e6", "#00a2ae", "#f56a00", "#10B981"];
const colorOf = (name: string) => colors[name.charCodeAt(0) % colors.length];

interface Props {
  open: boolean;
  showDrawer: () => void;
  close: () => void;
}

function NotificationSidebar({ open, showDrawer, close }: Props) {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(false);

  // ── Fetch follow up jobs ──────────────────────────
  React.useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getFollowUpJobs();
        setJobs(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {/* ── Bell icon ── */}
      <Badge count={jobs.length} size='small' color='#f56a00'>
        <Avatar
          shape='circle'
          icon={<FaBell />}
          style={{ backgroundColor: "#4F46E5", cursor: "pointer" }}
          onClick={showDrawer}
        />
      </Badge>

      {/* ── Drawer ── */}
      <Drawer
        title={
          <Flex align='center' gap={8}>
            <span className='font-semibold text-gray-900'>Notifications</span>
            {jobs.length > 0 && (
              <Tag color='orange' style={{ borderRadius: 20, fontSize: 11 }}>
                {jobs.length} pending
              </Tag>
            )}
          </Flex>
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={close}
        open={open}
        styles={{ body: { padding: "12px 16px" } }}
      >
        {/* Loading */}
        {loading && (
          <div className='flex justify-center py-12'>
            <Spin size='large' />
          </div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className='text-gray-400 text-sm'>
                No follow-ups needed 🎉
              </span>
            }
            style={{ marginTop: 60 }}
          />
        )}

        {/* List */}
        {!loading && jobs.length > 0 && (
          <>
            <p className='text-gray-400 text-xs mb-3 px-1'>
              Applied 7+ days ago with no update
            </p>

            <List
              dataSource={jobs}
              rowKey='_id'
              renderItem={(job) => (
                <List.Item
                  style={{
                    padding: "10px 12px",
                    marginBottom: 6,
                    borderRadius: 10,
                    cursor: "pointer",
                    border: "1px solid [#ccc]",
                    background: "#fafafa",
                  }}
                  onClick={() => {
                    navigate("/applications");
                    close();
                  }}
                >
                  <Flex gap={12} align='flex-start' style={{ width: "100%" }}>
                    {/* Company avatar */}
                    <Avatar
                      style={{
                        backgroundColor: colorOf(job.company),
                        fontWeight: 700,
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      {getInitials(job.company)}
                    </Avatar>

                    {/* Job info */}
                    <Flex vertical flex='auto' style={{ minWidth: 0 }}>
                      <Flex justify='space-between' align='center' gap={4}>
                        <Typography.Text
                          strong
                          style={{ fontSize: 13 }}
                          ellipsis
                        >
                          {job.company}
                        </Typography.Text>
                        <Typography.Text
                          type='secondary'
                          style={{ fontSize: 11, whiteSpace: "nowrap" }}
                        >
                          {dayjs(job.appliedDate).fromNow()}
                        </Typography.Text>
                      </Flex>

                      <Typography.Text
                        type='secondary'
                        style={{ fontSize: 12 }}
                        ellipsis
                      >
                        {job.role}
                      </Typography.Text>

                      <div className='flex items-center gap-1 mt-1'>
                        <span style={{ fontSize: 11, color: "#F59E0B" }}>
                          ⏰ Time to follow up
                        </span>
                      </div>
                    </Flex>
                  </Flex>
                </List.Item>
              )}
            />

            {/* Footer */}
            <div
              className='text-center mt-4 pt-3 border-t text-indigo-600
                         text-sm font-medium cursor-pointer hover:text-indigo-500'
              onClick={() => {
                navigate("/applications");
                close();
              }}
            >
              View all →
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}

export default NotificationSidebar;
