import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./connection.js";
import auth from "./routes/authRoute.js";
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import mongoose from "mongoose";

const app = express();

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PATCH, DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected" });
  }
  next();
});

app.use("/api/auth", auth);
app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);
app.use("/api/category", categoryRoute);

connectMongoDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`server is live at port ${PORT}`);
});
