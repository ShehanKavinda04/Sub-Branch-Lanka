import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './OrderHistory.css';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  // Mock data (Backend එක සම්බන්ධ කළ පසු මෙතැනට fetch කරන්න)
  useEffect(() => {
    const dummyOrders = [
      {
        id: "#CMSL8821",
        date: "2026-03-12",
        total: 5400,
        status: "SHIPPED", // PROCESSING, PACKED, SHIPPED, DELIVERED
        items: [{ name: "Handmade Vase", qty: 1 }, { name: "Beaded Necklace", qty: 2 }]
      }
    ];
    setOrders(dummyOrders);
  }, []);

  const getStatusStep = (status) => {
    const steps = ["PROCESSING", "PACKED", "SHIPPED", "DELIVERED"];
    return steps.indexOf(status);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="order-history-container">
        <h2>My Orders</h2>
        
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <p className="order-id">{order.id}</p>
                <p className="order-date">Placed on: {order.date}</p>
              </div>
              <p className="order-total">LKR {order.total.toLocaleString()}</p>
            </div>

            {/* Tracking Stepper */}
            <div className="stepper-wrapper">
              {["Processing", "Packed", "Shipped", "Delivered"].map((step, index) => (
                <div key={step} className={`step-item ${getStatusStep(order.status) >= index ? "active" : ""}`}>
                  <div className="step-counter">
                    {getStatusStep(order.status) > index ? "✓" : index + 1}
                  </div>
                  <p className="step-name">{step}</p>
                </div>
              ))}
            </div>

            <div className="order-items-summary">
              {order.items.map((item, i) => (
                <span key={i}>{item.name} (x{item.qty}){i < order.items.length - 1 ? ", " : ""}</span>
              ))}
            </div>

            {/* Review Button - Delivered නම් පමණක් පෙන්වයි */}
            {order.status === "DELIVERED" && (
              <button className="btn-review-now">Write a Review</button>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}