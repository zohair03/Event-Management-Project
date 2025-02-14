import express from "express";
import {User} from "../models/userModel.js"

const router = express.Router()


router.post("/signUp", async (req, res) => {
  try {
    await User.create(req.body)
    res.status(200).send(req.body)
  } catch (err) {
    res.send("failed to send data: ",err);
  }
});

router.get("/login",async (req, res) => {
  try {
    const allUsers = await User.find()
    res.status(201).json(allUsers)
  } catch (err) {
    console.log("error in login api: ", err)
    res.status(500).send("failed to get data: ", err);
  }
})

export {router}