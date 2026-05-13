import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  PackageCheck, 
  ShoppingCart, 
  FileText, 
  BarChart3, 
  RefreshCcw, 
  Gavel, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  ShoppingBag,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './AdminDashboard.css';
import adminAvatar from '../../assets/admin_avatar.png';
import vaseImg from '../../assets/vases.png';
import sareeImg from '../../assets/saree.png';
import elephantImg from '../../assets/elephant.png';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'User Management', icon: <Users size={20} /> },
    { name: 'Seller Management', icon: <UserCheck size={20} /> },
    { name: 'Product Approval', icon: <PackageCheck size={20} /> },
    { name: 'Order Monitoring', icon: <ShoppingCart size={20} /> },
    { name: 'Content Management', icon: <FileText size={20} /> },
    { name: 'Sales & Analytics', icon: <BarChart3 size={20} /> },
    { name: 'Refund Workflow', icon: <RefreshCcw size={20} /> },
    { name: 'Dispute Resolution', icon: <Gavel size={20} /> },
    { name: 'System Settings', icon: <Settings size={20} /> },
  ];

  const sellers = [
    { name: 'Ruvini Perera', status: 'Active', sales: 'LKR 2,500', products: 42 },
    { name: 'Nimal Silva', status: 'Pending', sales: 'LKR 0', products: 8 },
    { name: 'Kavya Bandara', status: 'Active', sales: 'LKR 5,120', products: 88 },
    { name: 'Saman Jayawardhane', status: 'Suspend', sales: 'LKR 850', products: 15 },
  ];

  const products = [
    { id: 1, name: 'Hand-painted Ceramic Vars', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Active', img: vaseImg },
    { id: 2, name: 'Bathik Print Silk Saree', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Pending Review', img: sareeImg },
    { id: 3, name: 'Carved Wooden Elephant', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Out of Stock', img: elephantImg },
    { id: 4, name: 'Woven Reed Storage Basket', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Draft', img: vaseImg }, // Reusing vase as placeholder for basket
  ];

  const renderDashboard = () => (
    <>
      {/* Stats Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Sales</div>
          <div className="stat-value">LKR 124,500</div>
          <div className="stat-change positive">+5.2% this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">New Orders</div>
          <div className="stat-value">25</div>
          <div className="stat-change positive">+10%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">New Sellers</div>
          <div className="stat-value">10</div>
          <div className="stat-change positive">+25%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Pending Products</div>
          <div className="stat-value">15</div>
          <div className="stat-change">+15%</div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <h4>Sales Over Time</h4>
              <div className="chart-subtitle">LKR 45,600</div>
              <div className="stat-change positive">this month +5.2%</div>
            </div>
          </div>
          <div className="chart-placeholder">
            <svg className="area-chart-svg" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8D6E63" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8D6E63" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,120 Q50,80 100,100 T200,60 T300,110 T400,90 L400,150 L0,150 Z" fill="url(#gradient)" />
              <path d="M0,120 Q50,80 100,100 T200,60 T300,110 T400,90" fill="none" stroke="#8D6E63" strokeWidth="2" />
              <text x="0" y="145" fontSize="10" fill="#666">Week 1</text>
              <text x="120" y="145" fontSize="10" fill="#666">Week 2</text>
              <text x="240" y="145" fontSize="10" fill="#666">Week 3</text>
              <text x="360" y="145" fontSize="10" fill="#666">Week 4</text>
            </svg>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <h4>Top Categories</h4>
              <div className="chart-subtitle">350 Items</div>
              <div className="stat-change positive">this month +8%</div>
            </div>
          </div>
          <div className="chart-placeholder">
            <div className="bar" style={{ height: '60%' }}><span className="bar-label">Clothing</span></div>
            <div className="bar" style={{ height: '90%' }}><span className="bar-label">Jewelry</span></div>
            <div className="bar" style={{ height: '80%' }}><span className="bar-label">Home</span></div>
            <div className="bar" style={{ height: '30%' }}><span className="bar-label">Art</span></div>
            <div className="bar" style={{ height: '70%' }}><span className="bar-label">Pottery</span></div>
          </div>
        </div>
      </section>

      {/* Seller Management Section */}
      <section className="product-table-card">
        <h3>Seller Management</h3>
        <table>
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Status</th>
              <th>Sales</th>
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={index}>
                <td>{seller.name}</td>
                <td>
                  <span className={`status-badge ${seller.status.toLowerCase()}`}>
                    {seller.status}
                  </span>
                </td>
                <td>{seller.sales}</td>
                <td>{seller.products}</td>
                <td>
                  <div className="action-links">
                    {seller.status === 'Pending' ? (
                      <>
                        <span className="approve-link">Approve</span>
                        <span className="suspend-link">Suspend</span>
                      </>
                    ) : (
                      <span className="edit-link">Edit</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );

  const renderUserManagement = () => (
    <div className="user-management-view">
      <div className="admin-view-header">
        <h2>User Management</h2>
        <button className="add-btn">Add New User</button>
      </div>

      <div className="filters-bar">
        <select className="filter-select">
          <option>All Status</option>
        </select>
        <select className="filter-select">
          <option>All Roles</option>
        </select>
      </div>

      <div className="product-table-card">
        <div className="table-controls">
          <span>Showing 1 - 10 of Products</span>
          <div className="sort-control">
            <span>Sort by:</span>
            <select className="filter-select" style={{ minWidth: 'auto' }}>
              <option>Date Added</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" /></th>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td><input type="checkbox" className="table-checkbox" /></td>
                <td>
                  <div className="product-cell">
                    <img src={product.img} alt={product.name} className="product-img" />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.sku}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-btn"><ChevronLeft size={14} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn"><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">LANKA CRAFT</div>
        
        <div className="admin-profile">
          <img src={adminAvatar} alt="Admin" className="admin-avatar" />
          <div className="admin-info">
            <h3>Ayodya Senavirathne</h3>
            <p>Admin</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div 
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
          
          <div className="nav-item-bottom">
            <div className="nav-item">
              <HelpCircle size={20} />
              <span>Help</span>
            </div>
            <div className="nav-item">
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Header */}
        <header className="admin-header">
          <nav className="header-nav">
            <span>Home</span>
            <span>Shops</span>
            <span>About Us</span>
          </nav>
          <div className="header-actions">
            <div className="action-icon"><Search size={20} /></div>
            <div className="action-icon"><ShoppingBag size={20} /></div>
            <div className="action-icon"><Bell size={20} /></div>
          </div>
        </header>

        {activeTab === 'Dashboard' ? renderDashboard() : renderUserManagement()}
      </main>
    </div>
  );
};

export default AdminDashboard;
