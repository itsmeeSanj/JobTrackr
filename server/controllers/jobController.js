// CRUD + stats for jobs

import jobModel from "../models/jobModel.js";

export async function addJob(req, res) {
  const {
    company,
    role,
    jobUrl,
    status,
    appliedDate,
    salary,
    location,
    jobType,
    notes,
  } = req.body;

  if (!company || !role) {
    return res.json({
      success: false,
      message: "Company and role are required",
    });
  }

  try {
    const job = new jobModel({
      userId: req.userId,
      company,
      role,
      jobUrl,
      status,
      appliedDate,
      salary,
      location,
      jobType,
      notes,
    });

    await job.save();

    return res.json({
      success: true,
      message: "Job added successfully",
      job,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// get all jobs
export async function getJobs(req, res) {
  try {
    const jobs = await jobModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// get single jobs
export async function getJob(req, res) {
  const { id } = req.params;

  try {
    const job = await jobModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    return res.json({ success: true, job });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// update job
export async function updateJob(req, res) {
  const { id } = req.params;
  const {
    company,
    role,
    jobUrl,
    status,
    appliedDate,
    salary,
    location,
    jobType,
    notes,
  } = req.body;

  try {
    const job = await jobModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    if (company) job.company = company;
    if (role) job.role = role;
    if (jobUrl !== undefined) job.jobUrl = jobUrl;
    if (status) job.status = status;
    if (appliedDate) job.appliedDate = appliedDate;
    if (salary !== undefined) job.salary = salary;
    if (location !== undefined) job.location = location;
    if (jobType) job.jobType = jobType;
    if (notes !== undefined) job.notes = notes;

    await job.save();

    return res.json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// delete job
export async function deleteJob(req, res) {
  const { id } = req.params;

  try {
    const job = await jobModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    await jobModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// get dashboard stats
export async function getStats(req, res) {
  try {
    const total = await jobModel.countDocuments({
      userId: req.userId,
    });

    const applied = await jobModel.countDocuments({
      userId: req.userId,
      status: "Applied",
    });

    const interview = await jobModel.countDocuments({
      userId: req.userId,
      status: "Interview",
    });

    const offer = await jobModel.countDocuments({
      userId: req.userId,
      status: "Offer",
    });

    const rejected = await jobModel.countDocuments({
      userId: req.userId,
      status: "Rejected",
    });

    // ── Jobs added this week ──────────────────────────
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const thisWeek = await jobModel.countDocuments({
      userId: req.userId,
      createdAt: { $gte: weekStart },
    });

    return res.json({
      success: true,
      stats: {
        total,
        applied,
        interview,
        offer,
        rejected,
        thisWeek,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
