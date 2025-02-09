import express from "express";

const app = express();

const PORT = 3000;

const msg = "frontend and backend connected !!";

app.get("/landingPage", (req, res) => {
  res.send(msg);
});

app.listen(PORT, () => {
  console.log(`server is live at port ${PORT}`);
});
