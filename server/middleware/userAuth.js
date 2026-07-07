// verify JWT from cookie

import jwt from "jsonwebtoken";

export default async function userAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid/Expired token",
    });
  }
}
