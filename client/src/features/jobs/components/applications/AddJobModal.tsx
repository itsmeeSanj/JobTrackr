import { Modal } from "antd";

import type { Job } from "../../../../types/job.types";
import JobForm from "../JobForm";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<Job>) => Promise<void>;
}

export default function AddJobModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Modal
      title={
        <div className='border-b pb-2 mb-2 border-gray-300'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Add Application
          </h2>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      style={{ top: 20 }}
      width={{ xs: "90%", sm: "80%", md: "70%", lg: "60%" }}
    >
      <JobForm mode='add' loading={loading} onSubmit={onSubmit} />
    </Modal>
  );
}
