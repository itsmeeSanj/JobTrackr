import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new cloudinaryStorage({
  cloudinary,
  params: {
    folder: "jobtrackr/resumes",
    allowed_formats: ["pdf"],
    resource_type: "raw",
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ← 5MB max
});

export default upload;
