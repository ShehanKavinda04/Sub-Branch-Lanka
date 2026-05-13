import React, { useState } from "react";
import "./ProductMonitoring.css";

const ProductMonitoring = () => {
  // Static data for demonstration
  const [products] = useState([
    {
      id: 1,
      name: "Handwoven Batik Saree",
      sellerId: "SLR-1023",
      price: 8500,
      status: "Active",
    },
    {
      id: 2,
      name: "Illegal Substance/Item",
      sellerId: "SLR-2041",
      price: 2200,
      status: "Flagged",
    },
    {
      id: 3,
      name: "Traditional Clay Pot",
      sellerId: "SLR-1129",
      price: 3800,
      status: "Active",
    },
  ]);

  return (
    <div className="monitoring-section fade-in">
      <div className="section-header">
        <h3>Product Security Monitor</h3>
        <p>System automatically scans new listings for compliance.</p>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Seller ID</th>
              <th>Price (LKR)</th>
              <th>System Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ fontWeight: "600" }}>{product.name}</td>
                <td>{product.sellerId}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      product.status === "Active" ? "status-active" : "status-flagged"
                    }`}
                  >
                    {product.status === "Flagged" ? "⚠️ Flagged by AI" : "✅ Approved"}
                  </span>
                </td>
                <td>
                  <button className="btn-view">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductMonitoring;