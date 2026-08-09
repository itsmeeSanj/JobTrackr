import React from "react";
import { Alert, Spin, message } from "antd";

import type { Job } from "../../../../types/job.types";
import {
  getJobs,
  deleteJob,
  addJob,
  updateJob,
} from "../../services/jobServices";
import ApplicationsFilters from "../../components/applications/ApplicationsFilters";
import ApplicationsTable from "../../components/applications/ApplicationsTable";
import AddJobModal from "../../components/applications/AddJobModal";
import EditJobModal from "../../components/applications/EditJobModal";

export default function Applications() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [filtered, setFiltered] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);

  // ── Fetch ─────────────────────────────────────────
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setFiltered(data);
    } catch (err) {
      const e = err as Error;
      setError(e.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  // ── Search + filter ───────────────────────────────
  React.useEffect(() => {
    let result = [...jobs];
    if (statusFilter !== "all") {
      result = result.filter((j) => j.status === statusFilter);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.company.toLowerCase().includes(query) ||
          j.role.toLowerCase().includes(query) ||
          j.location?.toLowerCase().includes(query),
      );
    }
    setFiltered(result);
  }, [search, statusFilter, jobs]);

  // ── Add ───────────────────────────────────────────
  const handleAdd = async (values: Partial<Job>) => {
    try {
      setSubmitting(true);
      await addJob(values);
      message.success("Application added!");
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      const e = err as Error;
      message.error(e.message || "Failed to add application");
    } finally {
      setSubmitting(false);
    }
  };

  // EDIT

  const handleEditClick = (job: Job) => {
    setSelectedJob(job); // ← store job to pre-fill form
    setIsEditOpen(true); // ← open edit modal
  };

  const handleEditSubmit = async (values: Partial<Job>) => {
    if (!selectedJob) return;
    try {
      setSubmitting(true);
      await updateJob(selectedJob._id, values);
      message.success("Application updated!");
      setIsEditOpen(false);
      setSelectedJob(null); // ← clear selected job
      fetchJobs();
    } catch (err) {
      const e = err as Error;
      message.error(e.message || "Failed to update application");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      message.success("Job deleted");
      fetchJobs();
    } catch (err) {
      const e = err as Error;
      message.error(e.message || "Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
        <div>
          <h2 className='text-xl font-bold capitalize mb-1'>Applications</h2>
          <p className='text-gray-500 text-sm'>
            {filtered.length} of {jobs.length} applications
          </p>
        </div>
        {/* <Button
          type='primary'
          size='large'
          icon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
          style={{
            background: "#4F46E5",
            borderColor: "#4F46E5",
            borderRadius: 8,
          }}
        >
          Add Application
        </Button> */}
      </div>

      {error && <Alert type='error' showIcon className='mb-4' />}

      <ApplicationsFilters
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onclick={() => setIsModalOpen(true)}
      />

      <ApplicationsTable
        jobs={filtered}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      <AddJobModal
        open={isModalOpen}
        loading={submitting}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />

      <EditJobModal
        open={isEditOpen}
        loading={submitting}
        job={selectedJob} // ← pre-fills form
        onClose={() => {
          setIsEditOpen(false);
          setSelectedJob(null);
        }}
        onSubmit={handleEditSubmit}
      />
    </>
  );
}
