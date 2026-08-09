import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

// ── Get user data ─────────────────────────────────
export async function getUserData(req, res) {
  try {
    const user = await userModel
      .findById(req.userId)
      .select(
        "-password -verifyOtp -resetOtp -verifyOtpExpireAt -resetOtpExpireAt",
      );

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// ── Get profile ───────────────────────────────────
export async function getProfile(req, res) {
  try {
    const user = await userModel
      .findById(req.userId)
      .select(
        "-password -verifyOtp -resetOtp -verifyOtpExpireAt -resetOtpExpireAt",
      );

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// ── Update profile ────────────────────────────────
export async function updateProfile(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.json({ success: false, message: "Name and email are required" });
  }

  try {
    // check email not taken by another user
    const existing = await userModel.findOne({ email });
    if (existing && String(existing._id) !== String(req.userId)) {
      return res.json({ success: false, message: "Email already in use" });
    }

    const user = await userModel
      .findByIdAndUpdate(req.userId, { name, email }, { new: true })
      .select("-password");

    return res.json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
