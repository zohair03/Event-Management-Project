import express from 'express';
import {
  handleCheckoutSession,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", handleCheckoutSession);

export default router;