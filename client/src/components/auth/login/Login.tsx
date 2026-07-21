import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { MdOutlineMail } from "react-icons/md";
import { LockOutlined } from "@ant-design/icons";

import AuthSidePanel from "../common/AuthSidePanel";
import AuthMobileLogo from "../common/AuthMobileLogo";
import { useAuth } from "../../../features/auth/hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { login, backendUrl } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<LoginFormValues>();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      login(data.user);
      message.success(`Welcome back, ${data.user.name}!`);
      form.resetFields(); // ← added
      navigate("/dashboard");
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left panel */}
      <AuthSidePanel />

      {/* Right panel */}
      <div className='w-full lg:w-1/2 overflow-y-auto'>
        <div className='min-h-screen flex items-center justify-center p-8'>
          <div className='w-full max-w-md'>
            {/* Mobile logo */}
            <AuthMobileLogo />

            {/* Heading */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Welcome back 👋
              </h2>
              <p className='text-gray-500 mt-1'>
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <Form
              form={form}
              layout='vertical'
              onFinish={handleSubmit}
              autoComplete='off'
              requiredMark={false}
            >
              <Form.Item
                name='email'
                label={
                  <span className='text-gray-700 font-medium'>
                    Email address
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MdOutlineMail className='text-gray-400' />}
                  placeholder='you@example.com'
                  size='large'
                />
              </Form.Item>

              <Form.Item
                name='password'
                label={
                  <div className='flex items-center justify-between w-full'>
                    <span className='text-gray-700 font-medium'>Password</span>
                    <Link
                      to='/reset-password'
                      className='text-indigo-600 text-sm font-medium hover:text-indigo-500'
                    >
                      Forgot password?
                    </Link>
                  </div>
                }
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 4, message: "Password must be at least 4 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className='text-gray-400' />}
                  placeholder='Min. 8 characters'
                  size='large'
                />
              </Form.Item>

              <Form.Item className='mb-4'>
                <Button
                  block
                  type='primary'
                  htmlType='submit'
                  size='large'
                  loading={loading}
                  style={{
                    background: "#4F46E5",
                    borderColor: "#4F46E5",
                    height: 48,
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  Sign in
                </Button>
              </Form.Item>

              {/* Divider */}
              <div className='flex items-center gap-3 my-6'>
                <div className='flex-1 h-px bg-gray-200' />
                <span className='text-gray-400 text-sm'>or</span>
                <div className='flex-1 h-px bg-gray-200' />
              </div>

              {/* Register link */}
              <p className='text-center text-gray-600 text-sm'>
                Don&apos;t have an account?{" "}
                <Link
                  to='/register'
                  className='text-indigo-600 font-medium hover:text-indigo-500'
                >
                  Create one free
                </Link>
              </p>
            </Form>

            {/* Footer */}
            <p className='text-center text-gray-400 text-xs mt-8'>
              By signing in you agree to our{" "}
              <a href='#' className='underline'>
                Terms
              </a>{" "}
              and{" "}
              <a href='#' className='underline'>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
