import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resource.js";

const app = express();
const port = process.env.PORT || 3000
connectDB();
const allowedOrigins =['http://localhost:5173']; // Frontend URL

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


//API Endpoints
app.get('/', (req, res)=> res.send("API is running "))
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/resource', resourceRouter );

app.listen(port, ()=> console.log(`Server is running on port: ${port}`));
