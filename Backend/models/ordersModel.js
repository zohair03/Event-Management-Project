import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    eventHostEmail: {
      type: String,
      required: true,
    },
    buyer_id: {
      type: String,
    },
    event_id: {
      type: String,
    },
    eventTitle: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", OrdersSchema);

export {Orders};