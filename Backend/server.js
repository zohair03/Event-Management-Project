import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./connection.js";
import auth from "./routes/authRoute.js";
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { handleWebhook } from "./controllers/paymentController.js";
import { jwtAuthMiddleware } from "./middleware/auth.js";
import { authorizedRoles } from "./middleware/roles.js";
import mongoose from "mongoose";

const app = express();

dotenv.config({ path: "./.env" });

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
// const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: FRONTEND_BASE_URL,
  methods: "GET, POST, PATCH, DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), handleWebhook);
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
app.use("/api/payment", paymentRoute);
app.use("/api/orders", orderRoute);


await connectMongoDB(process.env.MONGO_URI);

export default app;