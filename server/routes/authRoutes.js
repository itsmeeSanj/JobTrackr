/* 
/api/auth/*
/api/jobs/*
*/

import express from "express";

const authRouter = express.Router();

// ── Public routes (no auth required) ────────────────
// authRouter.post("/register", register);
// authRouter.post("/login", login);
// authRouter.post("/logout", logout);
// authRouter.post("/send-reset-otp", sendResetOtp);
// authRouter.post("/verify-reset-otp", verifyResetOtp);
// authRouter.post("/reset-password", resetPassword);

// ── Protected routes (auth required) ────────────────
// authRouter.get("/is-auth", userAuth, (req, res) => {
//   res.json({ success: true, message: "Authenticated" });
// });

export default authRouter;
