import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    jobUrl: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Remote", "Hybrid"],
      default: "Full-time",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

const jobModel = mongoose.models.job || mongoose.model("job", jobSchema);
export default jobModel;
