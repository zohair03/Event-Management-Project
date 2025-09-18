import React, { useEffect, useState } from "react";
import "./OrdersPage.css";
import { apiPrivate } from "../../api/axios.js";
import useAuth from "../../Hooks/useAuth.jsx";

const OrdersPage = () => {
  const { auth } = useAuth();

  const [orders, setOrders] = useState();

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await apiPrivate.post("/api/orders/all", {
          eventHostEmail: auth.user.email,
        });
        setOrders(response.data.orders);
      } catch (err) {
        console.log("Error in getting order api", err);
      }
    };

    getAllOrders();
  }, []);

  return (
    <div id="ordersPageMainDiv">
      {/* heading section */}
      <section className="headingSection">
        <div>
          <h1>Orders</h1>
        </div>
      </section>

      <section className="ordersection">
        <div>
          <input id="searchOrder" placeholder="Search orders..." />
        </div>
        <div className="ordersContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Event Title</th>
                <th>Buyers</th>
                <th>Created</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length ? (
                orders.map((order, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <td className="ordersID">{order.order_id}</td>
                        <td>{order.eventTitle}</td>
                        <td>{order.buyer}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.amount}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <div className="noOrdersDiv">No Orders yet</div>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
