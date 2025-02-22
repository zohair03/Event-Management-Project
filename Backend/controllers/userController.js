import express from "express";
import { generateToken } from "../middleware/auth.js";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());

async function handleLoginUsers(req, res) {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email, password: password });
    const token = generateToken(userData);
    res.json({userData}).cookie("uuid",token);
  } catch (err) {
    console.log("error in login api: ", err);
    res.status(400).json({ "failed to get data: ": err });
  }
}

async function handleCreateUsers(req, res) {
  try {
    await User.create(req.body);
    res.json({ msg: "user created in data !!" });
  } catch (err) {
    res.status(400).json({ err });
  }
}

export { handleLoginUsers, handleCreateUsers };
