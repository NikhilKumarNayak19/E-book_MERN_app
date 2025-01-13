import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resource.js";
import readLaterRouter from "./routes/readLaterRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

//Connect to MongoDB
connectDB();
const cors = require("cors");
 //Define allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://clinquant-cuchufli-da38a3.netlify.app", // Add deployed frontend URL
];

 //Configure CORS options
app.use(
  cors({
    origin: "https://e-book-mern-app.vercel.app/",
    methods: ["GET", "POST", "UPDATE", "PUT"],
    Credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// API Endpoints
app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/readlater", readLaterRouter);

// Start the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
