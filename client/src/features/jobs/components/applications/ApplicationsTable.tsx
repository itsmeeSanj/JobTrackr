import { Table, Tag, Button, Space, Popconfirm, Empty } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { Job } from "../../../../types/job.types";
import { STATUS_COLORS } from "../../../../constants/status";

interface Props {
  jobs: Job[];
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
}

export default function ApplicationsTable({ jobs, onDelete, onEdit }: Props) {
  const columns: TableProps<Job>["columns"] = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
      render: (text) => (
        <span className='font-medium text-gray-900'>{text}</span>
      ),
      responsive: ["md"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <span className='text-gray-600'>{text}</span>,
      responsive: ["md"],
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
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => (
        <span className='text-gray-500 text-sm'>{text || "—"}</span>
      ),
      responsive: ["md"],
      width: 250,
    },
    {
      title: "Job-Type",
      dataIndex: "jobType",
      key: "jobType",
      render: (text) => (
        <span className='text-gray-500 text-sm'>{text || "—"}</span>
      ),
    },
    {
      title: "Applied",
      dataIndex: "appliedDate",
      key: "appliedDate",
      sorter: (a, b) =>
        dayjs(a.appliedDate).unix() - dayjs(b.appliedDate).unix(),
      render: (date) => (
        <span className='text-gray-500 text-sm'>
          {dayjs(date).format("MMM DD, YYYY")}
        </span>
      ),
      responsive: ["md"],
      width: 125,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            size='small'
            icon={<EditOutlined />}
            onClick={() => onEdit(record)} // ← pass whole job object
          />
          <Popconfirm
            title='Delete this application?'
            description='This action cannot be undone.'
            onConfirm={() => onDelete(record._id)}
            okText='Delete'
            okButtonProps={{ danger: true }}
            cancelText='Cancel'
          >
            <Button size='small' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={jobs}
      rowKey='_id'
      scroll={{ x: true }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
        showTotal: (total) => `Total ${total} applications`,
      }}
      locale={{
        emptyText: <Empty description='No applications found' />,
      }}
    />
  );
}
