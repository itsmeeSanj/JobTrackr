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
