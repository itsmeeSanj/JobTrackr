import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getStats,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

// get all routes protected
jobRouter.get("/stats", userAuth, getStats); // ← must be BEFORE /:id
jobRouter.get("/", userAuth, getJobs);
jobRouter.post("/", userAuth, addJob);
jobRouter.get("/:id", userAuth, getJob);
jobRouter.put("/:id", userAuth, updateJob);
jobRouter.delete("/:id", userAuth, deleteJob);

export default jobRouter;
