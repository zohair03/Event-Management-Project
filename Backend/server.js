import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDB } from "./connection.js";
import auth from "./routes/authRoute.js";
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";

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

app.use("/api/auth", auth);
app.use("/api/user",userRoute);
app.use("/api/event", eventRoute);

connectMongoDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`server is live at port ${PORT}`);
});
