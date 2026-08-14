import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getStats,
  getFollowUpJobs,
} from "../controllers/jobController.js";
import upload from "../middleware/upload.js";

const jobRouter = express.Router();

// get all routes protected
jobRouter.get("/stats", userAuth, getStats); // ← must be BEFORE /:id
jobRouter.get("/follow-up", userAuth, getFollowUpJobs);

// upload
jobRouter.post("/:id/resume", userAuth, upload.single("resume"), uploadResume);
jobRouter.delete("/:id/resume", userAuth, deleteResume);

jobRouter.get("/", userAuth, getJobs);
jobRouter.post("/", userAuth, addJob);
jobRouter.get("/:id", userAuth, getJob);
jobRouter.put("/:id", userAuth, updateJob);
jobRouter.delete("/:id", userAuth, deleteJob);
// followup

export default jobRouter;
