import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";

export async function getAllUsers(req, res) {
  try {
    const users = await userModel
      .find()
      .select(
        "-password -verifyOtp -resetOtp -verifyOtpExpireAt -resetOtpExpireAt",
      )
      .sort({ createdAt: -1 });

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const jobCount = await jobModel.countDocuments({ userId: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isAccountVerified: user.isAccountVerified,
          jobCount,
          createdAt: user.createdAt,
        };
      }),
    );

    return res.json({ success: true, users: usersWithStats });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// Platform;
export async function getPlatformStats(req, res) {
  try {
    const totalUsers = await userModel.countDocuments({ role: "user" });
    const totalAdmins = await userModel.countDocuments({ role: "admin" });
    const verifiedUsers = await userModel.countDocuments({
      isAccountVerified: true,
    });
    const totalJobs = await jobModel.countDocuments();

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const newUsersThisWeek = await userModel.countDocuments({
      createdAt: { $gte: weekStart },
    });

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        verifiedUsers,
        totalJobs,
        newUsersThisWeek,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export async function deleteUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.role === "admin") {
      return res.json({ success: false, message: "Cannot delete an admin" });
    }

    await jobModel.deleteMany({ userId }); // ← delete their jobs first
    await userModel.findByIdAndDelete(userId);

    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// Toggle user role
export async function toggleUserRole(req, res) {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // prevent admin demoting themselves
    if (String(user._id) === String(req.userId)) {
      return res.json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    return res.json({
      success: true,
      message: `User is now ${user.role}`,
      role: user.role,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
