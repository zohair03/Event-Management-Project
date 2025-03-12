import express from "express";

import { jwtAuthMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", jwtAuthMiddleware, (req, res) => {
  res.json({ msg: "authentication successful!!", data: req.user });
});

export default router;