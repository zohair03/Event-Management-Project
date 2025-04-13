import express from "express";
import {
  handleLogin,
  handleSignUp,
  handleRefreshToken,
} from "../controllers/authController.js";

const router = express.Router();

// sign up user
router.post("/signup", handleSignUp);

// login user
router.post("/login", handleLogin);

// logout user
router.post("/logout");

// get new access token
router.post("/refresh-token", handleRefreshToken);

export default router;
