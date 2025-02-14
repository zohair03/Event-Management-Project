import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import {User} from "./models/userModel.js"
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


app.post("/landingPage", async (req, res) => {
  try {
    await User.create(req.body)
    res.status(200).send(req.body)
    // res.send(req.body);

    // console.log(req.body)
  } catch (err) {
    res.send("failed to send data: ",err);
  }
});

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
