import dotenv from "dotenv";
import Stripe from "stripe";
import { updatePurchasedEventsDB } from "../middleware/updatePurchasedEventsDB.js";
import { updateOrdersDB } from "../middleware/updateOrdersDB.js";

dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey);
const webhookSecret = process.env.WEB_HOOK_SECRET;
const successUrl = process.env.FRONTEND_SUCCESS_URL;
const failedUrl = process.env.FRONTEND_FAILED_URL;

// Stripe Webhook
const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const payload = req.body;

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        const session = event?.data?.object;
        const userId = session.metadata.userId;
        const eventId = session.metadata.eventId;
        const eventHostEmail = session.metadata.eventHostEmail;
        const eventTitle = session.metadata.eventTitle;
        const buyer = session.metadata.buyer;
        const amount = session.amount_total / 100;
        const orderId = session.payment_intent;

        // if (!mongoose.Types.ObjectId.isValid(session?.metadata?.userId)) {
        //   return res.status(400).json({ message: "Invalid User ID format" });
        // }

        updatePurchasedEventsDB(userId, eventId);
        updateOrdersDB(
          orderId,
          eventHostEmail,
          userId,
          eventId,
          eventTitle,
          buyer,
          amount
        );

        break;
      case "checkout.session.async_payment_succeeded":
      case "invoice.paid":
        // Update your database and fulfill the order
        break;
      case "checkout.session.async_payment_failed":
      case "invoice.payment_failed":
        // Update your database and notify customer of failed payment
        break;
    }

    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

// Checkout Session
const handleCheckoutSession = async (req, res) => {
  const eventName = req.body.eventName;
  const eventHostEmail = req.body.eventHostEmail;
  const buyer = req.body.buyer;
  const eventId = req.body.eventId;
  const userId = req.body.userId;
  const eventImage = req.body.eventImage;
  const price = Math.round(req.body.price * 100);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "myr",
          product_data: {
            name: eventName,
            images: [eventImage],
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    cancel_url: failedUrl,
    success_url: successUrl,
    metadata: {
      eventId: eventId,
      userId: userId,
      eventHostEmail: eventHostEmail,
      eventTitle: eventName,
      buyer: buyer,
    },
  });

  res.status(200).json(session.url);
};

export { handleCheckoutSession, handleWebhook };
