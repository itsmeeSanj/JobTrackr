// src/constants/status.ts

export const STATUS_COLORS = {
  Applied: { bg: "#EEF2FF", color: "#4338CA", dot: "#4F46E5" },
  Interview: { bg: "#FFFBEB", color: "#92400E", dot: "#F59E0B" },
  Offer: { bg: "#ECFDF5", color: "#065F46", dot: "#10B981" },
  Rejected: { bg: "#FEF2F2", color: "#991B1B", dot: "#EF4444" },
} as const; // ← let TypeScript infer the type

export const STATUS_OPTIONS = [
  { label: "Applied", value: "Applied" },
  { label: "Interview", value: "Interview" },
  { label: "Offer", value: "Offer" },
  { label: "Rejected", value: "Rejected" },
];
