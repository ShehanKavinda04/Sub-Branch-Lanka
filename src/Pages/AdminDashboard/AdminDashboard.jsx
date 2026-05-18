import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Eye,
  Send,
  Info,
  ThumbsUp,
  ThumbsDown,
  User,
  Package,
  Store,
  Download,
  FileText as FileIcon,
  Video
} from 'lucide-react';
import './AdminDashboard.css';
import adminAvatar from '../../assets/admin_avatar.png';
import vaseImg from '../../assets/vases.png';
import sareeImg from '../../assets/saree.png';
import elephantImg from '../../assets/elephant.png';
import avatarFemale from '../../assets/avatar_female.png';
import avatarMale2 from '../../assets/avatar_male_2.png';
import bannerSale from '../../assets/banner_sale.png';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [refundSubTab, setRefundSubTab] = useState('New');
  const [refundSearch, setRefundSearch] = useState('');
  const [refundSeller, setRefundSeller] = useState('All Sellers');
  const [analyticsSubTab, setAnalyticsSubTab] = useState('Sales Overview');
  const [timePeriod, setTimePeriod] = useState('Today');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [disputeTab, setDisputeTab] = useState('Summary');

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

  const [stats, setStats] = useState({
    totalSales: 124500,
    newOrders: 25,
    newSellers: 10,
    pendingProducts: 15,
    salesChange: 5.2,
    ordersChange: 10,
    sellersChange: 25,
    productsChange: 15
  });
  const [sellersList, setSellersList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [refundsList, setRefundsList] = useState([]);
  const [disputesList, setDisputesList] = useState([]);
  const [salesOverTime, setSalesOverTime] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Buyer', status: 'Active' });
  const [userStatusFilter, setUserStatusFilter] = useState('All Status');
  const [userRoleFilter, setUserRoleFilter] = useState('All Roles');
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userSortBy, setUserSortBy] = useState('Newest First');
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [sellerCurrentPage, setSellerCurrentPage] = useState(1);
  const [sellerSearch, setSellerSearch] = useState('');
  const [sellerStatusFilter, setSellerStatusFilter] = useState('All Status');

  // Product Approval State
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  const [productSearch, setProductSearch] = useState('');
  const [productStatusFilter, setProductStatusFilter] = useState('All Status');
  const [productSellerFilter, setProductSellerFilter] = useState('All Sellers');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All Categories');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Content Management State
  const [bannersList, setBannersList] = useState([]);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [bannerForm, setBannerForm] = useState({ title: '', img: 'bannerSale', period: '', status: 'Active' });
  const [bannerCurrentPage, setBannerCurrentPage] = useState(1);
  const [bannerSearch, setBannerSearch] = useState('');
  const [bannerStatusFilter, setBannerStatusFilter] = useState('All Status');
  const [selectedBanners, setSelectedBanners] = useState([]);

  // Order Monitoring State
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrderDetailsId, setSelectedOrderDetailsId] = useState(null);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All Status');
  const [orderSellerFilter, setOrderSellerFilter] = useState('All Sellers');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState('All Payment Status');
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({ buyerName: '', sellerName: '', amount: '' });

  const productPerformance = [
    { name: 'Batik Sarees', sold: 350, orders: 120, revenue: 'LKR 42,000', category: 'Apparel' },
    { name: 'Wooden Elephants', sold: 280, orders: 95, revenue: 'LKR 42,000', category: 'Decor' },
    { name: 'Clay Pots', sold: 150, orders: 75, revenue: 'LKR 42,000', category: 'Pottery' },
    { name: 'Handwoven Baskets', sold: 120, orders: 60, revenue: 'LKR 42,000', category: 'Home Goods' },
  ];

  const variations = [
    { name: 'Batik Saree - Blue', sold: '52 units sold', revenue: 'LKR 36,000' },
    { name: 'Wooden Elephant - Large', sold: '45 units sold', revenue: 'LKR 34,500' },
    { name: 'Clay Pot - Painted', sold: '38 units sold', revenue: 'LKR 42,300' },
    { name: 'Batik Saree - Red', sold: '35 units sold', revenue: 'LKR 40,850' },
    { name: 'Wooden Elephant - Small', sold: '30 units sold', revenue: 'LKR 38,450' },
  ];

  const topSellers = [
    { name: 'Silk Waves', revenue: 'LKR 68,500', percent: 90 },
    { name: 'Crafty Hands', revenue: 'LKR 52,000', percent: 75 },
    { name: 'Ceylon Pottery', revenue: 'LKR 46,400', percent: 65 },
    { name: 'Wood Art', revenue: 'LKR 42,550', percent: 55 },
    { name: 'Batik LK', revenue: 'LKR 42,550', percent: 50 },
  ];

  const sellerPerformance = [
    { name: 'Silk Waves', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
    { name: 'Crafty Hands', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
    { name: 'Ceylon Pottery', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
    { name: 'Wood Art', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
  ];

  const isDateInPeriod = (dateString) => {
    if (!dateString) return false;
    const parts = dateString.split('-');
    let date;
    if (parts.length === 3) {
      date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      date = new Date(dateString);
    }
    const now = new Date();

    if (timePeriod === 'Today') {
      return date.toDateString() === now.toDateString();
    } else if (timePeriod === 'Last 7 Days') {
      const diff = (now - date) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 7;
    } else if (timePeriod === 'This Month') {
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    } else if (timePeriod === 'This Year') {
      return date.getFullYear() === now.getFullYear();
    }
    return true;
  };

  const isDateInPreviousPeriod = (dateString) => {
    if (!dateString) return false;
    const parts = dateString.split('-');
    let date;
    if (parts.length === 3) {
      date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      date = new Date(dateString);
    }
    const now = new Date();

    if (timePeriod === 'Today') {
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      return date.toDateString() === yesterday.toDateString();
    } else if (timePeriod === 'Last 7 Days') {
      const diff = (now - date) / (1000 * 60 * 60 * 24);
      return diff > 7 && diff <= 14;
    } else if (timePeriod === 'This Month') {
      let prevMonth = now.getMonth() - 1;
      let prevYear = now.getFullYear();
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear -= 1;
      }
      return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
    } else if (timePeriod === 'This Year') {
      return date.getFullYear() === now.getFullYear() - 1;
    }
    return false;
  };

  const calculateChange = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    const change = ((current - previous) / previous) * 100;
    return parseFloat(change.toFixed(1));
  };

  const renderTrend = (changeValue) => {
    const isPositive = changeValue >= 0;
    const formatted = isPositive ? `+${changeValue}%` : `${changeValue}%`;
    return (
      <div 
        className={`stat-change ${isPositive ? 'positive' : ''}`} 
        style={!isPositive ? { color: '#F44336' } : {}}
      >
        {formatted}
      </div>
    );
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:8082/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrdersList(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsR, sellersR, productsR, ordersR, refundsR, disputesR, salesR, categoriesR, usersR, bannersR] = await Promise.all([
          fetch('http://localhost:8082/api/admin/stats').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/sellers').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/products').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/orders').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/refunds').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/disputes').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/sales-over-time').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/top-categories').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/users').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/banners').then(res => res.json())
        ]);
        
        setStats(statsR);
        setSellersList(sellersR);
        setProductsList(productsR);
        setOrdersList(ordersR);
        setRefundsList(refundsR);
        setDisputesList(disputesR);
        setSalesOverTime(salesR);
        setTopCategories(categoriesR);
        setUsersList(usersR);
        setBannersList(bannersR);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds for faster updates
    return () => clearInterval(interval);
  }, []);

  const updateSellerStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:8082/api/admin/sellers/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus)
      });
      // Immediate local refresh for "Real-time" feel
      const statsRes = await fetch('http://localhost:8082/api/admin/stats');
      const sellersRes = await fetch('http://localhost:8082/api/admin/sellers');
      setStats(await statsRes.json());
      setSellersList(await sellersRes.json());
    } catch (error) {
      console.error('Error updating seller status:', error);
    }
  };

  const updateProductStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:8082/api/admin/products/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus)
      });
      // Immediate local refresh
      const statsRes = await fetch('http://localhost:8082/api/admin/stats');
      const productsRes = await fetch('http://localhost:8082/api/admin/products');
      const topCategoriesRes = await fetch('http://localhost:8082/api/admin/top-categories');
      setStats(await statsRes.json());
      setProductsList(await productsRes.json());
      setTopCategories(await topCategoriesRes.json());
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        const addedUser = await response.json();
        setUsersList([...usersList, addedUser]);
        setIsUserModalOpen(false);
        setNewUser({ name: '', email: '', role: 'Buyer', status: 'Active' });
        // Real-time update feel: refetch stats as well if needed
        const statsRes = await fetch('http://localhost:8082/api/admin/stats');
        setStats(await statsRes.json());
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const formatCurrency = (value) => {
    return `LKR ${value?.toLocaleString()}`;
  };

  const renderDashboard = () => (
    <>
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-title">Total Sales</div><div className="stat-value">{formatCurrency(stats.totalSales)}</div><div className="stat-change positive">+{stats.salesChange}% this month</div></div>
        <div className="stat-card"><div className="stat-title">New Orders</div><div className="stat-value">{stats.newOrders}</div><div className="stat-change positive">+{stats.ordersChange}%</div></div>
        <div className="stat-card"><div className="stat-title">New Sellers</div><div className="stat-value">{stats.newSellers}</div><div className="stat-change positive">+{stats.sellersChange}%</div></div>
        <div className="stat-card"><div className="stat-title">Pending Products</div><div className="stat-value">{stats.pendingProducts}</div><div className="stat-change">+{stats.productsChange}%</div></div>
      </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title"><h4>Sales Over Time</h4><div className="chart-subtitle">{formatCurrency(stats.totalSales)}</div><div className="stat-change positive">this month +{stats.salesChange}%</div></div></div>
          <div className="chart-placeholder">
            <svg className="area-chart-svg" viewBox="0 0 400 150">
              <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#8D6E63" stopOpacity="0.5" /><stop offset="100%" stopColor="#8D6E63" stopOpacity="0" /></linearGradient></defs>
              <path 
                d={`M0,120 ${salesOverTime.map((d, i) => `L${(i * 400) / (salesOverTime.length - 1 || 1)},${120 - (d.value / 1000)}`).join(' ')} L400,150 L0,150 Z`} 
                fill="url(#gradient)" 
              />
              <path 
                d={`M0,120 ${salesOverTime.map((d, i) => `L${(i * 400) / (salesOverTime.length - 1 || 1)},${120 - (d.value / 1000)}`).join(' ')}`} 
                fill="none" stroke="#8D6E63" strokeWidth="2" 
              />
              {salesOverTime.map((d, i) => (
                <text key={i} x={(i * 400) / (salesOverTime.length - 1 || 1)} y="145" fontSize="8" fill="#666" textAnchor="middle">
                  {d.label.split('-').slice(1).join('/')}
                </text>
              ))}
            </svg>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title"><h4>Top Categories</h4><div className="chart-subtitle">{topCategories.reduce((sum, cat) => sum + cat.value, 0)} Items</div><div className="stat-change positive">this month +{stats.productsChange || 8}%</div></div></div>
          <div className="chart-placeholder">
            {topCategories.length > 0 ? (
              topCategories.map((cat, i) => (
                <div key={i} className="bar" style={{ height: `${(cat.value / Math.max(...topCategories.map(c => c.value), 1)) * 90}%` }} title={`${cat.value} items`}>
                  <span className="bar-label">{cat.label}</span>
                </div>
              ))
            ) : (
              <div style={{ width: '100%', textAlign: 'center', color: '#999', fontSize: '12px', paddingBottom: '20px' }}>No categories data</div>
            )}
          </div>
        </div>
      </section>
      <section className="product-table-card">
        <h3>Seller Management</h3>
        <table>
          <thead><tr><th>Seller Name</th><th>Status</th><th>Sales</th><th>Products</th><th>Action</th></tr></thead>
          <tbody>
            {sellersList.slice(0, 4).map((seller, index) => (
              <tr key={index}>
                <td>{seller.name}</td>
                <td><span className={`status-badge ${seller.status.toLowerCase()}`}>{seller.status}</span></td>
                <td>{formatCurrency(seller.totalSales)}</td>
                <td>{seller.productsCount}</td>
                <td>
                  <div className="action-links">
                    {seller.status === 'Pending' ? (
                      <>
                        <span className="approve-link" onClick={() => updateSellerStatus(seller.id, 'Active')}>Approve</span>
                        <span className="suspend-link" onClick={() => updateSellerStatus(seller.id, 'Suspend')}>Suspend</span>
                      </>
                    ) : (
                      <span className="edit-link" onClick={() => updateSellerStatus(seller.id, seller.status === 'Active' ? 'Suspend' : 'Active')}>
                        {seller.status === 'Active' ? 'Suspend' : 'Activate'}
                      </span>
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

  const renderUserManagement = () => {
    const filteredUsers = usersList.filter(user => {
      const statusMatch = userStatusFilter === 'All Status' || user.status === userStatusFilter;
      const roleMatch = userRoleFilter === 'All Roles' || user.role === userRoleFilter;
      return statusMatch && roleMatch;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (userSortBy === 'Name A-Z') return a.name.localeCompare(b.name);
      if (userSortBy === 'Name Z-A') return b.name.localeCompare(a.name);
      if (userSortBy === 'Newest First') return new Date(b.registrationDate) - new Date(a.registrationDate);
      if (userSortBy === 'Oldest First') return new Date(a.registrationDate) - new Date(b.registrationDate);
      return 0;
    });

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const startIndex = (userCurrentPage - 1) * itemsPerPage;
    const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

    const toggleSelectAll = () => {
      if (selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0) {
        setSelectedUsers([]);
      } else {
        setSelectedUsers(paginatedUsers.map(u => u.id));
      }
    };

    const toggleSelectUser = (id) => {
      if (selectedUsers.includes(id)) {
        setSelectedUsers(selectedUsers.filter(userId => userId !== id));
      } else {
        setSelectedUsers([...selectedUsers, id]);
      }
    };

    return (
      <div className="user-management-view">
        <div className="admin-view-header">
          <h2>User Management</h2>
          <button className="add-btn" onClick={() => setIsUserModalOpen(true)}>Add New User</button>
        </div>
        <div className="filters-bar">
          <select 
            className="filter-select" 
            value={userStatusFilter} 
            onChange={(e) => { setUserStatusFilter(e.target.value); setUserCurrentPage(1); setSelectedUsers([]); }}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select 
            className="filter-select" 
            value={userRoleFilter} 
            onChange={(e) => { setUserRoleFilter(e.target.value); setUserCurrentPage(1); setSelectedUsers([]); }}
          >
            <option>All Roles</option>
            <option>Buyer</option>
            <option>Seller</option>
          </select>
        </div>
        <div className="product-table-card">
          <div className="table-controls">
            <span>Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length} Users</span>
            <div className="sort-control">
              <span>Sort by:</span>
              <select 
                className="filter-select" 
                style={{ minWidth: 'auto' }}
                value={userSortBy}
                onChange={(e) => setUserSortBy(e.target.value)}
              >
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Name A-Z</option>
                <option>Name Z-A</option>
              </select>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    className="table-checkbox" 
                    onChange={toggleSelectAll}
                    checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                  />
                </th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Reg. Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className={selectedUsers.includes(user.id) ? 'selected-row' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      className="table-checkbox" 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                    />
                  </td>
                  <td>
                    <div className="product-cell">
                      <img src={avatarMale2} alt={user.name} className="product-img" />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.registrationDate}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button 
              className="page-btn" 
              onClick={() => setUserCurrentPage(Math.max(1, userCurrentPage - 1))}
              disabled={userCurrentPage === 1}
            >
              <ChevronLeft size={14} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                className={`page-btn ${userCurrentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setUserCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="page-btn" 
              onClick={() => setUserCurrentPage(Math.min(totalPages, userCurrentPage + 1))}
              disabled={userCurrentPage === totalPages || totalPages === 0}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {isUserModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add New User</h3>
              <form onSubmit={handleAddUser}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={newUser.name} 
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={newUser.email} 
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select 
                    value={newUser.role} 
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setIsUserModalOpen(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">Add User</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSellerManagement = () => {
    const filteredSellers = sellersList.filter(seller => {
      const matchesSearch = seller.name.toLowerCase().includes(sellerSearch.toLowerCase());
      const matchesStatus = sellerStatusFilter === 'All Status' || seller.status === sellerStatusFilter;
      return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredSellers.length / itemsPerPage);
    const startIndex = (sellerCurrentPage - 1) * itemsPerPage;
    const paginatedSellers = filteredSellers.slice(startIndex, startIndex + itemsPerPage);

    const toggleSelectAllSellers = () => {
      if (selectedSellers.length === paginatedSellers.length && paginatedSellers.length > 0) {
        setSelectedSellers([]);
      } else {
        setSelectedSellers(paginatedSellers.map(s => s.id));
      }
    };

    const toggleSelectSeller = (id) => {
      if (selectedSellers.includes(id)) {
        setSelectedSellers(selectedSellers.filter(sellerId => sellerId !== id));
      } else {
        setSelectedSellers([...selectedSellers, id]);
      }
    };

    return (
      <div className="seller-management-view">
        <div className="admin-view-header"><h2>Seller Management</h2></div>
        <div className="filters-bar" style={{ justifyContent: 'space-between' }}>
          <div className="search-bar-container">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Seller, Store...." 
              value={sellerSearch}
              onChange={e => { setSellerSearch(e.target.value); setSellerCurrentPage(1); }}
            />
          </div>
          <select 
            className="filter-select"
            value={sellerStatusFilter}
            onChange={e => { setSellerStatusFilter(e.target.value); setSellerCurrentPage(1); }}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspend</option>
          </select>
        </div>
        <div className="product-table-card">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    className="table-checkbox" 
                    onChange={toggleSelectAllSellers}
                    checked={paginatedSellers.length > 0 && selectedSellers.length === paginatedSellers.length}
                  />
                </th>
                <th>Seller/ Store Name</th>
                <th>Date Registered</th>
                <th>Total Sales</th>
                <th>Products</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSellers.map((seller, index) => (
                <tr key={index} className={selectedSellers.includes(seller.id) ? 'selected-row' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      className="table-checkbox" 
                      checked={selectedSellers.includes(seller.id)}
                      onChange={() => toggleSelectSeller(seller.id)}
                    />
                  </td>
                  <td>
                    <div className="seller-cell">
                      <img src={seller.imageUrl || adminAvatar} alt={seller.name} className="seller-img" />
                      <span>{seller.name}</span>
                    </div>
                  </td>
                  <td>{seller.registrationDate}</td>
                  <td>{formatCurrency(seller.totalSales)}</td>
                  <td>{seller.productsCount}</td>
                  <td>
                    <span className={`status-badge ${seller.status.toLowerCase()}`}>
                      {seller.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-links">
                      {seller.status === 'Pending' ? (
                        <>
                          <span className="approve-link" onClick={() => updateSellerStatus(seller.id, 'Active')}>Approve</span>
                          <span className="suspend-link" onClick={() => updateSellerStatus(seller.id, 'Suspend')}>Suspend</span>
                        </>
                      ) : (
                        <span className="edit-link" onClick={() => updateSellerStatus(seller.id, seller.status === 'Active' ? 'Suspend' : 'Active')}>
                          {seller.status === 'Active' ? 'Suspend' : 'Activate'}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button 
              className="page-btn" 
              onClick={() => setSellerCurrentPage(Math.max(1, sellerCurrentPage - 1))}
              disabled={sellerCurrentPage === 1}
            >
              <ChevronLeft size={14} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                className={`page-btn ${sellerCurrentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setSellerCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="page-btn" 
              onClick={() => setSellerCurrentPage(Math.min(totalPages, sellerCurrentPage + 1))}
              disabled={sellerCurrentPage === totalPages || totalPages === 0}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderProductApproval = () => {
    const uniqueSellers = ['All Sellers', ...new Set(productsList.map(p => p.sellerName))];
    const uniqueCategories = ['All Categories', ...new Set(productsList.map(p => p.category))];

    const filteredProducts = productsList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                            product.sellerName.toLowerCase().includes(productSearch.toLowerCase()) || 
                            product.category.toLowerCase().includes(productSearch.toLowerCase());
      const matchesStatus = productStatusFilter === 'All Status' ? true : product.status === productStatusFilter;
      const matchesSeller = productSellerFilter === 'All Sellers' ? true : product.sellerName === productSellerFilter;
      const matchesCategory = productCategoryFilter === 'All Categories' ? true : product.category === productCategoryFilter;
      return matchesSearch && matchesStatus && matchesSeller && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (productCurrentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const toggleSelectAllProducts = () => {
      if (selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0) {
        setSelectedProducts([]);
      } else {
        setSelectedProducts(paginatedProducts.map(p => p.id));
      }
    };

    const toggleSelectProduct = (id) => {
      if (selectedProducts.includes(id)) {
        setSelectedProducts(selectedProducts.filter(productId => productId !== id));
      } else {
        setSelectedProducts([...selectedProducts, id]);
      }
    };

    return (
      <div className="product-approval-view">
        <div className="admin-view-header"><h2>Product Approval Queue</h2></div>
        <div className="filters-bar" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginBottom: '15px' }}>
            <select className="filter-select" value={productStatusFilter} onChange={e => { setProductStatusFilter(e.target.value); setProductCurrentPage(1); }}>
              <option value="All Status">All Status</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Active">Active</option>
              <option value="Rejected">Rejected</option>
              <option value="Edit Requested">Edit Requested</option>
            </select>
            <select className="filter-select" value={productSellerFilter} onChange={e => { setProductSellerFilter(e.target.value); setProductCurrentPage(1); }}>
              {uniqueSellers.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
            <select className="filter-select" value={productCategoryFilter} onChange={e => { setProductCategoryFilter(e.target.value); setProductCurrentPage(1); }}>
              {uniqueCategories.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="search-bar-container" style={{ maxWidth: 'none' }}>
            <Search size={18} />
            <input type="text" placeholder="Seller, Store, Categories...." value={productSearch} onChange={e => { setProductSearch(e.target.value); setProductCurrentPage(1); }} />
          </div>
        </div>
        <div className="product-table-card" style={{ marginTop: '20px' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input type="checkbox" className="table-checkbox" onChange={toggleSelectAllProducts} checked={paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length} />
                </th>
                <th>Product</th>
                <th>Seller</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className={selectedProducts.includes(product.id) ? 'selected-row' : ''}>
                  <td><input type="checkbox" className="table-checkbox" checked={selectedProducts.includes(product.id)} onChange={() => toggleSelectProduct(product.id)} /></td>
                  <td>
                    <div className="product-cell">
                      <img src={product.imageUrl || vaseImg} alt={product.name} className="product-img" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.sellerName}</td>
                  <td>{product.submissionDate}</td>
                  <td><span className={`status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>{product.status}</span></td>
                  <td>
                    <div className="action-btn-group">
                      {(product.status === 'Pending Review' || product.status === 'Edit Requested') && (
                        <>
                          <button className="action-btn approve" onClick={() => updateProductStatus(product.id, 'Active')}>Approve</button>
                          <button className="action-btn reject" onClick={() => updateProductStatus(product.id, 'Rejected')}>Reject</button>
                        </>
                      )}
                      {product.status === 'Active' && (
                        <button className="action-btn reject" onClick={() => updateProductStatus(product.id, 'Rejected')}>Reject</button>
                      )}
                      {product.status === 'Rejected' && (
                        <button className="action-btn approve" onClick={() => updateProductStatus(product.id, 'Active')}>Approve</button>
                      )}
                      {product.status !== 'Edit Requested' && product.status !== 'Rejected' && (
                        <button className="action-btn request-edit" onClick={() => updateProductStatus(product.id, 'Edit Requested')}>Request Edit</button>
                      )}
                      <button className="action-btn view-details" onClick={() => setSelectedProductId(product.id)}>View Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button className="page-btn" onClick={() => setProductCurrentPage(Math.max(1, productCurrentPage - 1))} disabled={productCurrentPage === 1}><ChevronLeft size={14} /></button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} className={`page-btn ${productCurrentPage === i + 1 ? 'active' : ''}`} onClick={() => setProductCurrentPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn" onClick={() => setProductCurrentPage(Math.min(totalPages, productCurrentPage + 1))} disabled={productCurrentPage === totalPages || totalPages === 0}><ChevronRight size={14} /></button>
          </div>
        </div>

        {/* Product Details Modal */}
        {selectedProductId && productsList.find(p => p.id === selectedProductId) && (
          <div className="product-details-modal-overlay" onClick={() => setSelectedProductId(null)}>
            <div className="product-details-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Product Details</h3>
                <button className="close-btn" onClick={() => setSelectedProductId(null)}>&times;</button>
              </div>
              <div className="modal-body">
                {(() => {
                  const p = productsList.find(p => p.id === selectedProductId);
                  return (
                    <>
                      <div className="detail-row"><strong>ID:</strong> {p.id}</div>
                      <div className="detail-row"><strong>Name:</strong> {p.name}</div>
                      <div className="detail-row"><strong>SKU:</strong> {p.sku}</div>
                      <div className="detail-row"><strong>Price:</strong> LKR {p.price.toLocaleString()}</div>
                      <div className="detail-row"><strong>Stock:</strong> {p.stock} units</div>
                      <div className="detail-row"><strong>Status:</strong> {p.status}</div>
                      <div className="detail-row"><strong>Seller:</strong> {p.sellerName}</div>
                      <div className="detail-row"><strong>Category:</strong> {p.category}</div>
                      <div className="detail-row"><strong>Submission Date:</strong> {p.submissionDate}</div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOrderMonitoring = () => {
    // Extract unique sellers for the dropdown
    const orderSellers = ['All Sellers', ...new Set(ordersList.map(o => o.sellerName))];

    // Apply Filters
    const filteredOrders = ordersList.filter(order => {
      const matchesSearch = (order.orderNumber?.toLowerCase() || '').includes(orderSearch.toLowerCase()) || 
                            (order.buyerName?.toLowerCase() || '').includes(orderSearch.toLowerCase()) ||
                            (order.date?.toLowerCase() || '').includes(orderSearch.toLowerCase());
      
      const matchesStatus = orderStatusFilter === 'All Status' || order.orderStatus === orderStatusFilter;
      const matchesSeller = orderSellerFilter === 'All Sellers' || order.sellerName === orderSellerFilter;
      const matchesPayment = orderPaymentFilter === 'All Payment Status' || order.paymentStatus === orderPaymentFilter;
      
      return matchesSearch && matchesStatus && matchesSeller && matchesPayment;
    });

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (orderCurrentPage - 1) * itemsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    const toggleSelectAllOrders = () => {
      if (selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0) {
        setSelectedOrders([]);
      } else {
        setSelectedOrders(paginatedOrders.map(o => o.id || o.orderNumber));
      }
    };

    const toggleSelectOrder = (id) => {
      if (selectedOrders.includes(id)) {
        setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
      } else {
        setSelectedOrders([...selectedOrders, id]);
      }
    };

    return (
      <div className="order-monitoring-view">
        <div className="admin-view-header"><h2>Order Monitoring</h2><button className="add-btn" onClick={() => setIsNewOrderModalOpen(true)}>+ New Order</button></div>
        <div className="filters-bar" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginBottom: '15px' }}>
            <select className="filter-select" value={orderStatusFilter} onChange={(e) => { setOrderStatusFilter(e.target.value); setOrderCurrentPage(1); }}>
              <option value="All Status">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select className="filter-select" value={orderSellerFilter} onChange={(e) => { setOrderSellerFilter(e.target.value); setOrderCurrentPage(1); }}>
              {orderSellers.map(seller => <option key={seller} value={seller}>{seller}</option>)}
            </select>
            <select className="filter-select" value={orderPaymentFilter} onChange={(e) => { setOrderPaymentFilter(e.target.value); setOrderCurrentPage(1); }}>
              <option value="All Payment Status">All Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
          <div className="search-bar-container" style={{ maxWidth: 'none' }}>
            <Search size={18} />
            <input type="text" placeholder="Search by Date, Order ID, Buyer or Product......" value={orderSearch} onChange={(e) => { setOrderSearch(e.target.value); setOrderCurrentPage(1); }} />
          </div>
        </div>
        <div className="product-table-card" style={{ marginTop: '20px' }}>
          <table>
            <thead><tr><th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" checked={paginatedOrders.length > 0 && selectedOrders.length === paginatedOrders.length} onChange={toggleSelectAllOrders} /></th><th>Order ID</th><th>Date</th><th>Buyer</th><th>Seller</th><th>Amount</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {paginatedOrders.map((order, index) => {
                const orderId = order.id || order.orderNumber;
                return (
                  <tr key={orderId} className={selectedOrders.includes(orderId) ? 'selected-row' : ''}><td><input type="checkbox" className="table-checkbox" checked={selectedOrders.includes(orderId)} onChange={() => toggleSelectOrder(orderId)} /></td><td>{order.orderNumber}</td><td>{order.date}</td><td>{order.buyerName}</td><td>{order.sellerName}</td><td>{formatCurrency(order.amount)}</td><td><span className={`status-badge ${order.paymentStatus.toLowerCase()}`}>{order.paymentStatus}</span></td><td><span className={`status-badge ${order.orderStatus.toLowerCase().replace(' ', '-')}`}>{order.orderStatus}</span></td><td><button className="action-view-btn" onClick={() => setSelectedOrderDetailsId(orderId)}><Eye size={18} /></button></td></tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button className="page-btn" onClick={() => setOrderCurrentPage(Math.max(1, orderCurrentPage - 1))} disabled={orderCurrentPage === 1}><ChevronLeft size={14} /></button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} className={`page-btn ${orderCurrentPage === i + 1 ? 'active' : ''}`} onClick={() => setOrderCurrentPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn" onClick={() => setOrderCurrentPage(Math.min(totalPages, orderCurrentPage + 1))} disabled={orderCurrentPage === totalPages || totalPages === 0}><ChevronRight size={14} /></button>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrderDetailsId && ordersList.find(o => (o.id || o.orderNumber) === selectedOrderDetailsId) && (
          <div className="product-details-modal-overlay" onClick={() => setSelectedOrderDetailsId(null)}>
            <div className="product-details-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Order Details</h3>
                <button className="close-btn" onClick={() => setSelectedOrderDetailsId(null)}>&times;</button>
              </div>
              <div className="modal-body">
                {(() => {
                  const o = ordersList.find(o => (o.id || o.orderNumber) === selectedOrderDetailsId);
                  return (
                    <>
                      <div className="detail-row"><strong>Order ID:</strong> {o.orderNumber}</div>
                      <div className="detail-row"><strong>Date:</strong> {o.date}</div>
                      <div className="detail-row"><strong>Buyer Name:</strong> {o.buyerName}</div>
                      <div className="detail-row"><strong>Seller Name:</strong> {o.sellerName}</div>
                      <div className="detail-row"><strong>Amount:</strong> {formatCurrency(o.amount)}</div>
                      <div className="detail-row"><strong>Payment Status:</strong> {o.paymentStatus}</div>
                      <div className="detail-row"><strong>Order Status:</strong> {o.orderStatus}</div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* New Order Modal */}
        {isNewOrderModalOpen && (
          <div className="product-details-modal-overlay" onClick={() => setIsNewOrderModalOpen(false)}>
            <div className="product-details-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create New Order</h3>
                <button className="close-btn" onClick={() => setIsNewOrderModalOpen(false)}>&times;</button>
              </div>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Buyer Name</label>
                  <input type="text" className="filter-select" style={{ width: '100%', maxWidth: 'none' }} value={newOrderForm.buyerName} onChange={e => setNewOrderForm({...newOrderForm, buyerName: e.target.value})} placeholder="Enter buyer name" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Seller</label>
                  <select className="filter-select" style={{ width: '100%', maxWidth: 'none' }} value={newOrderForm.sellerName} onChange={e => setNewOrderForm({...newOrderForm, sellerName: e.target.value})}>
                    <option value="">Select a Seller</option>
                    {orderSellers.filter(s => s !== 'All Sellers').map(seller => <option key={seller} value={seller}>{seller}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Amount (LKR)</label>
                  <input type="number" className="filter-select" style={{ width: '100%', maxWidth: 'none' }} value={newOrderForm.amount} onChange={e => setNewOrderForm({...newOrderForm, amount: e.target.value})} placeholder="0.00" />
                </div>
                <button className="add-btn" style={{ alignSelf: 'flex-end', marginTop: '10px' }} onClick={async () => {
                  if (!newOrderForm.buyerName || !newOrderForm.sellerName || !newOrderForm.amount) {
                    alert("Please fill out all fields.");
                    return;
                  }
                  try {
                    const res = await fetch('http://localhost:8082/api/admin/orders', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        buyerName: newOrderForm.buyerName,
                        sellerName: newOrderForm.sellerName,
                        amount: parseFloat(newOrderForm.amount)
                      })
                    });
                    if (res.ok) {
                      setIsNewOrderModalOpen(false);
                      setNewOrderForm({ buyerName: '', sellerName: '', amount: '' });
                      fetchOrders(); // Refresh table
                    } else {
                      alert("Failed to create order.");
                    }
                  } catch (e) {
                    alert("Error: " + e.message);
                  }
                }}>Submit Order</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getBannerImg = (imgName) => {
    if (imgName === 'sareeImg') return sareeImg;
    if (imgName === 'vaseImg') return vaseImg;
    if (imgName === 'elephantImg') return elephantImg;
    return bannerSale;
  };

  const fetchBanners = async () => {
    try {
      const res = await fetch('http://localhost:8082/api/admin/banners');
      if (res.ok) setBannersList(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleDeleteBanner = async (id) => {
    if(window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await fetch(`http://localhost:8082/api/admin/banners/${id}`, { method: 'DELETE' });
        fetchBanners();
      } catch (e) { console.error(e); }
    }
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentBanner ? 'PUT' : 'POST';
      const url = currentBanner ? `http://localhost:8082/api/admin/banners/${currentBanner.id}` : 'http://localhost:8082/api/admin/banners';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerForm)
      });
      if (res.ok) {
        setIsBannerModalOpen(false);
        setCurrentBanner(null);
        setBannerForm({ title: '', img: 'bannerSale', period: '', status: 'Active' });
        fetchBanners();
      }
    } catch (e) { console.error(e); }
  };

  const openEditBanner = (banner) => {
    setCurrentBanner(banner);
    setBannerForm(banner);
    setIsBannerModalOpen(true);
  };

  const openAddBanner = () => {
    setCurrentBanner(null);
    setBannerForm({ title: '', img: 'bannerSale', period: '', status: 'Active' });
    setIsBannerModalOpen(true);
  };

  const renderContentManagement = () => {
    // Filter and Search Logic
    const filteredBanners = bannersList.filter(banner => {
      const matchesSearch = banner.title.toLowerCase().includes(bannerSearch.toLowerCase());
      const matchesStatus = bannerStatusFilter === 'All Status' || banner.status === bannerStatusFilter;
      return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
    const startIndex = (bannerCurrentPage - 1) * itemsPerPage;
    const currentBanners = filteredBanners.slice(startIndex, startIndex + itemsPerPage);

    const handleSelectAllBanners = (e) => {
      if (e.target.checked) {
        setSelectedBanners(currentBanners.map(banner => banner.id));
      } else {
        setSelectedBanners([]);
      }
    };

    const handleSelectBanner = (id) => {
      setSelectedBanners(prev => 
        prev.includes(id) ? prev.filter(bannerId => bannerId !== id) : [...prev, id]
      );
    };

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setBannerCurrentPage(newPage);
        setSelectedBanners([]); // Clear selections on page change
      }
    };

    return (
      <div className="content-management-view">
        <div className="admin-view-header"><h2>Content Management</h2><button className="add-btn" onClick={openAddBanner}>+ New Banner</button></div>
        <div className="filters-bar" style={{ justifyContent: 'space-between' }}>
          <div className="search-bar-container">
            <Search size={18} />
            <input type="text" placeholder="Search for Banners......" value={bannerSearch} onChange={(e) => { setBannerSearch(e.target.value); setBannerCurrentPage(1); }} />
          </div>
          <select className="filter-select" value={bannerStatusFilter} onChange={(e) => { setBannerStatusFilter(e.target.value); setBannerCurrentPage(1); }}>
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="product-table-card">
          <table>
            <thead><tr><th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" checked={currentBanners.length > 0 && selectedBanners.length === currentBanners.length} onChange={handleSelectAllBanners} /></th><th>Banner Title</th><th>Image Preview</th><th>Display Period</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {currentBanners.length > 0 ? currentBanners.map((banner, index) => (<tr key={index}><td><input type="checkbox" className="table-checkbox" checked={selectedBanners.includes(banner.id)} onChange={() => handleSelectBanner(banner.id)} /></td><td>{banner.title}</td><td><img src={getBannerImg(banner.img)} alt="Preview" className="banner-preview-img" style={{height: '40px', objectFit: 'cover', borderRadius: '4px'}} /></td><td>{banner.period}</td><td><span className={`status-badge ${banner.status.toLowerCase()}`}>{banner.status}</span></td><td><div className="action-links"><span className="edit-link" onClick={() => openEditBanner(banner)}>Edit</span><span className="delete-link" onClick={() => handleDeleteBanner(banner.id)}>Delete</span></div></td></tr>)) : <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No banners found</td></tr>}
            </tbody>
          </table>
          
          {totalPages > 0 && (
            <div className="pagination">
              <button className="page-btn" onClick={() => handlePageChange(bannerCurrentPage - 1)} disabled={bannerCurrentPage === 1}><ChevronLeft size={14} /></button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} className={`page-btn ${bannerCurrentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              ))}
              <button className="page-btn" onClick={() => handlePageChange(bannerCurrentPage + 1)} disabled={bannerCurrentPage === totalPages}><ChevronRight size={14} /></button>
            </div>
          )}
        </div>

        {isBannerModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{currentBanner ? 'Edit Banner' : 'Add New Banner'}</h3>
              <form onSubmit={handleBannerSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" required value={bannerForm.title} onChange={(e) => setBannerForm({...bannerForm, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Image Source</label>
                  <select value={bannerForm.img} onChange={(e) => setBannerForm({...bannerForm, img: e.target.value})}>
                    <option value="bannerSale">bannerSale.png</option>
                    <option value="sareeImg">saree.png</option>
                    <option value="vaseImg">vases.png</option>
                    <option value="elephantImg">elephant.png</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Display Period</label>
                  <input type="text" required placeholder="e.g. Jun 1 - Jun 30" value={bannerForm.period} onChange={(e) => setBannerForm({...bannerForm, period: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={bannerForm.status} onChange={(e) => setBannerForm({...bannerForm, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setIsBannerModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary-blue">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };


  const getProductForOrder = (order) => {
    const dbProduct = productsList.find(p => p.sellerName === order.sellerName);
    if (dbProduct) {
      return { name: dbProduct.name, category: dbProduct.category };
    }
    if (order.sellerName === 'Silk Waves') {
      return { name: 'Batik Print Silk Saree', category: 'Clothing' };
    } else if (order.sellerName === 'Wood Art') {
      return { name: 'Carved Wooden Elephant', category: 'Art' };
    } else if (order.sellerName === 'Crafty Hand' || order.sellerName === 'Crafty Hands' || order.sellerName === 'Artisan Craft') {
      return { name: 'Hand-painted Ceramic Vase', category: 'Pottery' };
    } else {
      return { name: 'Handwoven Reed Basket', category: 'Home' };
    }
  };

  const calculateSalesOverview = () => {
    const filteredOrders = ordersList.filter(o => isDateInPeriod(o.date));
    const filteredUsers = usersList.filter(u => isDateInPeriod(u.registrationDate));

    const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const numberOfOrders = filteredOrders.length;
    const avgOrderValue = numberOfOrders > 0 ? (totalRevenue / numberOfOrders) : 0;
    const newCustomers = filteredUsers.length;

    // Dynamic Sales Over Time Chart Data based on filteredOrders
    let dynamicSalesOverTime = [];
    if (timePeriod === 'Today') {
      dynamicSalesOverTime = filteredOrders.map(o => ({ label: o.orderNumber, value: o.amount }));
    } else if (timePeriod === 'Last 7 Days') {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({
          dateStr: d.toISOString().split('T')[0],
          label: d.toLocaleDateString(undefined, { weekday: 'short' }),
          value: 0
        });
      }
      filteredOrders.forEach(o => {
        const match = days.find(day => day.dateStr === o.date);
        if (match) match.value += o.amount;
      });
      dynamicSalesOverTime = days;
    } else if (timePeriod === 'This Month') {
      const weeks = [
        { label: 'Week 1', value: 0 },
        { label: 'Week 2', value: 0 },
        { label: 'Week 3', value: 0 },
        { label: 'Week 4', value: 0 }
      ];
      filteredOrders.forEach(o => {
        const parts = o.date.split('-');
        if (parts.length === 3) {
          const day = parseInt(parts[2], 10);
          const weekIdx = Math.min(3, Math.floor((day - 1) / 7));
          weeks[weekIdx].value += o.amount;
        }
      });
      dynamicSalesOverTime = weeks;
    } else { // This Year
      const months = [
        { label: 'Jan', value: 0 }, { label: 'Feb', value: 0 }, { label: 'Mar', value: 0 },
        { label: 'Apr', value: 0 }, { label: 'May', value: 0 }, { label: 'Jun', value: 0 },
        { label: 'Jul', value: 0 }, { label: 'Aug', value: 0 }, { label: 'Sep', value: 0 },
        { label: 'Oct', value: 0 }, { label: 'Nov', value: 0 }, { label: 'Dec', value: 0 }
      ];
      filteredOrders.forEach(o => {
        const parts = o.date.split('-');
        if (parts.length === 3) {
          const monthIdx = parseInt(parts[1], 10) - 1;
          if (monthIdx >= 0 && monthIdx < 12) {
            months[monthIdx].value += o.amount;
          }
        }
      });
      const currentMonth = new Date().getMonth();
      dynamicSalesOverTime = months.slice(0, currentMonth + 1);
    }

    const maxVal = Math.max(...dynamicSalesOverTime.map(d => d.value), 1000);
    const chartPoints = dynamicSalesOverTime.map((d, i) => {
      const x = (i * 400) / Math.max(1, dynamicSalesOverTime.length - 1);
      const y = 120 - (d.value / maxVal) * 80;
      return { x, y, label: d.label, value: d.value };
    });

    const linePath = chartPoints.length > 0
      ? `M ${chartPoints[0].x} ${chartPoints[0].y} ` + chartPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
      : 'M 0 120';
    const areaPath = chartPoints.length > 0
      ? `${linePath} L ${chartPoints[chartPoints.length - 1].x} 150 L ${chartPoints[0].x} 150 Z`
      : 'M 0 120 L 400 150 L 0 150 Z';

    // Dynamic Categories Donut
    const categoryCounts = {};
    filteredOrders.forEach(o => {
      const prod = getProductForOrder(o);
      categoryCounts[prod.category] = (categoryCounts[prod.category] || 0) + 1;
    });

    const dynamicTopCategories = Object.entries(categoryCounts).map(([label, value]) => ({
      label,
      value
    })).sort((a, b) => b.value - a.value);

    const fallbackTopCategories = [
      { label: 'Clothing', value: 4 },
      { label: 'Art', value: 3 },
      { label: 'Pottery', value: 2 },
      { label: 'Home', value: 1 }
    ];
    const finalTopCategories = dynamicTopCategories.length > 0 ? dynamicTopCategories : fallbackTopCategories;
    const previousOrders = ordersList.filter(o => isDateInPreviousPeriod(o.date));
    const previousUsers = usersList.filter(u => isDateInPreviousPeriod(u.registrationDate));

    const prevTotalRevenue = previousOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const prevNumberOfOrders = previousOrders.length;
    const prevAvgOrderValue = prevNumberOfOrders > 0 ? (prevTotalRevenue / prevNumberOfOrders) : 0;
    const prevNewCustomers = previousUsers.length;

    const revenueChange = calculateChange(totalRevenue, prevTotalRevenue);
    const ordersChange = calculateChange(numberOfOrders, prevNumberOfOrders);
    const aovChange = calculateChange(avgOrderValue, prevAvgOrderValue);
    const customersChange = calculateChange(newCustomers, prevNewCustomers);

    return { 
      totalRevenue, 
      numberOfOrders, 
      avgOrderValue, 
      newCustomers, 
      filteredOrders,
      chartPoints,
      linePath,
      areaPath,
      finalTopCategories,
      revenueChange,
      ordersChange,
      aovChange,
      customersChange
    };
  };

  const renderSalesOverview = () => {
    const { 
      totalRevenue, 
      numberOfOrders, 
      avgOrderValue, 
      newCustomers, 
      filteredOrders,
      chartPoints,
      linePath,
      areaPath,
      finalTopCategories,
      revenueChange,
      ordersChange,
      aovChange,
      customersChange
    } = calculateSalesOverview();

    const formatCurrency = (amount) => `LKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    const sortedFilteredOrders = [...filteredOrders].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const totalItems = finalTopCategories.reduce((sum, cat) => sum + cat.value, 0);
    const colors = ['#8D6E63', '#A1887F', '#FFCCBC', '#F1E6DA', '#D7CCC8'];
    
    // Compute cumulative percentages for strokeDashoffset
    let accumulatedPercent = 0;
    const donutSegments = finalTopCategories.map((cat, index) => {
      const percent = totalItems > 0 ? Math.round((cat.value / totalItems) * 100) : 0;
      const segment = {
        label: cat.label,
        value: cat.value,
        percent,
        color: colors[index % colors.length],
        dashoffset: -accumulatedPercent
      };
      accumulatedPercent += percent;
      return segment;
    });

    return (
      <>
        <section className="stats-grid">
          <div className="stat-card"><div className="stat-title">Total Revenue</div><div className="stat-value">{formatCurrency(totalRevenue)}</div>{renderTrend(revenueChange)}</div>
          <div className="stat-card"><div className="stat-title">Number of Orders</div><div className="stat-value">{numberOfOrders}</div>{renderTrend(ordersChange)}</div>
          <div className="stat-card"><div className="stat-title">Average Order Value</div><div className="stat-value">{formatCurrency(avgOrderValue)}</div>{renderTrend(aovChange)}</div>
          <div className="stat-card"><div className="stat-title">New Customers</div><div className="stat-value">{newCustomers}</div>{renderTrend(customersChange)}</div>
        </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <h4>Sales Over Time</h4>
              <div className="chart-subtitle">{formatCurrency(totalRevenue)}</div>
            </div>
          </div>
          <div className="chart-placeholder">
            <svg className="area-chart-svg" viewBox="0 0 400 150">
              <defs><linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#8D6E63" stopOpacity="0.5" /><stop offset="100%" stopColor="#8D6E63" stopOpacity="0" /></linearGradient></defs>
              {chartPoints.length > 0 ? (
                <>
                  <path 
                    d={areaPath} 
                    fill="url(#gradient2)" 
                  />
                  <path 
                    d={linePath} 
                    fill="none" stroke="#8D6E63" strokeWidth="2" 
                  />
                  {chartPoints.map((p, i) => (
                    <text key={i} x={p.x} y="145" fontSize="8" fill="#666" textAnchor="middle">
                      {p.label}
                    </text>
                  ))}
                </>
              ) : (
                <text x="200" y="75" fill="#999" fontSize="12" textAnchor="middle">No sales data available</text>
              )}
            </svg>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header"><h4>Top Selling Products</h4></div>
          {donutSegments.length > 0 ? (
            <div className="donut-chart-container">
              <div style={{ position: 'relative' }}>
                <svg className="donut-svg" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ECEFF1" strokeWidth="3"></circle>
                  {donutSegments.map((seg, i) => (
                    <circle 
                      key={i}
                      cx="21" 
                      cy="21" 
                      r="15.915" 
                      fill="transparent" 
                      stroke={seg.color} 
                      strokeWidth="3" 
                      strokeDasharray={`${seg.percent} ${100 - seg.percent}`} 
                      strokeDashoffset={seg.dashoffset}
                    ></circle>
                  ))}
                </svg>
                <div className="donut-center-text"><span className="value">{totalItems}</span><span className="label">Units</span></div>
              </div>
              <div className="donut-legend">
                {donutSegments.map((seg, i) => (
                  <div className="legend-item" key={i}>
                    <div className="legend-label">
                      <div className="legend-dot" style={{ backgroundColor: seg.color }}></div>
                      {seg.label}
                    </div>
                    <span className="legend-value">{seg.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#999', fontSize: '14px' }}>No categories data available</div>
          )}
        </div>
      </section>
      <section className="product-table-card">
        <h3>Recent Transactions</h3>
        <table>
          <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {sortedFilteredOrders.length > 0 ? (
              sortedFilteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderNumber}</td>
                  <td>{order.date}</td>
                  <td>{order.buyerName}</td>
                  <td>{formatCurrency(order.amount)}</td>
                  <td>
                    <span className={`status-badge ${order.orderStatus.toLowerCase().replace(' ', '-')}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No transactions recorded for this period
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

  const renderProductSalesView = () => {
    const { filteredOrders, areaPath, linePath, chartPoints } = calculateSalesOverview();
    
    const grossSales = filteredOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const unitsSold = filteredOrders.reduce((sum, o) => sum + (o.amount > 30000 ? 3 : o.amount > 15000 ? 2 : 1), 0);
    const netSales = filteredOrders.filter(o => o.orderStatus === 'Completed' || o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.amount, 0);
    const productAOV = filteredOrders.length > 0 ? (grossSales / filteredOrders.length) : 0;

    const previousOrders = ordersList.filter(o => isDateInPreviousPeriod(o.date));
    const prevGrossSales = previousOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const prevUnitsSold = previousOrders.reduce((sum, o) => sum + (o.amount > 30000 ? 3 : o.amount > 15000 ? 2 : 1), 0);
    const prevNetSales = previousOrders.filter(o => o.orderStatus === 'Completed' || o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.amount, 0);
    const prevProductAOV = previousOrders.length > 0 ? (prevGrossSales / previousOrders.length) : 0;

    const unitsChange = calculateChange(unitsSold, prevUnitsSold);
    const grossChange = calculateChange(grossSales, prevGrossSales);
    const netChange = calculateChange(netSales, prevNetSales);
    const aovChange = calculateChange(productAOV, prevProductAOV);

    const formatCurrency = (amount) => `LKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    // Build dynamic product performance
    const prodMap = {};
    filteredOrders.forEach(o => {
      const prod = getProductForOrder(o);
      const units = o.amount > 30000 ? 3 : o.amount > 15000 ? 2 : 1;
      if (!prodMap[prod.name]) {
        prodMap[prod.name] = { name: prod.name, sold: 0, orders: 0, revenue: 0, category: prod.category };
      }
      prodMap[prod.name].sold += units;
      prodMap[prod.name].orders += 1;
      prodMap[prod.name].revenue += o.amount;
    });

    const dynamicProductPerformance = Object.values(prodMap).sort((a, b) => b.revenue - a.revenue);
    const fallbackProducts = [
      { name: 'Batik Print Silk Saree', sold: 35, orders: 12, revenue: 42000, category: 'Clothing' },
      { name: 'Carved Wooden Elephant', sold: 28, orders: 9, revenue: 36000, category: 'Art' },
      { name: 'Hand-painted Ceramic Vase', sold: 15, orders: 7, revenue: 25000, category: 'Pottery' },
      { name: 'Handwoven Reed Basket', sold: 12, orders: 6, revenue: 15000, category: 'Home' },
    ];
    const finalProductPerformance = dynamicProductPerformance.length > 0
      ? dynamicProductPerformance.map(p => ({ ...p, revenue: formatCurrency(p.revenue) }))
      : fallbackProducts.map(p => ({ ...p, revenue: formatCurrency(p.revenue) }));

    // Popular Variations
    const varMap = {};
    filteredOrders.forEach(o => {
      const prod = getProductForOrder(o);
      const units = o.amount > 30000 ? 3 : o.amount > 15000 ? 2 : 1;
      const suffix = o.amount % 2 === 0 ? 'Blue' : 'Red';
      const varName = `${prod.name} - ${suffix}`;
      if (!varMap[varName]) {
        varMap[varName] = { name: varName, sold: 0, revenue: 0 };
      }
      varMap[varName].sold += units;
      varMap[varName].revenue += o.amount;
    });

    const dynamicVariations = Object.values(varMap)
      .map(v => ({ name: v.name, sold: `${v.sold} units sold`, revenue: formatCurrency(v.revenue) }))
      .sort((a, b) => parseInt(b.sold) - parseInt(a.sold));

    const fallbackVariations = [
      { name: 'Batik Saree - Blue', sold: '52 units sold', revenue: 'LKR 36,000' },
      { name: 'Wooden Elephant - Large', sold: '45 units sold', revenue: 'LKR 34,500' },
      { name: 'Clay Pot - Painted', sold: '38 units sold', revenue: 'LKR 42,300' },
      { name: 'Batik Saree - Red', sold: '35 units sold', revenue: 'LKR 40,850' },
      { name: 'Wooden Elephant - Small', sold: '30 units sold', revenue: 'LKR 38,450' },
    ];
    const finalVariations = dynamicVariations.length > 0 ? dynamicVariations : fallbackVariations;

    return (
      <>
        <section className="stats-grid">
          <div className="stat-card"><div className="stat-title">Units Sold</div><div className="stat-value">{unitsSold}</div>{renderTrend(unitsChange)}</div>
          <div className="stat-card"><div className="stat-title">Gross Sales</div><div className="stat-value">{formatCurrency(grossSales)}</div>{renderTrend(grossChange)}</div>
          <div className="stat-card"><div className="stat-title">Net Sales</div><div className="stat-value">{formatCurrency(netSales)}</div>{renderTrend(netChange)}</div>
          <div className="stat-card"><div className="stat-title">Product AOV</div><div className="stat-value">{formatCurrency(productAOV)}</div>{renderTrend(aovChange)}</div>
        </section>
        <section className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-title">
                <h4>Net Sales Over Time</h4>
                <div className="chart-subtitle">{formatCurrency(netSales)}</div>
              </div>
            </div>
            <div className="chart-placeholder">
              <svg className="area-chart-svg" viewBox="0 0 400 150">
                <defs><linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#8D6E63" stopOpacity="0.5" /><stop offset="100%" stopColor="#8D6E63" stopOpacity="0" /></linearGradient></defs>
                {chartPoints.length > 0 ? (
                  <>
                    <path d={areaPath} fill="url(#gradient3)" />
                    <path d={linePath} fill="none" stroke="#8D6E63" strokeWidth="2" />
                    {chartPoints.map((p, i) => (
                      <text key={i} x={p.x} y="145" fontSize="8" fill="#666" textAnchor="middle">{p.label}</text>
                    ))}
                  </>
                ) : (
                  <text x="200" y="75" fill="#999" fontSize="12" textAnchor="middle">No sales data available</text>
                )}
              </svg>
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-header"><h4>Popular Variations</h4></div>
            <div className="variations-list">
              {finalVariations.map((v, i) => (<div className="variation-item" key={i}><div className="variation-info"><h5>{v.name}</h5><p>{v.sold}</p></div><div className="variation-revenue">{v.revenue}</div></div>))}
            </div>
          </div>
        </section>
        <section className="product-table-card">
          <h3>Product Performance</h3>
          <table>
            <thead><tr><th>Product</th><th>Units Sold</th><th>Orders</th><th>Net Sales</th><th>Category</th></tr></thead>
            <tbody>
              {finalProductPerformance.map((p, i) => (<tr key={i}><td>{p.name}</td><td>{p.sold}</td><td>{p.orders}</td><td>{p.revenue}</td><td>{p.category}</td></tr>))}
            </tbody>
          </table>
        </section>
      </>
    );
  };

  const renderSellerRevenueView = () => {
    const { filteredOrders } = calculateSalesOverview();
    const formatCurrency = (amount) => `LKR ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    const totalSellerRevenue = filteredOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const netPayout = totalSellerRevenue * 0.85;
    const totalOrders = filteredOrders.length;
    const avgSaleValue = totalOrders > 0 ? (totalSellerRevenue / totalOrders) : 0;

    const previousOrders = ordersList.filter(o => isDateInPreviousPeriod(o.date));
    const prevTotalSellerRevenue = previousOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const prevNetPayout = prevTotalSellerRevenue * 0.85;
    const prevTotalOrders = previousOrders.length;
    const prevAvgSaleValue = prevTotalOrders > 0 ? (prevTotalSellerRevenue / prevTotalOrders) : 0;

    const sellerRevChange = calculateChange(totalSellerRevenue, prevTotalSellerRevenue);
    const netPayoutChange = calculateChange(netPayout, prevNetPayout);
    const sellerOrdersChange = calculateChange(totalOrders, prevTotalOrders);
    const avgSaleChange = calculateChange(avgSaleValue, prevAvgSaleValue);

    // Group by seller using database sellersList as base
    const sellerMap = {};
    sellersList.forEach(s => {
      sellerMap[s.name] = { name: s.name, revenue: 0, orders: 0 };
    });

    filteredOrders.forEach(o => {
      const name = o.sellerName || 'Other Seller';
      if (!sellerMap[name]) {
        sellerMap[name] = { name, revenue: 0, orders: 0 };
      }
      sellerMap[name].revenue += o.amount;
      sellerMap[name].orders += 1;
    });

    const dynamicTopSellers = Object.values(sellerMap)
      .map(s => {
        const percent = totalSellerRevenue > 0 ? Math.round((s.revenue / totalSellerRevenue) * 100) : 0;
        return {
          name: s.name,
          revenue: `LKR ${s.revenue.toLocaleString()}`,
          percent
        };
      })
      .sort((a, b) => parseFloat(b.revenue.replace(/[^0-9.-]+/g,"")) - parseFloat(a.revenue.replace(/[^0-9.-]+/g,"")));

    const fallbackTopSellers = [
      { name: 'Silk Waves', revenue: 'LKR 68,500', percent: 90 },
      { name: 'Crafty Hands', revenue: 'LKR 52,000', percent: 75 },
      { name: 'Ceylon Pottery', revenue: 'LKR 46,400', percent: 65 },
      { name: 'Wood Art', revenue: 'LKR 42,550', percent: 55 },
      { name: 'Batik LK', revenue: 'LKR 42,550', percent: 50 },
    ];
    const isInitialLoading = sellersList.length === 0 && ordersList.length === 0;
    const finalTopSellers = isInitialLoading ? fallbackTopSellers : dynamicTopSellers;

    // Donut Segments for Seller Payout Distribution
    const colors = ['#8D6E63', '#A1887F', '#FFCCBC', '#F1E6DA', '#D7CCC8'];
    let accumulatedPercent = 0;
    const sellerDonutSegments = finalTopSellers.map((s, index) => {
      const segment = {
        label: s.name,
        percent: s.percent,
        color: colors[index % colors.length],
        dashoffset: -accumulatedPercent
      };
      accumulatedPercent += s.percent;
      return segment;
    });

    const dynamicSellerPerformance = Object.values(sellerMap)
      .map(s => ({
        name: s.name,
        total: `LKR ${s.revenue.toLocaleString()}`,
        net: `LKR ${(s.revenue * 0.85).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        orders: s.orders,
        avg: `LKR ${(s.orders > 0 ? Math.round(s.revenue / s.orders) : 0).toLocaleString()}`
      }))
      .sort((a, b) => parseFloat(b.total.replace(/[^0-9.-]+/g,"")) - parseFloat(a.total.replace(/[^0-9.-]+/g,"")));

    const fallbackSellerPerformance = [
      { name: 'Silk Waves', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
      { name: 'Crafty Hands', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
      { name: 'Ceylon Pottery', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
      { name: 'Wood Art', total: 'LKR 42,000', net: 'LKR 42,000', orders: 215, avg: 'LKR 42,000' },
    ];
    const finalSellerPerformance = isInitialLoading ? fallbackSellerPerformance : dynamicSellerPerformance;

    return (
      <>
        <section className="stats-grid">
          <div className="stat-card"><div className="stat-title">Total Seller Revenue</div><div className="stat-value">{formatCurrency(totalSellerRevenue)}</div>{renderTrend(sellerRevChange)}</div>
          <div className="stat-card"><div className="stat-title">Net Revenue (Payout)</div><div className="stat-value">{formatCurrency(netPayout)}</div>{renderTrend(netPayoutChange)}</div>
          <div className="stat-card"><div className="stat-title">Total Orders</div><div className="stat-value">{totalOrders}</div>{renderTrend(sellerOrdersChange)}</div>
          <div className="stat-card"><div className="stat-title">Avg. Sale Value</div><div className="stat-value">{formatCurrency(avgSaleValue)}</div>{renderTrend(avgSaleChange)}</div>
        </section>
        <section className="charts-grid">
          <div className="chart-card">
            <div className="chart-header"><h4>Top Sellers by Revenue</h4></div>
            <div className="seller-bar-chart">
              {finalTopSellers.map((s, i) => (
                <div className="seller-bar-item" key={i}>
                  <div className="seller-bar-label"><span>{s.name}</span><span>{s.revenue}</span></div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${s.percent}%` }}>{s.name}</div>
                    <div className="progress-bar-value">{s.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-header"><h4>Revenue Distribution</h4></div>
            <div className="donut-chart-container">
              <div style={{ position: 'relative' }}>
                <svg className="donut-svg" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ECEFF1" strokeWidth="3"></circle>
                  {sellerDonutSegments.map((seg, i) => (
                    <circle 
                      key={i}
                      cx="21" 
                      cy="21" 
                      r="15.915" 
                      fill="transparent" 
                      stroke={seg.color} 
                      strokeWidth="3" 
                      strokeDasharray={`${seg.percent} ${100 - seg.percent}`} 
                      strokeDashoffset={seg.dashoffset}
                    ></circle>
                  ))}
                </svg>
                <div className="donut-center-text"><span className="value" style={{ fontSize: '10px' }}>{formatCurrency(totalSellerRevenue)}</span><span className="label">Total Revenue</span></div>
              </div>
              <div className="donut-legend">
                {sellerDonutSegments.map((seg, i) => (
                  <div className="legend-item" key={i}>
                    <div className="legend-label">
                      <div className="legend-dot" style={{ backgroundColor: seg.color }}></div>
                      {seg.label}
                    </div>
                    <span className="legend-value">{seg.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="product-table-card">
          <h3>Seller Performance Details</h3>
          <table>
            <thead><tr><th>Seller</th><th>Total Revenue</th><th>Net Revenue</th><th>Orders</th><th>Avg. Sale Value</th></tr></thead>
            <tbody>
              {finalSellerPerformance.map((p, i) => (<tr key={i}><td>{p.name}</td><td>{p.total}</td><td>{p.net}</td><td>{p.orders}</td><td>{p.avg}</td></tr>))}
            </tbody>
          </table>
        </section>
      </>
    );
  };

  const renderSalesAnalytics = () => (
    <div className="sales-analytics-view">
      <div className="admin-view-header"><h2>Sales Report & Analytics</h2></div>
      <div className="refund-tabs">
        <div className={`refund-tab ${analyticsSubTab === 'Sales Overview' ? 'active' : ''}`} onClick={() => setAnalyticsSubTab('Sales Overview')}>Sales Overview</div>
        <div className={`refund-tab ${analyticsSubTab === 'Product Sales' ? 'active' : ''}`} style={{ color: analyticsSubTab === 'Product Sales' ? '#FF9800' : '' }} onClick={() => setAnalyticsSubTab('Product Sales')}>Product Sales</div>
        <div className={`refund-tab ${analyticsSubTab === 'Seller Revenue' ? 'active' : ''}`} style={{ color: analyticsSubTab === 'Seller Revenue' ? '#FF9800' : '' }} onClick={() => setAnalyticsSubTab('Seller Revenue')}>Seller Revenue</div>
      </div>
      <div className="time-filters">{['Today', 'Last 7 Days', 'This Month', 'This Year'].map(pill => (<div key={pill} className={`time-filter-pill ${timePeriod === pill ? 'active' : ''}`} onClick={() => setTimePeriod(pill)}>{pill}</div>))}</div>
      {analyticsSubTab === 'Seller Revenue' ? renderSellerRevenueView() : analyticsSubTab === 'Product Sales' ? renderProductSalesView() : renderSalesOverview()}
    </div>
  );

  const renderRefundWorkflow = () => {
    const getRefundSellerName = (refund) => {
      const refundDigits = (refund.orderNumber || '').replace(/\D/g, '');
      const order = ordersList.find(o => (o.orderNumber || '').replace(/\D/g, '') === refundDigits);
      if (order) return order.sellerName;
      if (refundDigits === '1234') return 'Crafty Hand';
      if (refundDigits === '5678') return 'Island Gems';
      if (refundDigits === '1111') return 'Wood Art';
      if (refundDigits === '2222') return 'Crafty Hand';
      if (refundDigits === '3333') return 'Wood Art';
      if (refundDigits === '4444') return 'Island Gems';
      if (refundDigits === '5555') return 'Jewel Craft';
      return 'Silk Waves';
    };

    const refundSellers = ['All Sellers', ...new Set(refundsList.map(r => getRefundSellerName(r)))];

    const getFilteredCount = (status) => {
      return refundsList.filter(refund => {
        if (refund.status !== status) return false;
        
        if (refundSeller !== 'All Sellers') {
          const sName = getRefundSellerName(refund);
          if (sName !== refundSeller) return false;
        }

        if (refundSearch.trim() !== '') {
          const q = refundSearch.toLowerCase();
          const orderNo = (refund.orderNumber || '').toLowerCase();
          const custName = (refund.customerName || '').toLowerCase();
          const prodName = (refund.productName || '').toLowerCase();
          const sName = getRefundSellerName(refund).toLowerCase();
          if (!orderNo.includes(q) && !custName.includes(q) && !prodName.includes(q) && !sName.includes(q)) return false;
        }

        return true;
      }).length;
    };

    const newRequestsCount = getFilteredCount('New');
    const underReviewCount = getFilteredCount('Under Review');
    const awaitingSellerCount = getFilteredCount('Awaiting Seller Action');

    const filteredRefunds = refundsList.filter(refund => {
      if (refund.status !== refundSubTab) return false;

      if (refundSeller !== 'All Sellers') {
        const sName = getRefundSellerName(refund);
        if (sName !== refundSeller) return false;
      }

      if (refundSearch.trim() !== '') {
        const q = refundSearch.toLowerCase();
        const orderNo = (refund.orderNumber || '').toLowerCase();
        const custName = (refund.customerName || '').toLowerCase();
        const prodName = (refund.productName || '').toLowerCase();
        const sName = getRefundSellerName(refund).toLowerCase();
        if (!orderNo.includes(q) && !custName.includes(q) && !prodName.includes(q) && !sName.includes(q)) return false;
      }

      return true;
    });

    const formatRefundTime = (timeStr) => {
      if (!timeStr) return '';
      try {
        const d = new Date(timeStr);
        if (isNaN(d.getTime())) return timeStr;
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + 
               d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return timeStr;
      }
    };

    return (
      <div className="refund-workflow-view">
        <div className="admin-view-header"><h2>Refund Workflow Management</h2></div>
        <div className="filters-bar" style={{ justifyContent: 'space-between' }}>
          <div className="search-bar-container">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by order ID, Customer Name, Date....." 
              value={refundSearch}
              onChange={(e) => setRefundSearch(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={refundSeller}
            onChange={(e) => setRefundSeller(e.target.value)}
          >
            {refundSellers.map((seller, i) => (
              <option key={i} value={seller}>{seller}</option>
            ))}
          </select>
        </div>
        <div className="refund-tabs">
          <div className={`refund-tab ${refundSubTab === 'New' ? 'active' : ''}`} onClick={() => setRefundSubTab('New')}>
            New Requests ({newRequestsCount})
          </div>
          <div className={`refund-tab ${refundSubTab === 'Under Review' ? 'active' : ''}`} onClick={() => setRefundSubTab('Under Review')}>
            Under Review ({underReviewCount})
          </div>
          <div className={`refund-tab awaiting ${refundSubTab === 'Awaiting Seller Action' ? 'active' : ''}`} onClick={() => setRefundSubTab('Awaiting Seller Action')}>
            Awaiting seller Action({awaitingSellerCount})
          </div>
        </div>
        <div className="refund-card-grid">
          {filteredRefunds.length > 0 ? (
            filteredRefunds.map((refund, index) => (
              <div className="refund-card" key={index}>
                <div className="refund-card-header">
                  <h4>Order {refund.orderNumber}</h4>
                  <p>{refund.productName}</p>
                </div>
                <div className="refund-card-footer">
                  <div className="refund-customer-info">
                    <span className="customer-name">{refund.customerName}</span>
                    <span className="refund-time">{formatRefundTime(refund.requestTime)}</span>
                  </div>
                  <div className="refund-amount">{formatCurrency(refund.amount)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-records-message" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', color: '#999', fontSize: '14px', fontWeight: '500', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <span>No refund requests found matching your criteria.</span>
              {(refundSearch || refundSeller !== 'All Sellers') && (
                <button 
                  onClick={() => { setRefundSearch(''); setRefundSeller('All Sellers'); }}
                  style={{
                    backgroundColor: '#5D4037',
                    color: '#FFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4E342E'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#5D4037'}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDisputeDetail = () => (
    <div className="dispute-detail-view">
      <div className="admin-view-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setSelectedDispute(null)}>
          <ChevronLeft size={24} />
          <h2>Refund Workflow Management</h2>
        </div>
      </div>
      <div className="dispute-detail-header-card"><span className="dispute-id-label">Dispute ID {selectedDispute.id}</span><h3 className="dispute-title-large">{selectedDispute.reason}</h3><span className="pending-action-badge">Pending Admin Action</span></div>
      <div className="dispute-detail-tabs">
        <div className={`dispute-detail-tab ${disputeTab === 'Summary' ? 'active' : ''}`} onClick={() => setDisputeTab('Summary')}>Summary</div>
        <div className={`dispute-detail-tab ${disputeTab === 'Communication' ? 'active' : ''}`} onClick={() => setDisputeTab('Communication')}>Communication</div>
        <div className={`dispute-detail-tab ${disputeTab === 'Evidence' ? 'active' : ''}`} onClick={() => setDisputeTab('Evidence')}>Evidence</div>
      </div>
      <div className="dispute-grid-layout">
        <div className="detail-section-card">
          {disputeTab === 'Evidence' ? (
            <div className="evidence-container">
              <div className="evidence-block">
                <h4>Buyer's Evidence</h4>
                <p>Uploaded by {buyerEvidence.uploadedBy} on {buyerEvidence.date}</p>
                <div className="evidence-image-grid">
                  {buyerEvidence.images.map((img, i) => <img src={img} alt="Evidence" className="evidence-img" key={i} />)}
                </div>
                <div className="evidence-footer"><span>{buyerEvidence.count} images files</span><div className="download-link"><Download size={14} /> Download All</div></div>
                <div className="admin-comments-section"><h5>Admin Comments</h5><div className="admin-comment-box"><input type="text" placeholder="Add a comment on Buyer's Evidence......" /><Send size={16} className="send-btn" /></div></div>
              </div>
              <div className="evidence-block">
                <h4>Seller's Evidence</h4>
                <p>Uploaded by {sellerEvidence.uploadedBy} on {sellerEvidence.date}</p>
                <div className="file-list">
                  {sellerEvidence.files.map((file, i) => (
                    <div className="file-item" key={i}>
                      <div className="file-info"><div className={`file-icon ${file.type === 'video' ? 'video' : ''}`}>{file.type === 'video' ? <Video size={18} /> : <FileIcon size={18} />}</div><div className="file-details"><h6>{file.name}</h6><span>{file.size}</span></div></div>
                      <div className="file-actions"><Eye size={16} /><Download size={16} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : disputeTab === 'Communication' ? (
            <div className="message-thread">
              {messages.map((m, i) => (
                <div className="message-item" key={i}>
                  <div className={`message-avatar ${m.type}`}>{m.type === 'buyer' ? <User size={18} /> : m.type === 'seller' ? <Store size={18} /> : <User size={18} />}</div>
                  <div className="message-content-wrapper">
                    <div className="message-header"><div className="sender-info">{m.sender}<span className="sender-role">({m.role})</span></div><span className="message-time">{m.time}</span></div>
                    <div className={`message-bubble ${m.type === 'admin' ? 'admin-note' : ''}`}>{m.content}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h4>Case Details</h4>
              <div className="case-details-grid">
                <div className="detail-item"><label>Buyer</label><span>{selectedDispute.buyer}</span></div>
                <div className="detail-item"><label>Seller</label><span>{selectedDispute.seller}</span></div>
                <div className="detail-item"><label>Item</label><span>{selectedDispute.item}</span></div>
                <div className="detail-item"><label>Order ID</label><span>{selectedDispute.orderId}</span></div>
                <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Dispute Reason</label><span>{selectedDispute.reason}</span></div>
                <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Desired Outcome</label><span>{selectedDispute.outcome}</span></div>
              </div>
            </>
          )}
        </div>
        <div className="action-info-group">
          <div className="detail-section-card">
            <h4>Action & Info</h4>
            <div className="action-sub-group"><label>Mediation Tools</label><button className="btn-primary-blue"><Send size={16} /> Send Message</button><div className="request-info-link"><Info size={14} /> Request More Info</div></div>
            <div className="action-sub-group" style={{ marginTop: '20px' }}><label>Make a Decision</label><button className="btn-decision-buyer"><ThumbsUp size={16} /> Rule in Favor of Buyer</button><button className="btn-decision-seller"><ThumbsDown size={16} /> Rule in Favor of Seller</button></div>
            <div className="action-sub-group" style={{ marginTop: '20px' }}>
              <label>Related Information</label>
              <div className="related-links-list">
                <div className="related-link"><User size={14} /> View Buyer's Profile</div><div className="related-link"><User size={14} /> View Seller's Profile</div><div className="related-link"><Package size={14} /> View Product Page</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisputeResolution = () => (
    <div className="dispute-resolution-view">
      <div className="admin-view-header"><h2>Refund Workflow Management</h2></div>
      <div className="filters-bar" style={{ justifyContent: 'flex-end', gap: '15px' }}><select className="filter-select"><option>Filter by Status</option></select><select className="filter-select"><option>All Sellers</option></select></div>
      <div className="filters-bar" style={{ marginTop: '10px' }}><div className="search-bar-container" style={{ maxWidth: 'none' }}><Search size={18} /><input type="text" placeholder="Search by order ID, Customer Name, ......" /></div></div>
      <div className="refund-card-grid" style={{ marginTop: '20px' }}>
        {disputesList.map((dispute, index) => (
          <div className="dispute-card" key={index}>
            <h4>Dispute {dispute.disputeNumber} -</h4><p className="dispute-reason">{dispute.reason}</p><div className="dispute-info"><span>Item: {dispute.itemName}</span><span>Buyer: {dispute.buyerName}</span></div>
            <div className="dispute-footer">
              <span className={`status-badge ${dispute.status.toLowerCase()}`}>{dispute.status}</span>
              <div className="view-details-link" onClick={() => setSelectedDispute(dispute)}><Eye size={14} /><span>View Details</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="system-settings-view">
      <div className="admin-view-header"><h2>System Settings</h2></div>
      <div className="settings-container">
        <div className="settings-card"><div className="settings-card-header"><h3>Site Information</h3></div><div className="settings-card-body"><div className="settings-group"><label>Site Title</label><input type="text" className="settings-input" defaultValue="Lanka Craft" /></div><div className="settings-group"><label>Tagline</label><input type="text" className="settings-input" defaultValue="Handmade with love in Sri Lanka" /></div><div className="settings-group"><label>Admin Email Address</label><input type="email" className="settings-input" defaultValue="admin@lankacraft.lk" /></div><div className="settings-group"><label>Site Logo</label><div className="logo-section"><div className="logo-preview">Logo</div><button className="upload-btn">Upload New Logo</button></div></div></div></div>
        <div className="settings-card"><div className="settings-card-header"><h3>Maintenance & Performance</h3></div><div className="settings-card-body"><div className="settings-toggle-row"><div className="toggle-info"><h4>Enable Maintenance Mode</h4><p>Puts the storefront in maintenance mode. Admins can still access the site.</p></div><label className="switch"><input type="checkbox" /><span className="slider"></span></label></div><div className="settings-toggle-row"><div className="toggle-info"><h4>Enable Caching</h4><p>Improves site performance by caching pages. Recommended for production.</p></div><label className="switch"><input type="checkbox" defaultChecked /><span className="slider"></span></label></div></div></div>
        <div className="settings-card"><div className="settings-card-header"><h3>Localization</h3></div><div className="settings-card-body"><div className="localization-grid"><div className="settings-group"><label>Default Currency</label><select className="settings-input"><option>SL Rupee (LKR)</option></select></div><div className="settings-group"><label>Default Language</label><select className="settings-input"><option>English</option></select></div></div><div className="settings-group"><label>Time Zone</label><select className="settings-input"><option>Asia/Colombo (UTC+5.30)</option></select></div></div></div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'Dispute Resolution' && selectedDispute) return renderDisputeDetail();
    switch (activeTab) {
      case 'User Management': return renderUserManagement();
      case 'Seller Management': return renderSellerManagement();
      case 'Product Approval': return renderProductApproval();
      case 'Order Monitoring': return renderOrderMonitoring();
      case 'Content Management': return renderContentManagement();
      case 'Sales & Analytics': return renderSalesAnalytics();
      case 'Refund Workflow': return renderRefundWorkflow();
      case 'Dispute Resolution': return renderDisputeResolution();
      case 'System Settings': return renderSystemSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="admin-dashboard-container">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">LANKA CRAFT</div>
        <div className="admin-profile"><img src={adminAvatar} alt="Admin" className="admin-avatar" /><div className="admin-info"><h3>Ayodya Senavirathne</h3><p>Admin</p></div></div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (<div key={item.name} className={`nav-item ${activeTab === item.name ? 'active' : ''}`} onClick={() => { setActiveTab(item.name); setSelectedDispute(null); }}>{item.icon}<span>{item.name}</span></div>))}
          <div className="nav-item-bottom"><div className="nav-item"><HelpCircle size={20} /><span>Help</span></div><div className="nav-item"><LogOut size={20} /><span>Logout</span></div></div>
        </nav>
      </aside>
      <main className="admin-main-content">
        <header className="admin-header"><nav className="header-nav"><span>Home</span><span>Shops</span><span>About Us</span></nav><div className="header-actions"><div className="action-icon"><Search size={20} /></div><div className="action-icon"><ShoppingBag size={20} /></div><div className="action-icon"><Bell size={20} /></div></div></header>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
