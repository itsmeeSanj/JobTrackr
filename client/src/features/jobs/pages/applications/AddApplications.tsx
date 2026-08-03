import React from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { addJob } from "../../services/jobServices";
import JobForm from "../../components/JobForm";
import type { Job } from "../../../../types/job.types";

export default function AddApplications() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: Partial<Job>) => {
    try {
      setLoading(true);
      await addJob(values);
      message.success("Application added successfully!");
      navigate("/applications");
    } catch (err) {
      const e = err as Error;
      message.error(e.message || "Failed to add application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Header ── */}
      <div className='flex items-center gap-4 mb-6'>
        <button
          onClick={() => navigate("/applications")}
          className='flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors'
        >
          <ArrowLeftOutlined />
          <span className='text-sm'>Back</span>
        </button>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>Add application</h2>
          <p className='text-gray-500 text-sm'>Track a new job application</p>
        </div>
      </div>

      {/* ── Form card ── */}
      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          maxWidth: 800,
        }}
      >
        <JobForm mode='add' loading={loading} onSubmit={handleSubmit} />
      </Card>
    </>
  );
}
