import { Orders } from "../models/ordersModel.js";

async function updateOrdersDB(orderID, eventHostEmail, buyerID, eventID, eventTitle, buyer, amount) {

    const order = {
      order_id: orderID,
      eventHostEmail: eventHostEmail,
      buyer_id: buyerID,
      event_id: eventID,
      eventTitle: eventTitle,
      buyer: buyer,
      amount: amount,
    };

    const isUpdatedOrder = await Orders.create(order);
    if (!isUpdatedOrder) {
        return false;
    }

    return isUpdatedOrder;
}

export { updateOrdersDB };