// register, login, logout, OTP
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
import transporter from "../utils/sendEmail.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const isEmail = await userModel.findOne({ email });
    if (isEmail) {
      return res.json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashed });
    await user.save();

    //  Generate OTP
    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = OTP;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // send email
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "JobTrackr — Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
          <h2>Welcome to JobTrackr! 👋</h2>
          <p>Hi ${name}, thanks for signing up!</p>
          <p>Your verification code is:</p>
          <h1 style="letter-spacing: 8px; color: #4F46E5;">${OTP}</h1>
          <p>This code is valid for <strong>10 minutes</strong>.</p>
          <p>If you didn't create an account, ignore this email.</p>
        </div>
      `,
    });

    // create tokens
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // send response
    return res.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// login
export async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// logout
export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// verify email
export async function verifyEmail(req, res) {
  const { otp } = req.body;

  if (!otp) {
    res.json({
      success: false,
      message: "OTP is required",
    });
  }

  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      res.json({ success: false, message: "OTP has expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified success" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// send reset otp
export async function sendResetOtp(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = OTP;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    // send email
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "JobTrackr — Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
          <h2>Password Reset</h2>
          <p>Your OTP to reset your password is:</p>
          <h1 style="letter-spacing: 8px; color: #4F46E5;">${OTP}</h1>
          <p>Valid for <strong>15 minutes</strong>.</p>
          <p>If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
export async function verifyResetOtp(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    return res.json({ success: true, message: "OTP verified" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// reset password
export async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP has expired, please request a new one",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
