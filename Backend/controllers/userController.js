import { generateToken } from "../middleware/auth.js";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

async function handleLoginUsers(req, res) {
  try {
    const allUsers = await User.find({});
    res.status(201).json(allUsers);
  } catch (err) {
    console.log("error in login api: ", err);
    res.status(400).send("failed to get data: ", err);
  }
}

async function handleCreateUsers(req, res) {
  try {
    const token = generateToken(req.body);
    await User.create(req.body);
    res.json({ key: token, data: req.body });
  } catch (err) {
    res.status(400).json(err);
  }
}

export { handleLoginUsers, handleCreateUsers };
