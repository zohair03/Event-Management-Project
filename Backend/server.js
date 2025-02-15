import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js"
import eventRoute from "./routes/eventRoute.js"

const app = express();

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/user",userRoute)
app.use("/api/event",eventRoute)



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected & server is live at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });
