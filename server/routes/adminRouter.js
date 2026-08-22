import express from "express";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  getAllUsers,
  getPlatformStats,
  deleteUser,
  toggleUserRole,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// ── all routes need login + admin role ────────────
adminRouter.get("/users", userAuth, adminAuth, getAllUsers);
adminRouter.get("/stats", userAuth, adminAuth, getPlatformStats);
adminRouter.delete("/users/:userId", userAuth, adminAuth, deleteUser);
adminRouter.put("/users/:userId/role", userAuth, adminAuth, toggleUserRole);

export default adminRouter;
