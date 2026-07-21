import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { Button, Form, Input, Steps, message } from "antd";
import { MdOutlineMail } from "react-icons/md";
import { LockOutlined, SafetyOutlined, MailOutlined } from "@ant-design/icons";

// ── Step types ────────────────────────────────────────
type Step = 0 | 1 | 2;

function ResetPassword() {
  const { backendUrl } = useAuth();
  const navigate = useNavigate();

  const [current, setCurrent] = React.useState<Step>(0);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");

  const [emailForm] = Form.useForm();
  const [otpForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // ── Step 1 — Send OTP ─────────────────────────────
  const handleSendOtp = async (values: { email: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/send-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: values.email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setEmail(values.email);
      message.success("OTP sent to your email!");
      setCurrent(1);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2 — Verify OTP ───────────────────────────
  const handleVerifyOtp = async (values: { otp: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp: values.otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setOtp(values.otp);
      message.success("OTP verified!");
      setCurrent(2);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3 — Reset Password ───────────────────────
  const handleResetPassword = async (values: { newPassword: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          otp,
          newPassword: values.newPassword,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      message.success("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='flex items-center gap-2 mb-8 justify-center'>
          <div className='w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>J</span>
          </div>
          <span className='text-gray-800 font-semibold text-xl'>JobTrackr</span>
        </div>

        {/* Card */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
          {/* Steps indicator — dots only */}
          <Steps
            current={current}
            size='small'
            style={{ marginBottom: 32 }}
            items={[
              { icon: <MailOutlined /> },
              { icon: <SafetyOutlined /> },
              { icon: <LockOutlined /> },
            ]}
          />

          {/* ── Step 1: Email ── */}
          {current === 0 && (
            <>
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Forgot password?
                </h2>
                <p className='text-gray-500 mt-1'>
                  Enter your email and we'll send you a reset code
                </p>
              </div>

              <Form
                form={emailForm}
                layout='vertical'
                onFinish={handleSendOtp}
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
                    Send reset code
                  </Button>
                </Form.Item>

                <p className='text-center text-gray-600 text-sm'>
                  Remember your password?{" "}
                  <Link
                    to='/login'
                    className='text-indigo-600 font-medium hover:text-indigo-500'
                  >
                    Sign in
                  </Link>
                </p>
              </Form>
            </>
          )}

          {/* ── Step 2: OTP ── */}
          {current === 1 && (
            <>
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Enter your code
                </h2>
                <p className='text-gray-500 mt-1'>
                  We sent a 6-digit code to{" "}
                  <span className='font-medium text-gray-700'>{email}</span>
                </p>
              </div>

              <Form
                form={otpForm}
                layout='vertical'
                onFinish={handleVerifyOtp}
                autoComplete='off'
                requiredMark={false}
              >
                <Form.Item
                  name='otp'
                  label={
                    <span className='text-gray-700 font-medium'>
                      Verification code
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter the OTP" },
                    { len: 6, message: "OTP must be 6 digits" },
                  ]}
                >
                  <Input.OTP length={6} size='large' />
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
                    Verify code
                  </Button>
                </Form.Item>

                <p className='text-center text-gray-600 text-sm'>
                  Didn't receive it?{" "}
                  <button
                    type='button'
                    onClick={() => setCurrent(0)}
                    className='text-indigo-600 font-medium hover:text-indigo-500'
                  >
                    Resend code
                  </button>
                </p>
              </Form>
            </>
          )}

          {/* ── Step 3: New Password ── */}
          {current === 2 && (
            <>
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Set new password
                </h2>
                <p className='text-gray-500 mt-1'>
                  Choose a strong password for your account
                </p>
              </div>

              <Form
                form={passwordForm}
                layout='vertical'
                onFinish={handleResetPassword}
                autoComplete='off'
                requiredMark={false}
              >
                <Form.Item
                  name='newPassword'
                  label={
                    <span className='text-gray-700 font-medium'>
                      New password
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter a new password" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className='text-gray-400' />}
                    placeholder='Min. 8 characters'
                    size='large'
                  />
                </Form.Item>

                <Form.Item
                  name='confirmPassword'
                  label={
                    <span className='text-gray-700 font-medium'>
                      Confirm new password
                    </span>
                  }
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
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
                    placeholder='Re-enter new password'
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
                    Reset password
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </div>

        {/* Footer */}
        <p className='text-center text-gray-400 text-xs mt-6'>
          By using JobTrackr you agree to our{" "}
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
  );
}

export default ResetPassword;
