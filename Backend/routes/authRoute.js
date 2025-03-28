import express from "express";
import {handleLogin,handleSignUp} from "../controllers/authController.js";


const router = express.Router();

// sign up user
router.post("/signUp", handleSignUp);

// login user
router.post("/login", handleLogin);

export default router;