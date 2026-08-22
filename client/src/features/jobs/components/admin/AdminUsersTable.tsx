import {
  Card,
  Table,
  Tag,
  Button,
  Popconfirm,
  Badge,
  message,
  Empty,
} from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import {
  deleteUser,
  toggleUserRole,
  type AdminUser,
} from "../../../admin/services/adminService";

interface Props {
  users: AdminUser[];
  onRefresh?: () => void;
}

export default function AdminUsersTable({ users, onRefresh }: Props) {
  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      message.success("User deleted");
      onRefresh?.();
    } catch {
      message.error("Failed to delete user");
    }
  };

  const handleToggleRole = async (userId: string) => {
    try {
      await toggleUserRole(userId);
      message.success("Role updated");
      onRefresh?.();
    } catch {
      message.error("Failed to update role");
    }
  };

  const columns: TableProps<AdminUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className='font-medium text-gray-900'>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className='text-gray-600'>{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          style={{
            background: role === "admin" ? "#F5F3FF" : "#EEF2FF",
            color: role === "admin" ? "#6D28D9" : "#4338CA",
            border: "none",
            borderRadius: 6,
            fontWeight: 500,
          }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isAccountVerified",
      key: "isAccountVerified",
      render: (verified) =>
        verified ? (
          <Badge status='success' text='Verified' />
        ) : (
          <Badge status='warning' text='Unverified' />
        ),
    },
    {
      title: "Jobs",
      dataIndex: "jobCount",
      key: "jobCount",
      render: (count) => (
        <span className='text-gray-500 text-sm'>{count ?? 0}</span>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className='text-gray-500 text-sm'>
          {dayjs(date).format("MMM DD, YYYY")}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className='flex gap-2'>
          <Popconfirm
            title={`Make this user ${
              record.role === "admin" ? "a user" : "an admin"
            }?`}
            onConfirm={() => handleToggleRole(record._id)}
          >
            <Button size='small'>
              {record.role === "admin" ? "Demote" : "Promote"}
            </Button>
          </Popconfirm>

          <Popconfirm
            title='Delete this user?'
            description='This deletes all their jobs too.'
            onConfirm={() => handleDelete(record._id)}
            okButtonProps={{ danger: true }}
          >
            <Button size='small' danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card
      title={<h2 className='text-[15px] uppercase font-bold'>All Users</h2>}
      className='text-sm!'
    >
      <Table
        columns={columns}
        dataSource={users}
        rowKey='_id'
        scroll={{ x: true }}
        locale={{ emptyText: <Empty description='No users yet' /> }}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
        }}
      />
    </Card>
  );
}
