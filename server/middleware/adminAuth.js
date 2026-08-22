import userModel from "../models/userModel.js";

export default async function adminAuth(req, res, next) {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
}
