import React from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import { LockOutlined, SaveOutlined } from "@ant-design/icons";

import api from "../../../../lib/axios";

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<ChangePasswordValues>();

  const handleSubmit = async (values: ChangePasswordValues) => {
    try {
      setLoading(true);
      const res = await api.put("/api/user/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      const data = res.data;
      if (!data.success) throw new Error(data.message);

      message.success("Password updated successfully!");
      form.resetFields();
    } catch (err) {
      const e = err as Error;
      message.error(e.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='mb-4'>
        <h2 className='text-xl font-bold capitalize '>Change password</h2>
        <p className='text-gray-500 text-sm'>
          Make sure your new password is at least 8 characters
        </p>
      </div>

      <Row>
        <Col span={24} md={12}>
          <Form
            form={form}
            layout='vertical'
            onFinish={handleSubmit}
            autoComplete='off'
            requiredMark={false}
          >
            {/* Current password */}
            <Form.Item
              name='currentPassword'
              label={<span className='text-gray-700 '>Current password</span>}
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='text-gray-400' />}
                placeholder='Enter current password'
                size='large'
              />
            </Form.Item>

            {/* New password */}
            <Form.Item
              name='newPassword'
              label={<span className='text-gray-700 '>New password</span>}
              rules={[
                { required: true, message: "Please enter a new password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className='text-gray-400' />}
                placeholder='Min. 8 characters'
                size='large'
              />
            </Form.Item>

            {/* Confirm new password */}
            <Form.Item
              name='confirmPassword'
              label={
                <span className='text-gray-700 '>Confirm new password</span>
              }
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='text-gray-400' />}
                placeholder='Re-enter new password'
                size='large'
              />
            </Form.Item>

            <Form.Item className='mb-0'>
              <Button
                type='primary'
                htmlType='submit'
                icon={<SaveOutlined size={14} />}
                loading={loading}
                size='large'
              >
                Update password
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
