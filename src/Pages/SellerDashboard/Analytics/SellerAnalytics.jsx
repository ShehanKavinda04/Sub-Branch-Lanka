import React, { useState } from "react";
import "./SellerAnalytics.css";

const SellerAnalytics = () => {
  // dnata thoragana thiyana time eka (State)
  const [activeFilter, setActiveFilter] = useState("7days");

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
    console.log("Filtering started for:", filterType);
    // Database eka haduwama data fetch wenne methana
  };

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <div className="header-text">
          <h2>Analytics & Reports</h2>
          <p>View key business insights for your store.</p>
        </div>
      </header>

      {/* Time Filters */}
      <div className="analytics-time-filters">
        <button 
          className={`time-btn ${activeFilter === "7days" ? "active" : ""}`} 
          onClick={() => handleFilterChange("7days")}
        >
          Last 7 Days
        </button>
        <button 
          className={`time-btn ${activeFilter === "30days" ? "active" : ""}`} 
          onClick={() => handleFilterChange("30days")}
        >
          Last 30 Days
        </button>
        <button 
          className={`time-btn ${activeFilter === "year" ? "active" : ""}`} 
          onClick={() => handleFilterChange("year")}
        >
          This Year
        </button>
        <button 
          className={`time-btn ${activeFilter === "all" ? "active" : ""}`} 
          onClick={() => handleFilterChange("all")}
        >
          All Time
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="analytics-stats-grid">
        <div className="analytics-stat-card">
          <p className="stat-label">Total Revenue</p>
          <h3 className="stat-value">LKR 0.00</h3>
          <span className="stat-trend neutral">+0%</span>
        </div>
        <div className="analytics-stat-card">
          <p className="stat-label">Orders</p>
          <h3 className="stat-value">0</h3>
          <span className="stat-trend neutral">+0%</span>
        </div>
        <div className="analytics-stat-card">
          <p className="stat-label">Store Visits</p>
          <h3 className="stat-value">0</h3>
          <span className="stat-trend neutral">+0%</span>
        </div>
        <div className="analytics-stat-card">
          <p className="stat-label">Avg. order value</p>
          <h3 className="stat-value">0</h3>
          <span className="stat-trend neutral">0%</span>
        </div>
      </div>

      {/* Chart Section Area */}
      <div className="analytics-main-flex">
        <div className="sales-overview-box">
          <div className="box-header">
            <h4>Sales Overview</h4>
            <h3 className="overview-value">LKR 0.00 <span className="trend-up">+0%</span></h3>
            <p className="vs-text">vs. previous period</p>
          </div>
          <div className="chart-area-placeholder">
            {/* activeFilter eka anuwa text eka wenas wenawa */}
            <div className="empty-chart-msg">
                Sales chart for <strong>{activeFilter}</strong> will appear here
            </div>
          </div>
        </div>

        <div className="top-products-box">
          <h4>Top Selling Products</h4>
          <div className="empty-list-msg">No data available for this range</div>
        </div>
      </div>

      {/* Detailed Table Section */}
      <div className="detailed-performance-section">
        <h4>Detailed Product Performance</h4>
        <div className="performance-table-wrapper">
          <table className="performance-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Views</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="empty-table-cell">
                    No product performance data to show for <strong>{activeFilter}</strong>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;