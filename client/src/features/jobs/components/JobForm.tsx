import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import {
  MdOutlineWork,
  MdOutlineLocationOn,
  MdOutlineLink,
} from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { IoCashOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { STATUS_OPTIONS } from "../../../constants/status";
import { JOB_TYPE_OPTIONS } from "../../../constants/jobTypes";
import type { Job } from "../../../types/job.types";
import ResumeUploadForm from "./applications/ResumeUploadForm";
import { deleteResume } from "../services/jobServices";

interface Props {
  initialValues?: Partial<Job>;
  onSubmit: (values: Partial<Job>, resumeFile: File | null) => Promise<void>;
  loading: boolean;
  mode: "add" | "edit";
}

export default function JobForm({
  initialValues,
  onSubmit,
  loading,
  mode,
}: Props) {
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [form] = Form.useForm();

  const defaultValues = initialValues
    ? {
        ...initialValues,
        appliedDate: initialValues.appliedDate
          ? dayjs(initialValues.appliedDate)
          : dayjs(),
      }
    : {
        status: "Applied",
        jobType: "Full-time",
        appliedDate: dayjs(),
      };

  const handleFinish = async (values: Partial<Job>) => {
    await onSubmit(
      {
        ...values,
        appliedDate: values.appliedDate
          ? dayjs(values.appliedDate as unknown as string).toISOString()
          : dayjs().toISOString(),
      },
      resumeFile, // ← second arg
    );
    if (mode === "add") form.resetFields();

    // if (resumeFile && initialValues?._id) {
    //   console.log("resume");
    //   try {
    //     await uploadResume(initialValues._id, resumeFile);
    //     message.success("Resume uploaded!");
    //   } catch {
    //     message.error("Failed to upload resume");
    //   }
    // }

    // if (mode === "add") form.resetFields();
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleFinish}
      initialValues={defaultValues}
      autoComplete='off'
      requiredMark={false}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
        {/* Company — required ✅ */}
        <Form.Item
          name='company'
          label={<span className='font-base text-gray-700'>Company</span>}
          rules={[
            { required: true, message: "Please enter the company name." },
          ]}
        >
          <Input
            prefix={<BsBuildingsFill className='text-gray-400' />}
            placeholder='Enter the company name'
            size='large'
          />
        </Form.Item>

        {/* Job Title — required ✅ */}
        <Form.Item
          name='role'
          label={<span className='font-base text-gray-700'>Job Title</span>}
          rules={[{ required: true, message: "Please enter the job title." }]}
        >
          <Input
            prefix={<MdOutlineWork className='text-gray-400' />}
            placeholder='Enter the job title'
            size='large'
          />
        </Form.Item>

        {/* Status — required ✅ */}
        <Form.Item
          name='status'
          label={
            <span className='font-base text-gray-700'>Application Status</span>
          }
          rules={[
            {
              required: true,
              message: "Please select the application status.",
            },
          ]}
        >
          <Select
            size='large'
            placeholder='Select the application status'
            options={[...STATUS_OPTIONS]}
          />
        </Form.Item>

        {/* Employment Type — added required ← */}
        <Form.Item
          name='jobType'
          label={
            <span className='font-base text-gray-700'>Employment Type</span>
          }
          rules={[
            { required: true, message: "Please select the employment type." },
          ]}
        >
          <Select
            size='large'
            placeholder='Select the employment type'
            options={[...JOB_TYPE_OPTIONS]}
          />
        </Form.Item>

        {/* Application Date — added required ← */}
        <Form.Item
          name='appliedDate'
          label={
            <span className='font-base text-gray-700'>Application Date</span>
          }
          rules={[
            { required: true, message: "Please select the application date." },
          ]}
        >
          <DatePicker
            size='large'
            style={{ width: "100%" }}
            format='MMM DD, YYYY'
            placeholder='Select the application date'
          />
        </Form.Item>

        {/* Work Location — added required ← */}
        <Form.Item
          name='location'
          label={<span className='font-base text-gray-700'>Work Location</span>}
          rules={[
            { required: true, message: "Please enter the work location." },
          ]}
        >
          <Input
            prefix={<MdOutlineLocationOn className='text-gray-400' />}
            placeholder='Enter the work location'
            size='large'
          />
        </Form.Item>

        {/* Salary — required ✅ */}
        <Form.Item
          name='salary'
          label={<span className='font-base text-gray-700'>Salary Range</span>}
          rules={[
            { required: true, message: "Please enter the salary range." },
          ]}
        >
          <Input
            prefix={<IoCashOutline className='text-gray-400' />}
            placeholder='Enter the salary range'
            size='large'
          />
        </Form.Item>

        {/* Job Posting Link — added required ← */}
        <Form.Item
          name='jobUrl'
          label={
            <span className='font-base text-gray-700'>Job Posting Link</span>
          }
          rules={[
            { required: true, message: "Please enter the job posting link." },
            { type: "url", message: "Please enter a valid URL." },
          ]}
        >
          <Input
            prefix={<MdOutlineLink className='text-gray-400' />}
            placeholder='Paste the job posting link'
            size='large'
          />
        </Form.Item>
      </div>

      {/* Resume */}
      <Form.Item
        label={<span className='text-gray-700 font-medium'>Resume (PDF)</span>}
      >
        <ResumeUploadForm
          initialResumeUrl={initialValues?.resumeUrl}
          onFileChange={(file) => setResumeFile(file)}
          onDeleteResume={() => {
            // ← uncommented
            if (initialValues?._id) {
              deleteResume(initialValues._id);
            }
          }}
        />
      </Form.Item>

      {/* Notes */}
      <Form.Item
        name='notes'
        label={<span className='font-base text-gray-700'>Notes</span>}
      >
        <Input.TextArea
          rows={4}
          placeholder='Add notes about this job application'
        />
      </Form.Item>

      <Form.Item className='mb-0!'>
        <Button
          block
          type='primary'
          htmlType='submit'
          size='large'
          loading={loading}
        >
          {mode === "add" ? "Add" : "Update"}
        </Button>
      </Form.Item>
    </Form>
  );
}
