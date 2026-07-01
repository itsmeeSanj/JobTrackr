import express from "express";
import {
  register,
  login,
  logout,
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// ── Public routes (no auth required) ────────────────
authRouter.post("/register", register);
authRouter.post("/login", login);
// authRouter.post("/logout", logout);
// authRouter.post("/send-reset-otp", sendResetOtp);
// authRouter.post("/verify-reset-otp", verifyResetOtp);
// authRouter.post("/reset-password", resetPassword);

// ── Protected routes (auth required) ────────────────
authRouter.get("/is-auth", userAuth, (req, res) => {
  res.json({ success: true, message: "Authenticated" });
});

export default authRouter;
