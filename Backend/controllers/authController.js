import express from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ massage: `user ${email} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password try again" });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateToken(payload);
    console.log("token: ", accessToken);

    res.json({ user: payload, accessToken: accessToken });
  } catch (err) {
    console.log("error in login api: ", err);
    res.status(500).json({ err });
  }
}

async function handleSignUp(req, res) {
  try {
    const { name, email, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      userName,
      password: hashedPassword,
      role: "user",
    });
    res.json({ msg: "user created in data !!" });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function handleRefreshToken(req, res) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedData = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SCERECT
    );
    if (!decodedData) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const payload = {
      _id: decodedData._id,
      name: decodedData.name,
      userName: decodedData.userName,
      email: decodedData.email,
      role: decodedData.role,
    };
    const newAccessToken = generateToken(payload);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.log("error from refresh token api:", err);
    res.status(401).json({message:"Token expired"})
  }
}

export { handleLogin, handleSignUp, handleRefreshToken };