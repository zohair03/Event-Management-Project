import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectMongoDB } from "./connection.js";

// routes
import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";

const app = express();

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);

connectMongoDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`server is live at port ${PORT}`);
});
