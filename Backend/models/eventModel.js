import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    host: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    price: {
      type: String,
    },
    free: {
      type: Boolean,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export { Event };
