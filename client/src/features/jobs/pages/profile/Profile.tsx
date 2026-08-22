import React from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  MailOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { useAuth } from "../../../auth/hooks/useAuth";
import api from "../../../../lib/axios";

interface ProfileFormValues {
  name: string;
  email: string;
}

export default function Profile() {
  const { user, login } = useAuth();
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<ProfileFormValues>();

  // ── pre-fill form ─────────────────────────────────
  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  // ── handle save ───────────────────────────────────
  const handleSave = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      const res = await api.put("/api/user/profile", values);
      const data = res.data;
      if (!data.success) throw new Error(data.message);

      // ── update context + localStorage ──
      login({ ...user!, ...values });
      message.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      const e = err as Error;
      message.error(e.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ── handle cancel ─────────────────────────────────
  const handleCancel = () => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
    });
    setEditing(false);
  };

  if (!user) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <Card>
      {/* ── Page header ── */}
      <div className='mb-2'>
        <h2 className='text-xl font-bold capitalize '>My Account</h2>
        <p className='text-gray-500 text-sm'>
          Manage your personal information
        </p>
      </div>

      {/* ── Info section ── */}
      <div className='px-2'>
        {/* Edit button */}
        {!editing && (
          <div className='flex justify-end mb-4'>
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditing(true)}
              style={{ borderRadius: 8 }}
            >
              Edit profile
            </Button>
          </div>
        )}
        <Row>
          {" "}
          {!editing && (
            <Col span={24} md={12}>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <div className=' text-[15px]'>Full Name:</div>
                  <div className='text-[15px] capitalize font-medium'>
                    {user.name}
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <div className=' text-[15px]'>Email address:</div>
                  <div className='text-[15px] capitalize font-medium'>
                    {user.email}
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <div className=' text-[15px]'>Member since:</div>
                  <div className='text-[15px] capitalize font-medium'>
                    {dayjs().format("MMMM YYYY")}
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
        {/* ── View mode ── */}

        {/* ── Edit mode ── */}
        {editing && (
          <>
            <div className='flex justify-end mb-4'>
              <Button icon={<CloseOutlined size={12} />} onClick={handleCancel}>
                Cancel
              </Button>
            </div>

            <Col span={24} md={12}>
              <Form
                form={form}
                onFinish={handleSave}
                autoComplete='off'
                requiredMark={false}
              >
                <Form.Item
                  name='name'
                  label='Full name'
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className='text-gray-400' />}
                    placeholder='John Doe'
                    size='medium'
                  />
                </Form.Item>

                <Form.Item
                  name='email'
                  label='Email address'
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className='text-gray-400' />}
                    placeholder='you@example.com'
                    size='medium'
                  />
                </Form.Item>

                {/* Action buttons */}
                <div className='flex gap-3'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    icon={<SaveOutlined />}
                    loading={loading}
                    size='large'
                    style={{
                      background: "#4F46E5",
                      borderColor: "#4F46E5",
                      borderRadius: 8,
                      flex: 1,
                      display: "inline-block",
                    }}
                  >
                    Save changes
                  </Button>
                </div>
              </Form>
            </Col>
          </>
        )}
      </div>
    </Card>
  );
}
