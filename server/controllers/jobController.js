// CRUD + stats for jobs

import jobModel from "../models/jobModel";

export async function addJobs(req, res) {
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
    return res.json({ success: true, message: error.message });
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
