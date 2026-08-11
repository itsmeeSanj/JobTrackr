// src/services/jobService.ts
import api from "../../../lib/axios";
import type { Job, JobStats } from "../../../types/job.types";

export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get("/api/jobs");
  return res.data.jobs;
};

export const getStats = async (): Promise<JobStats> => {
  const res = await api.get("/api/jobs/stats");
  return res.data.stats;
};

export const addJob = async (job: Partial<Job>): Promise<Job> => {
  const res = await api.post("/api/jobs", job);
  return res.data.job;
};

export const updateJob = async (
  id: string,
  job: Partial<Job>,
): Promise<Job> => {
  const res = await api.put(`/api/jobs/${id}`, job);
  return res.data.job;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/api/jobs/${id}`);
};

// followup
export const getFollowUpJobs = async (): Promise<Job[]> => {
  try {
    const res = await api.get("/api/jobs/follow-up");
    return res.data.jobs ?? []; // ← fallback to empty array
  } catch {
    return []; // ← never throw, return empty array
  }
};
