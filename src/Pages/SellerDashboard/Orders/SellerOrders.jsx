import React, { useState } from "react";
import "./SellerOrders.css";

const SellerOrders = () => {
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState([]);

  return (
    <div className="sub-page-container">
      {/* Header with Title and Button in one row */}
      <header className="sub-page-header-row">
        <div className="title-group">
          <h2>Order Management</h2>
          <p>Track and fulfill your customer orders.</p>
        </div>
        <button className="action-btn-sm">+ Manual Order</button>
      </header>

      {/* Filter Section */}
      <div className="filter-bar">
        <select className="filter-select">
          <option value="">Filter by Status</option>
          <option value="pending">Pending Shipment</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input type="text" placeholder="Search order ID or buyer..." className="search-input-sub" />
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Buyer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((o, i) => (
                <tr key={i}>
                  <td>{o.id}</td>
                  <td>{o.date}</td>
                  <td>{o.buyer}</td>
                  <td>{o.total}</td>
                  <td><span className={`status-tag ${o.status}`}>{o.status}</span></td>
                  <td><button className="view-btn">View</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-table-msg">No orders received yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;