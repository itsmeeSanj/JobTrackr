import express from "express";
import {
  register,
  login,
  logout,
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// ── Public routes (no auth required) ────────────────
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-reset-otp", sendResetOtp); // ← no userAuth
authRouter.post("/verify-reset-otp", verifyResetOtp);
authRouter.post("/reset-password", resetPassword);

// ── Protected routes (auth required) ────────────────
authRouter.post("/verify-email", userAuth, verifyEmail); // ← needs auth
authRouter.get("/is-auth", userAuth, (req, res) => {
  res.json({ success: true, message: "Authenticated" });
});

export default authRouter;
