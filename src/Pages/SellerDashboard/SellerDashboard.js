import React, { useState } from "react";
import { Routes, Route, useNavigate, Link, useLocation } from "react-router-dom";
import { 
  FaThLarge, 
  FaBox, 
  FaClipboardList, 
  FaChartBar, 
  FaUserCog, 
  FaQuestionCircle, 
  FaSignOutAlt,
  FaShoppingCart,
  FaTruck,
  FaChartLine
} from "react-icons/fa";
import "./SellerDashboard.css";

// Sub-pages import karanna
import SellerProducts from "./Products/SellerProducts";
import SellerOrders from "./Orders/SellerOrders";
import SellerAnalytics from "./Analytics/SellerAnalytics";
import ProfileSetting from "./ProfileSetting/ProfileSetting";
import SellerHelp from "./Help/SellerHelp";

// --- Dashboard 1st page eke penuma (Stats & Charts) ---
const DashboardHome = ({ recentOrders }) => (
  <>
    <section className="welcome-banner">
      <h1>Welcome!</h1>
      <p>Here's what's happening with your store today.</p>
    </section>

    <div className="stats-grid">
      <div className="stat-card">
        <p>Total Sales</p>
        <h3>LKR 0.00</h3>
        <span className="trend">No data yet</span>
      </div>
      <div className="stat-card">
        <p>Pending Orders</p>
        <h3>0</h3>
        <span className="trend">No pending orders</span>
      </div>
      <div className="stat-card">
        <p>Active Listings</p>
        <h3>0</h3>
        <span className="trend">No active items</span>
      </div>
      <div className="stat-card">
        <p>Store Visits</p>
        <h3>0</h3>
        <span className="trend">No visits yet</span>
      </div>
    </div>

    <div className="dashboard-main-flex">
      <div className="left-column">
        <h3>Manage your Store</h3>
        <div className="management-grid">
          <div className="manage-card">
            <div className="card-header">
              <div className="icon-box"><FaShoppingCart /></div>
              <h4>Product Management</h4>
            </div>
            <p>Add new items and manage your inventory here.</p>
            <button className="action-btn-outline">Add New Product</button>
          </div>

          <div className="manage-card">
            <div className="card-header">
              <div className="icon-box"><FaTruck /></div>
              <h4>Order Fulfillment</h4>
            </div>
            <p>Track and manage your customer orders.</p>
            <button className="action-btn-outline">Manage Orders</button>
          </div>

          <div className="manage-card">
            <div className="card-header">
              <div className="icon-box"><FaChartLine /></div>
              <h4>Sales & Analytics</h4>
            </div>
            <p>View detailed reports of your shop performance.</p>
            <button className="action-btn-outline">View Sales Report</button>
          </div>
        </div>

        <div className="chart-section">
          <h4>Sales Overview - Last 7 Days</h4>
          <div className="no-data-msg">Weekly sales chart will appear here.</div>
          <div className="bar-chart empty"></div>
        </div>
      </div>

      <div className="right-column">
        <div className="recent-orders-card">
          <h4>Recent Orders</h4>
          <div className="order-list">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <div key={index} className="order-row"></div>
              ))
            ) : (
              <div className="empty-orders">
                <p>No recent orders found.</p>
              </div>
            )}
          </div>
          <button className="view-all-orders-btn" disabled>View All Orders</button>
        </div>
      </div>
    </div>
  </>
);

// --- main DB Component eka ---
const SellerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recentOrders] = useState([]); 

  const handleLogout = () => {
    navigate("/");
  };

  // dn inna page ekata adala sider bar eke link eka active karanna
  const getActiveStatus = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <h2 className="logo">Ceylon Made</h2>
        <div className="profile-section">
          <div className="profile-img-placeholder"></div>
          <div className="profile-info">
            <h3>User Name</h3>
            <p>Seller Account</p>
          </div>
        </div>

        <nav className="menu">
          <Link to="/seller-dashboard" className={`menu-item ${getActiveStatus("/seller-dashboard")}`}>
            <FaThLarge className="icon" /> Dashboard
          </Link>
          <Link to="/seller-dashboard/products" className={`menu-item ${getActiveStatus("/seller-dashboard/products")}`}>
            <FaBox className="icon" /> Products
          </Link>
          <Link to="/seller-dashboard/orders" className={`menu-item ${getActiveStatus("/seller-dashboard/orders")}`}>
            <FaClipboardList className="icon" /> Orders
          </Link>
          <Link to="/seller-dashboard/analytics" className={`menu-item ${getActiveStatus("/seller-dashboard/analytics")}`}>
            <FaChartBar className="icon" /> Analytics
          </Link>
          <Link to="/seller-dashboard/profile" className={`menu-item ${getActiveStatus("/seller-dashboard/profile")}`}>
            <FaUserCog className="icon" /> Profile Settings
          </Link>
          {/* Help Button eka */}
          <Link to="/seller-dashboard/help" className={`menu-item ${getActiveStatus("/seller-dashboard/help")}`}>
            <FaQuestionCircle className="icon" /> Help & Support
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </div>
        </div>
      </aside>

      {/* Main Content Section */}
      <main className="main-content-area">
        <Routes>
          <Route index element={<DashboardHome recentOrders={recentOrders} />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="analytics" element={<SellerAnalytics />} />
          <Route path="profile" element={<ProfileSetting />} />
          <Route path="help" element={<SellerHelp />} />
        </Routes>
      </main>
    </div>
  );
};

export default SellerDashboard;