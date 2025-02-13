import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import {User} from "./models/userModel.js";

dotenv.config({ path: "./.env" });

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))

const PORT = process.env.PORT || 3001;

app.post("/landingPage", async (req, res) => {
  console.log(res.body)
  res.status(200)
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected & server is live at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error: ", error);
  });
