import { Modal } from "antd";
import type { Job } from "../../../../types/job.types";
import JobForm from "../JobForm";

interface Props {
  open: boolean;
  loading: boolean;
  job: Job | null;
  onClose: () => void;
  onSubmit: (values: Partial<Job>) => Promise<void>;
}

export default function EditJobModal({
  open,
  loading,
  job,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Modal
      title={
        <div className='border-b pb-3 mb-2'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Edit application
          </h2>
          <p className='text-gray-500 text-sm font-normal'>
            {job?.company} — {job?.role}
          </p>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      style={{ top: 20 }}
      width={{ xs: "90%", sm: "80%", md: "70%", lg: "60%" }}
      destroyOnClose // ← resets form when modal closes
    >
      {job && (
        <JobForm
          mode='edit'
          loading={loading}
          initialValues={job} // ← pre-fills with existing data
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  );
}
