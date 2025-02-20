import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path:'../.env'})

async function handleGetAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    res.status(201).json(allUsers);
  } catch (err) {
    console.log("error in login api: ", err);
    res.status(500).send("failed to get data: ", err);
  }
}

async function handleCreateUsers(req, res) {
  try {
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SCERECT);
    await User.create(req.body);
    res.send(token);
  } catch (err) {
    res.send("failed to send data: ", err);
  }
}

export { handleGetAllUsers, handleCreateUsers };
