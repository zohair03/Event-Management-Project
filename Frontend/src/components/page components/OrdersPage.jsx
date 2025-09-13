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
        <div className="ordersDiv">
          <div className="ordersTable">
            <div className="ordersHead">
              <div>Order ID</div>
              <div>Event Title</div>
              <div>Buyers</div>
              <div>Created</div>
              <div>Amount</div>
            </div>
            {orders?.length ? (
              orders.map((order, i) => {
                return (
                  <div className="ordersBody" key={i}>
                    <div>{order.order_id}</div>
                    <div>{order.eventTitle}</div>
                    <div>{order.buyer}</div>
                    <div>{order.createdAt}</div>
                    <div>{order.amount}</div>
                  </div>
                );
              })
            ) : (
              <div className="noOrdersDiv">No Orders yet</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
