import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import {User} from "./models/userModel.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

const msg = "frontend and backend connected !!";

app.get("/landingPage", async (req, res) => {
  const { name, username, password, emailId } = req.body;

  try {
    const users = await User.create({ name, username, password, emailId });
    res.send(200).json(users);
  } catch (error) {
    res.send(400).json(error);
  }
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
