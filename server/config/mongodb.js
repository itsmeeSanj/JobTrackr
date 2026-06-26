// database connection
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    });

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
