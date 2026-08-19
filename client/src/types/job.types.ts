export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Remote"
  | "Hybrid";

export interface Job {
  _id: string;
  userId: string;
  company: string;
  role: string;
  jobUrl: string;
  status: JobStatus;
  appliedDate: string;
  salary: string;
  location: string;
  jobType: JobType;
  notes: string;
  createdAt: string;
  updatedAt: string;
  resumeUrl: string;
  resumePublicId: string;
}

export interface JobStats {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
  thisWeek: number;
}
