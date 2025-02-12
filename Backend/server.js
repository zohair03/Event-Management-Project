import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config({path: './.env'})

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))

const PORT = process.env.PORT || 3001;

const msg = "frontend and backend connected !!";

app.get("/landingPage", (req, res) => {
  res.send(msg);
});

app.listen(PORT, () => {
  console.log(`server is live at port ${PORT}`);
});
