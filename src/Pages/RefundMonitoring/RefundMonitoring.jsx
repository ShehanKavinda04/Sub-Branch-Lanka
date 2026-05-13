import React, { useState, useEffect } from "react";
import "./RefundMonitoring.css";

const RefundMonitoring = () => {
  // Mock data: expiresIn is in seconds (3 days = 259200 seconds)
  const [refundRequests, setRefundRequests] = useState([
    {
      id: "ORD-9921",
      customer: "Nethmi Perera",
      reason: "Damaged Item",
      expiresIn: 259200, 
      status: "Pending",
    },
    {
      id: "ORD-5502",
      customer: "Kavindu Silva",
      reason: "Wrong Color",
      expiresIn: 15, // Test this: will auto-approve in 15 seconds
      status: "Pending",
    },
  ]);

  useEffect(() => {
    // Timer logic to update countdown every second
    const interval = setInterval(() => {
      setRefundRequests((prevRequests) =>
        prevRequests.map((req) => {
          if (req.expiresIn > 0 && req.status === "Pending") {
            return { ...req, expiresIn: req.expiresIn - 1 };
          } else if (req.expiresIn === 0 && req.status === "Pending") {
            return { ...req, status: "Auto-Approved" };
          }
          return req;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Formats seconds into a readable D:H:M:S string
  const formatTimer = (totalSeconds) => {
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  return (
    <div className="monitoring-section fade-in">
      <div className="section-header">
        <h3>Refund Automation</h3>
        <p>If seller doesn't respond within 3 days, refund is automatically approved.</p>
      </div>

      <div className="refund-grid">
        {refundRequests.map((req) => (
          <div key={req.id} className="refund-card">
            <div className="card-top">
              <span className="order-id">{req.id}</span>
            </div>
            <h4 style={{ color: "#5d4037", margin: "10px 0" }}>{req.customer}</h4>
            <p style={{ fontSize: "14px", color: "#8d6e63" }}>Reason: {req.reason}</p>
            
            <div className="timer-wrapper">
              <p className="label">Auto-approval in:</p>
              <div className="countdown-box">
                {req.status === "Pending" ? formatTimer(req.expiresIn) : "COMPLETED"}
              </div>
            </div>

            <div className={`status-banner ${req.status.toLowerCase().replace(" ", "-")}`}>
              {req.status === "Pending" ? "⏳ Awaiting Seller Response" : "✅ Refund Auto-Approved"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefundMonitoring;