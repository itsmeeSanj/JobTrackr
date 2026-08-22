import api from "../../../lib/axios";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isAccountVerified: boolean;
  jobCount: number;
  createdAt: string;
}

export interface PlatformStats {
  totalUsers: number;
  totalAdmins: number;
  verifiedUsers: number;
  totalJobs: number;
  newUsersThisWeek: number;
}

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const res = await api.get("/api/admin/users");
  return res.data.users;
};

export const getPlatformStats = async (): Promise<PlatformStats> => {
  const res = await api.get("/api/admin/stats");
  return res.data.stats;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/api/admin/users/${userId}`);
};

export const toggleUserRole = async (userId: string): Promise<void> => {
  await api.put(`/api/admin/users/${userId}/role`);
};
