import { Orders } from "../models/ordersModel.js";

async function handleGetAllOrders(req, res) {
  try {
    const eventHostEmail = req.body.eventHostEmail;
    if (!eventHostEmail) {
      return res.status(400).json({ massege: "Host Email is undefined" });
    }

    const isOrderAvailable = await Orders.find({
      eventHostEmail: eventHostEmail,
    });
    if (!isOrderAvailable) {
      return res.status(200).json({ massege: "No Orders" });
    }

    res.status(200).json({ orders: isOrderAvailable });
  } catch (err) {
    console.log("Internal Server error in getting all orders", err);
    res
      .status(500)
      .json({ massege: "Internal Server error in getting all orders" });
  }
}



export { handleGetAllOrders };
