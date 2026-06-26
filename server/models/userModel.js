// Job schema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // ← everyone starts as user
    },

    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
