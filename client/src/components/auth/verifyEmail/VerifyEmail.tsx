import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import AuthSidePanel from "../common/AuthSidePanel";
import AuthMobileLogo from "../common/AuthMobileLogo";

export default function VerifyEmail() {
  const { backendUrl, user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [resending, setResending] = React.useState(false);
  const [form] = Form.useForm();

  // ── If already verified → go to dashboard ────────
  React.useEffect(() => {
    if (user?.isAccountVerified) {
      navigate("/dashboard");
    }
  }, [user]);

  // ── Verify OTP ────────────────────────────────────
  const handleVerify = async (values: { otp: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: values.otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // ── update user in context ──
      if (user) {
        login({ ...user, isAccountVerified: true });
      }

      message.success("Email verified successfully!");
      navigate("/dashboard");
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Resend OTP ────────────────────────────────────
  const handleResend = async () => {
    try {
      setResending(true);
      const res = await fetch(`${backendUrl}/api/auth/send-verify-otp`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      message.success("New OTP sent to your email!");
      form.resetFields();
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left panel */}
      <AuthSidePanel />
      <div className='w-full lg:w-1/2 overflow-y-auto'>
        <div className='min-h-screen flex items-center justify-center p-8'>
          <div className='w-full max-w-md'>
            {/* Mobile logo */}
            <AuthMobileLogo />
            <div className='mb-8'>
              <h2 className='text-2xl font-bold mb-1.5'>Confirm your email</h2>
              <p className='text-gray-500 text-sm'>
                We sent a code to 6-digit verification code to your{" "}
                <span className='text-indigo-600 font-medium text-sm '>
                  {user?.email ?? "email"}
                </span>
              </p>
            </div>

            {/* Form */}
            <Form
              form={form}
              layout='vertical'
              onFinish={handleVerify}
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
                <Input.OTP length={6} size='large' style={{ width: "100%" }} />
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
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  Verify email
                </Button>
              </Form.Item>

              {/* Resend */}
              <div className='text-center'>
                <p className='text-gray-500 text-sm'>
                  Didn't receive the code?{" "}
                  <button
                    type='button'
                    onClick={handleResend}
                    disabled={resending}
                    className='text-indigo-600 cursor-pointer font-medium hover:text-indigo-500 disabled:opacity-50'
                  >
                    {resending ? "Sending..." : "Resend code"}
                  </button>
                </p>
              </div>
            </Form>
            {/* Footer */}
            <p className='text-center text-gray-400 text-xs mt-6'>
              Code expires in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
