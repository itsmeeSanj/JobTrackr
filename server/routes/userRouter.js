import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.get("/profile", userAuth, getProfile);
userRouter.put("/profile", userAuth, updateProfile);
userRouter.put("/change-password", userAuth, changePassword);

export default userRouter;
