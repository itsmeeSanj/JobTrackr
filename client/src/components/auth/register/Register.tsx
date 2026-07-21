import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { LockOutlined } from "@ant-design/icons";
import AuthSidePanel from "../common/AuthSidePanel";
import AuthMobileLogo from "../common/AuthMobileLogo";
import { useAuth } from "../../../features/auth/hooks/useAuth";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const { backendUrl } = useAuth(); // ← no login needed here
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<RegisterFormValues>();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      setLoading(true);

      // strip confirmPassword — backend doesn't need it
      const { confirmPassword: _, ...payload } = values;

      const res = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      message.success("Account created! Please verify your email.");
      form.resetFields();
      navigate("/verify-email"); // ← verify email first
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Registration failed. Please try again.");
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
                Create your account
              </h2>
              <p className='text-gray-500 mt-1'>
                Start tracking your job applications today
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
              {/* Name */}
              <Form.Item
                name='name'
                label={
                  <span className='text-gray-700 font-medium'>Full name</span>
                }
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  prefix={<CiUser className='text-gray-400' />}
                  placeholder='John Doe'
                  size='large'
                />
              </Form.Item>

              {/* Email */}
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

              {/* Password */}
              <Form.Item
                name='password'
                label={
                  <span className='text-gray-700 font-medium'>Password</span>
                }
                rules={[
                  { required: true, message: "Please enter a password" },
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

              {/* Confirm Password */}
              <Form.Item
                name='confirmPassword'
                label={
                  <span className='text-gray-700 font-medium'>
                    Confirm password
                  </span>
                }
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className='text-gray-400' />}
                  placeholder='Re-enter your password'
                  size='large'
                />
              </Form.Item>

              {/* Submit */}
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
                  Create account
                </Button>
              </Form.Item>

              {/* Divider */}
              <div className='flex items-center gap-3 my-6'>
                <div className='flex-1 h-px bg-gray-200' />
                <span className='text-gray-400 text-sm'>or</span>
                <div className='flex-1 h-px bg-gray-200' />
              </div>

              {/* Login link */}
              <p className='text-center text-gray-600 text-sm'>
                Already have an account?{" "}
                <Link
                  to='/login'
                  className='text-indigo-600 font-medium hover:text-indigo-500'
                >
                  Sign in
                </Link>
              </p>
            </Form>

            {/* Footer */}
            <p className='text-center text-gray-400 text-xs mt-8'>
              By creating an account you agree to our{" "}
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

export default Register;
