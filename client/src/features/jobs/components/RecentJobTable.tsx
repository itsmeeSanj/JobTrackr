import { Card, Empty, Table, Tag, type TableProps } from "antd";
import type { Job } from "../../../types/job.types";
import { useNavigate } from "react-router-dom";
import { STATUS_COLORS } from "../../../constants/status";
import dayjs from "dayjs";

interface Props {
  jobs: Job[];
}

export default function RecentJobTable({ jobs }: Props) {
  const navigate = useNavigate();

  const columns: TableProps<Job>["columns"] = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <span className='font-medium text-gray-900'>{text}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <span className='text-gray-600'>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          style={{
            background: STATUS_COLORS[status as keyof typeof STATUS_COLORS]?.bg,
            color: STATUS_COLORS[status as keyof typeof STATUS_COLORS]?.color,
            border: "none",
            borderRadius: 6,
            fontWeight: 500,
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Applied",
      dataIndex: "appliedDate",
      key: "appliedDate",
      render: (date) => (
        <span className='text-gray-500 text-sm'>
          {dayjs(date).format("MMM DD, YYYY")}
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => (
        <span className='text-gray-500 text-sm'>{text || "—"}</span>
      ),
    },
  ];
  return (
    <Card
      title='Recent applications'
      bordered={false}
      style={{ borderRadius: 12 }}
      extra={
        <button
          onClick={() => navigate("/applications")}
          className='text-indigo-600 text-sm font-medium hover:text-indigo-500'
        >
          View all →
        </button>
      }
    >
      <Table
        columns={columns}
        dataSource={jobs}
        rowKey='_id'
        pagination={false}
        locale={{ emptyText: <Empty description='No applications yet' /> }}
      />
    </Card>
  );
}
