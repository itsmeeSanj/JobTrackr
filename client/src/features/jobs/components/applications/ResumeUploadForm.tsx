import React from "react";
import { Upload, Button, message } from "antd";
import {
  UploadOutlined,
  FilePdfOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd";

interface Props {
  initialResumeUrl?: string;
  onFileChange: (file: File | null) => void;
  onDeleteResume?: () => void;
}

export default function ResumeUpload({
  initialResumeUrl,
  onFileChange,
  onDeleteResume,
}: Props) {
  const [fileList, setFileList] = React.useState<UploadFile[]>(() => {
    if (initialResumeUrl) {
      return [
        {
          uid: "-1",
          name: "Current resume.pdf",
          status: "done",
          url: initialResumeUrl,
        },
      ];
    }
    return [];
  });

  const beforeUpload = (file: File) => {
    const isPDF = file.type === "application/pdf";
    const isUnder5MB = file.size < 5 * 1024 * 1024;

    if (!isPDF) {
      message.error("Only PDF files are allowed");
      return Upload.LIST_IGNORE;
    }
    if (!isUnder5MB) {
      message.error("File must be smaller than 5MB");
      return Upload.LIST_IGNORE;
    }

    // ── add to list manually ──────────────────────
    const uploadFile: UploadFile = {
      uid: Date.now().toString(),
      name: file.name,
      status: "done",
      size: file.size,
      type: file.type,
    };
    setFileList([uploadFile]);
    onFileChange(file);
    return false;
  };

  const handleRemove = (file: UploadFile) => {
    if (file.uid === "-1" && onDeleteResume) {
      onDeleteResume();
    }
    onFileChange(null);
    setFileList([]);
    return true;
  };

  const handleDelete = (file: UploadFile) => {
    if (file.uid === "-1" && onDeleteResume) {
      onDeleteResume();
    }
    onFileChange(null);
    setFileList([]);
  };

  return (
    <>
      {/* ── Upload button ── */}
      <Upload
        accept='.pdf'
        maxCount={1}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        showUploadList={false}
      >
        {fileList.length === 0 && (
          <Button icon={<UploadOutlined />}>
            Upload resume (PDF, max 5MB)
          </Button>
        )}
      </Upload>

      {/* ── Custom file list ── */}
      {fileList.map((file) => (
        <div
          key={file.uid}
          className='flex items-center justify-between p-3 mt-2
                     border border-gray-200 rounded-lg bg-gray-50'
        >
          <div className='flex items-center gap-2'>
            <FilePdfOutlined style={{ color: "#EF4444", fontSize: 20 }} />
            <div>
              <p className='text-sm font-medium text-gray-800 mb-0'>
                {file.name}
              </p>
              <p className='text-xs text-gray-400 mb-0'>
                {file.uid === "-1" ? "Uploaded" : "Ready to upload"}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {file.url && (
              <a
                href={file.url}
                target='_blank'
                rel='noreferrer'
                className='text-indigo-600 text-xs hover:underline'
              >
                View
              </a>
            )}
            <Button
              size='small'
              type='text'
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(file);
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
}
