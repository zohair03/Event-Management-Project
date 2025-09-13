import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PurchasedEventsSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    purchasedEvents_ids: {
      type: Array,
      required: true,
    }
  },
  { timestamps: true }
);

const PurchasedEvents = mongoose.model(
  "Purchased events",
  PurchasedEventsSchema
);

export {PurchasedEvents};