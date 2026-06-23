import express from "express";
import cors from "cors"; //Allow frontend to talk to backend
import "dotenv/config"; //Load .env variables
import cookieParser from "cookie-parser"; //Read HTTP-only cookies

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "JobTrackr API is running",
  });
});

app.use("/api/aut", authRouter);
app.use("/api/jobs", jobRouter);

// start server
app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
