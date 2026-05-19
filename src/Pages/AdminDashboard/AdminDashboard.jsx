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
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import adminAvatar from '../../assets/admin_avatar.png';
import vaseImg from '../../assets/vases.png';
import sareeImg from '../../assets/saree.png';
import elephantImg from '../../assets/elephant.png';
import avatarFemale from '../../assets/avatar_female.png';
import avatarMale2 from '../../assets/avatar_male_2.png';
import bannerSale from '../../assets/banner_sale.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
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

  // Dispute Resolution State
  const [disputeSearch, setDisputeSearch] = useState('');
  const [disputeSeller, setDisputeSeller] = useState('All Sellers');
  const [disputeStatusFilter, setDisputeStatusFilter] = useState('All Status');
  const [disputeCommentInput, setDisputeCommentInput] = useState('');
  const [disputeMessageInput, setDisputeMessageInput] = useState('');

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
  const [newOrderForm, setNewOrderForm] = useState({ buyerName: '', sellerName: '', amount: '' });
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHeaderSearchOpen, setIsHeaderSearchOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [systemSettings, setSystemSettings] = useState({
    siteTitle: 'Lanka Craft',
    tagline: 'Handmade with love in Sri Lanka',
    adminEmail: 'admin@lankacraft.lk',
    logoUrl: '',
    maintenanceMode: false,
    cachingEnabled: true,
    defaultCurrency: 'SL Rupee (LKR)',
    defaultLanguage: 'English',
    timeZone: 'Asia/Colombo (UTC+5.30)'
  });

  const updateSystemSettings = async (updatedSettings) => {
    try {
      const res = await fetch('http://localhost:8082/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });
      if (res.ok) {
        const data = await res.json();
        setSystemSettings(data);
        return true;
      }
    } catch (e) {
      console.error('Error updating system settings:', e);
    }
    return false;
  };

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
        const [statsR, sellersR, productsR, ordersR, refundsR, disputesR, salesR, categoriesR, usersR, bannersR, settingsR] = await Promise.all([
          fetch('http://localhost:8082/api/admin/stats').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/sellers').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/products').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/orders').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/refunds').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/disputes').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/sales-over-time').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/top-categories').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/users').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/banners').then(res => res.json()),
          fetch('http://localhost:8082/api/admin/settings').then(res => res.json())
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
        setSystemSettings(settingsR);
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

  const handleHelpClick = () => {
    Swal.fire({
      title: '<strong>Lanka Loom Admin Help Center</strong>',
      icon: 'info',
      html: `
        <div style="text-align: left; font-family: 'Inter', sans-serif; line-height: 1.6;">
          <p style="color: #666; margin-bottom: 20px;">Welcome to the Lanka Loom Administrative Support system. Here you can easily manage the platform's core resources:</p>
          <ul style="padding-left: 20px; color: #444; margin-bottom: 20px;">
            <li><strong>Dashboard</strong>: High-level metrics on Sales, Orders, Sellers, and Categories.</li>
            <li><strong>User Management</strong>: Create new users, search, filter, and change user roles or status.</li>
            <li><strong>Seller Management</strong>: Approve pending artisan registration and suspend or activate current sellers.</li>
            <li><strong>Product Approval</strong>: Keep the quality high by approving, rejecting, or requesting edits on handcraft products before they list.</li>
            <li><strong>Order Monitoring</strong>: Search and inspect active or completed transactions, and create manual orders.</li>
            <li><strong>Content Management</strong>: Setup and manage banner advertisements or holiday sales campaigns.</li>
            <li><strong>Refund Workflow</strong>: Address buyer cancellation requests and process returns systematically.</li>
            <li><strong>Dispute Resolution</strong>: Administer disputes and communicate directly with buyers and sellers in real-time.</li>
          </ul>
          <div style="border-top: 1px solid #eee; padding-top: 15px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #8D6E63; font-weight: 600;">System Helpdesk: support@lankacraft.lk | Extension 301</p>
          </div>
        </div>
      `,
      showCloseButton: true,
      confirmButtonColor: '#8D6E63',
      confirmButtonText: 'Got it, Thanks!'
    });
  };

  const handleLogoutClick = () => {
    Swal.fire({
      title: 'Terminate Session?',
      text: "Are you sure you want to log out? Your online status in the database will be updated dynamically.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8D6E63',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logging out...',
          html: 'Connecting to database and updating administrator session status...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        try {
          const response = await fetch('http://localhost:8082/api/admin/users/logout', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (response.ok) {
            // Update local usersList to reflect status change dynamically
            const updatedUsersRes = await fetch('http://localhost:8082/api/admin/users');
            if (updatedUsersRes.ok) {
              setUsersList(await updatedUsersRes.json());
            }

            Swal.fire({
              title: 'Logged Out Successfully!',
              text: 'The database has been updated in real-time. You are now offline.',
              icon: 'success',
              confirmButtonColor: '#8D6E63',
              confirmButtonText: 'Log Back In'
            }).then(async (resClick) => {
              if (resClick.isConfirmed) {
                Swal.fire({
                  title: 'Logging back in...',
                  html: 'Updating database to restore administrator active session...',
                  allowOutsideClick: false,
                  didOpen: () => {
                    Swal.showLoading();
                  }
                });

                try {
                  const adminUser = usersList.find(u => u.role === 'Admin');
                  const adminId = adminUser ? adminUser.id : 1;
                  
                  await fetch(`http://localhost:8082/api/admin/users/${adminId}/status`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify('Active')
                  });

                  const finalUsersRes = await fetch('http://localhost:8082/api/admin/users');
                  if (finalUsersRes.ok) {
                    setUsersList(await finalUsersRes.json());
                  }

                  Swal.fire({
                    title: 'Welcome Back!',
                    text: 'Database successfully updated to Active (Online).',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                  });
                } catch (err) {
                  console.error("Error logging back in:", err);
                }
              }
            });
          } else {
            throw new Error("Failed to logout in database.");
          }
        } catch (error) {
          console.error("Logout error:", error);
          Swal.fire({
            title: 'Logout Failed',
            text: 'Could not communicate with database. Please try again.',
            icon: 'error',
            confirmButtonColor: '#8D6E63'
          });
        }
      }
    });
  };

  const formatCurrency = (value) => {
    return `LKR ${value?.toLocaleString()}`;
  };

  const renderDashboard = () => (
    <>
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-title">{translate('Total Sales')}</div><div className="stat-value">{formatCurrency(stats.totalSales)}</div><div className="stat-change positive">+{stats.salesChange}% this month</div></div>
        <div className="stat-card"><div className="stat-title">{translate('New Orders')}</div><div className="stat-value">{stats.newOrders}</div><div className="stat-change positive">+{stats.ordersChange}%</div></div>
        <div className="stat-card"><div className="stat-title">{translate('New Sellers')}</div><div className="stat-value">{stats.newSellers}</div><div className="stat-change positive">+{stats.sellersChange}%</div></div>
        <div className="stat-card"><div className="stat-title">{translate('Pending Products')}</div><div className="stat-value">{stats.pendingProducts}</div><div className="stat-change">+{stats.productsChange}%</div></div>
      </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title"><h4>{translate('Sales Over Time')}</h4><div className="chart-subtitle">{formatCurrency(stats.totalSales)}</div><div className="stat-change positive">this month +{stats.salesChange}%</div></div></div>
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
          <div className="chart-header"><div className="chart-title"><h4>{translate('Top Categories')}</h4><div className="chart-subtitle">{topCategories.reduce((sum, cat) => sum + cat.value, 0)} Items</div><div className="stat-change positive">this month +{stats.productsChange || 8}%</div></div></div>
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

  const handleDisputeDecision = async (outcome) => {
    try {
      const res = await fetch(`http://localhost:8082/api/admin/disputes/${selectedDispute.id}/decision`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outcome)
      });
      if (res.ok) {
        const updated = await res.json();
        setDisputesList(prev => prev.map(d => d.id === updated.id ? updated : d));
        setSelectedDispute(updated);
      }
    } catch (e) {
      console.error("Error making dispute decision:", e);
    }
  };

  const handleSendComment = async () => {
    if (!disputeCommentInput.trim()) return;
    try {
      const res = await fetch(`http://localhost:8082/api/admin/disputes/${selectedDispute.id}/comment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disputeCommentInput)
      });
      if (res.ok) {
        const updated = await res.json();
        setDisputesList(prev => prev.map(d => d.id === updated.id ? updated : d));
        setSelectedDispute(updated);
        setDisputeCommentInput('');
      }
    } catch (e) {
      console.error("Error saving dispute comment:", e);
    }
  };

  const handleSendMessage = async () => {
    if (!disputeMessageInput.trim()) return;
    try {
      const res = await fetch(`http://localhost:8082/api/admin/disputes/${selectedDispute.id}/message`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disputeMessageInput)
      });
      if (res.ok) {
        const updated = await res.json();
        setDisputesList(prev => prev.map(d => d.id === updated.id ? updated : d));
        setSelectedDispute(updated);
        setDisputeMessageInput('');
      }
    } catch (e) {
      console.error("Error saving dispute message:", e);
    }
  };

  const renderDisputeDetail = () => {
    const buyerEvidence = {
      uploadedBy: selectedDispute.buyerName || 'Ayodya Senavirathne',
      date: 'May 16, 2026',
      images: [vaseImg],
      count: 1
    };

    const sellerEvidence = {
      uploadedBy: selectedDispute.sellerName || 'Silk Waves',
      date: 'May 17, 2026',
      files: [
        { name: 'product_packaging_video.mp4', size: '14.5 MB', type: 'video' },
        { name: 'courier_receipt.pdf', size: '1.2 MB', type: 'document' }
      ]
    };

    const defaultMessages = [
      { sender: selectedDispute.buyerName || 'Ayodya Senavirathne', role: 'Buyer', time: 'May 16, 2026, 10:15 AM', content: 'The item arrived with a crack on the base. I request a full refund.', type: 'buyer' },
      { sender: selectedDispute.sellerName || 'Silk Waves', role: 'Seller', time: 'May 16, 2026, 2:30 PM', content: 'We package all items securely in bubble wrap. This damage must have occurred during transit.', type: 'seller' },
      { sender: 'System Auto-Escalation', role: 'System', time: 'May 17, 2026, 9:00 AM', content: 'Dispute auto-escalated to admin review due to seller and buyer disagreement.', type: 'system' }
    ];

    const messages = selectedDispute.messagesJson ? JSON.parse(selectedDispute.messagesJson) : defaultMessages;

    const handleDownloadBuyerEvidence = async () => {
      try {
        // Convert each image to a base64 data URL so it can be embedded in the PDF
        const imageDataUrls = await Promise.all(
          buyerEvidence.images.map(async (imgUrl) => {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          })
        );

        const imagesHtml = imageDataUrls.map((dataUrl, i) => `
          <div class="image-block">
            <div class="image-label">Evidence Image ${i + 1} of ${imageDataUrls.length}</div>
            <img src="${dataUrl}" alt="Buyer Evidence ${i + 1}" class="evidence-img" />
          </div>
        `).join('');

        const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Buyer Evidence — Lanka Loom Dispute ${selectedDispute.disputeNumber || '#1234'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; background: #fff; padding: 48px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 24px; border-bottom: 3px solid #5D4037; margin-bottom: 32px; }
    .logo { font-size: 22px; font-weight: 800; color: #4A3E31; letter-spacing: 2px; }
    .badge { background: #E3F2FD; color: #1565C0; border: 1px solid #90CAF9; border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: 700; }
    h1 { font-size: 20px; font-weight: 700; color: #3E2723; margin-bottom: 6px; }
    .subtitle { font-size: 13px; color: #888; margin-bottom: 32px; }
    .section-title { font-size: 11px; font-weight: 700; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #F1E6DA; padding-bottom: 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 40px; margin-bottom: 32px; }
    .field label { font-size: 11px; color: #aaa; display: block; margin-bottom: 3px; }
    .field span { font-size: 14px; font-weight: 600; color: #333; }
    .image-block { margin-bottom: 28px; page-break-inside: avoid; }
    .image-label { font-size: 11px; color: #888; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .evidence-img { width: 100%; max-width: 480px; height: auto; border-radius: 8px; border: 1px solid #eee; display: block; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #eee; font-size: 11px; color: #bbb; display: flex; justify-content: space-between; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">LANKA CRAFT</div>
    <div class="badge">Buyer Evidence</div>
  </div>
  <h1>Buyer's Evidence — Dispute ${selectedDispute.disputeNumber || '#1234'}</h1>
  <div class="subtitle">Downloaded ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>

  <div class="section-title">Dispute Information</div>
  <div class="grid">
    <div class="field"><label>Dispute Number</label><span>${selectedDispute.disputeNumber || '#1234'}</span></div>
    <div class="field"><label>Order Number</label><span>${selectedDispute.orderNumber || '#ORD1234'}</span></div>
    <div class="field"><label>Dispute Reason</label><span>${selectedDispute.reason || 'Item not as described'}</span></div>
    <div class="field"><label>Status</label><span>${selectedDispute.status || 'Pending'}</span></div>
    <div class="field"><label>Buyer Name</label><span>${selectedDispute.buyerName || 'N/A'}</span></div>
    <div class="field"><label>Item Name</label><span>${selectedDispute.itemName || 'N/A'}</span></div>
    <div class="field"><label>Upload Date</label><span>${buyerEvidence.date}</span></div>
    <div class="field"><label>Total Images</label><span>${imageDataUrls.length}</span></div>
  </div>

  <div class="section-title">Evidence Images</div>
  ${imagesHtml}

  <div class="footer">
    <span>Lanka Craft Admin Portal — Confidential Buyer Evidence</span>
    <span>Generated: ${new Date().toLocaleString()}</span>
  </div>

  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');

        if (!printWindow) {
          window.URL.revokeObjectURL(url);
          Swal.fire({ icon: 'warning', title: 'Popup Blocked', text: 'Please allow popups for this site to enable PDF downloads.', confirmButtonColor: '#5D4037' });
          return;
        }

        setTimeout(() => window.URL.revokeObjectURL(url), 8000);

        Swal.fire({
          icon: 'success',
          title: 'PDF Ready',
          html: `<span style="font-size:13px;">The print dialog has opened.<br/>Select <strong>Save as PDF</strong> to download the buyer evidence report.</span>`,
          confirmButtonColor: '#5D4037',
          timer: 3500
        });

      } catch (error) {
        console.error('Error generating buyer evidence PDF:', error);
        Swal.fire({ icon: 'error', title: 'Download Failed', text: 'Could not generate the PDF. Please try again.', confirmButtonColor: '#5D4037' });
      }
    };

    const handlePreviewFile = (file) => {
      const isVideo = file.type === 'video';
      Swal.fire({
        title: '',
        html: `
          <div style="font-family: 'Inter', sans-serif; text-align: left;">
            <div style="display: flex; align-items: center; gap: 12px; padding: 16px 0 12px 0; border-bottom: 1px solid #eee; margin-bottom: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 8px; background: ${isVideo ? '#E3F2FD' : '#FFEBEE'}; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                ${isVideo ? '🎬' : '📄'}
              </div>
              <div>
                <div style="font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 2px;">${file.name}</div>
                <div style="font-size: 12px; color: #999;">${isVideo ? 'Video File (MP4)' : 'PDF Document'} &nbsp;·&nbsp; ${file.size}</div>
              </div>
            </div>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 16px;">
              <tr><td style="padding: 8px 0; color: #888; width: 45%;">Uploaded By</td><td style="color: #333; font-weight: 600;">${selectedDispute.sellerName || 'Silk Waves'}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Upload Date</td><td style="color: #333; font-weight: 600;">May 17, 2026</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Related Dispute</td><td style="color: #333; font-weight: 600;">${selectedDispute.disputeNumber || '#1234'}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Related Order</td><td style="color: #333; font-weight: 600;">${selectedDispute.orderNumber || '#ORD1234'}</td></tr>
            </table>
            <div style="padding: 28px; background: #f8f9fa; border-radius: 10px; border: 2px dashed #ddd; text-align: center;">
              <div style="font-size: 38px; margin-bottom: 10px;">${isVideo ? '🎬' : '📋'}</div>
              <div style="font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px;">${isVideo ? 'Video Evidence Preview' : 'Document Evidence Preview'}</div>
              <div style="font-size: 12px; color: #999; line-height: 1.6;">${isVideo ? 'Seller packaging & handling video.<br/>Download to view the full recording.' : 'Courier shipping receipt & tracking document.<br/>Download to view the full PDF.'}</div>
            </div>
          </div>
        `,
        confirmButtonText: '⬇ Download as PDF',
        confirmButtonColor: '#5D4037',
        showCancelButton: true,
        cancelButtonText: 'Close',
        cancelButtonColor: '#9e9e9e'
      }).then((result) => {
        if (result.isConfirmed) {
          handleDownloadSellerFile(file);
        }
      });
    };

    const handleDownloadSellerFile = (file) => {
      const pdfFileName = file.name.replace(/\.[^.]+$/, '') + '.pdf';
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${file.name} — Lanka Loom Evidence</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; background: #fff; padding: 48px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 24px; border-bottom: 3px solid #5D4037; margin-bottom: 32px; }
    .logo { font-size: 22px; font-weight: 800; color: #4A3E31; letter-spacing: 2px; }
    .badge { background: #FFF3E0; color: #E65100; border: 1px solid #FFCC80; border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: 700; }
    h1 { font-size: 20px; font-weight: 700; color: #3E2723; margin-bottom: 6px; }
    .subtitle { font-size: 13px; color: #888; margin-bottom: 32px; }
    .section-title { font-size: 11px; font-weight: 700; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #F1E6DA; padding-bottom: 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 40px; margin-bottom: 32px; }
    .field label { font-size: 11px; color: #aaa; display: block; margin-bottom: 3px; }
    .field span { font-size: 14px; font-weight: 600; color: #333; }
    .content-box { background: #FFF8F6; border: 1px solid #F1E6DA; border-radius: 8px; padding: 20px; margin-bottom: 32px; }
    .content-box p { font-size: 13px; line-height: 1.8; color: #555; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #eee; font-size: 11px; color: #bbb; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">LANKA CRAFT</div>
    <div class="badge">Evidence Document</div>
  </div>
  <h1>${file.name}</h1>
  <div class="subtitle">Dispute Evidence — Downloaded ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>

  <div class="section-title">Dispute Information</div>
  <div class="grid">
    <div class="field"><label>Dispute Number</label><span>${selectedDispute.disputeNumber || '#1234'}</span></div>
    <div class="field"><label>Order Number</label><span>${selectedDispute.orderNumber || '#ORD1234'}</span></div>
    <div class="field"><label>Dispute Reason</label><span>${selectedDispute.reason || 'Item not as described'}</span></div>
    <div class="field"><label>Dispute Status</label><span>${selectedDispute.status || 'Pending'}</span></div>
    <div class="field"><label>Buyer Name</label><span>${selectedDispute.buyerName || 'N/A'}</span></div>
    <div class="field"><label>Seller Name</label><span>${selectedDispute.sellerName || 'N/A'}</span></div>
    <div class="field"><label>Item Name</label><span>${selectedDispute.itemName || 'N/A'}</span></div>
    <div class="field"><label>Desired Outcome</label><span>${selectedDispute.outcome || 'N/A'}</span></div>
  </div>

  <div class="section-title">Evidence File Details</div>
  <div class="grid" style="margin-bottom: 32px;">
    <div class="field"><label>File Name</label><span>${file.name}</span></div>
    <div class="field"><label>File Size</label><span>${file.size}</span></div>
    <div class="field"><label>File Type</label><span>${file.type === 'video' ? 'Video Evidence (MP4)' : 'PDF Document'}</span></div>
    <div class="field"><label>Uploaded By</label><span>${selectedDispute.sellerName || 'Silk Waves'}</span></div>
    <div class="field"><label>Upload Date</label><span>May 17, 2026</span></div>
    <div class="field"><label>Download Date</label><span>${new Date().toLocaleDateString()}</span></div>
  </div>

  <div class="section-title">Notes</div>
  <div class="content-box">
    <p>This evidence file was submitted by the seller as part of the dispute resolution process for Dispute ${selectedDispute.disputeNumber || '#1234'}. The file has been securely stored and is available for review by the Lanka Craft administration team. Please refer to the dispute management portal for full case details.</p>
  </div>

  <div class="footer">
    <span>Lanka Craft Admin Portal — Confidential Dispute Evidence</span>
    <span>Generated: ${new Date().toLocaleString()}</span>
  </div>

  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const printWindow = window.open(url, '_blank');

      if (!printWindow) {
        window.URL.revokeObjectURL(url);
        Swal.fire({ icon: 'warning', title: 'Popup Blocked', text: 'Please allow popups for this site to enable PDF downloads.', confirmButtonColor: '#5D4037' });
        return;
      }

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 5000);

      Swal.fire({
        icon: 'success',
        title: 'PDF Ready',
        html: `<span style="font-size:13px;">The print dialog has opened.<br/>Select <strong>Save as PDF</strong> to download <strong>${pdfFileName}</strong>.</span>`,
        confirmButtonColor: '#5D4037',
        timer: 3000
      });
    };

    return (
      <div className="dispute-detail-view">
        <div className="admin-view-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setSelectedDispute(null)}>
            <ChevronLeft size={24} />
            <h2>Dispute Resolution Center</h2>
          </div>
        </div>
        <div className="dispute-detail-header-card">
          <span className="dispute-id-label">Dispute {selectedDispute.disputeNumber || `#${selectedDispute.id}`}</span>
          <h3 className="dispute-title-large">{selectedDispute.reason}</h3>
          <span className={`status-badge ${(selectedDispute.status || 'pending').toLowerCase().replace(' ', '-')}`} style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
            {selectedDispute.status || 'Pending'}
          </span>
        </div>
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
                  <div className="evidence-footer"><span>{buyerEvidence.count} images files</span><div className="download-link" onClick={handleDownloadBuyerEvidence} style={{ cursor: 'pointer' }}><Download size={14} /> Download All</div></div>
                  <div className="admin-comments-section">
                    <h5>Admin Comments</h5>
                    {selectedDispute.adminComment && (
                      <div className="admin-comment-bubble" style={{
                        backgroundColor: '#efebe9',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        fontSize: '13px',
                        color: '#4e342e',
                        borderLeft: '4px solid #5d4037',
                        position: 'relative',
                        textAlign: 'left'
                      }}>
                        <p style={{ margin: 0, fontWeight: '500' }}>{selectedDispute.adminComment}</p>
                        <span style={{ fontSize: '10px', color: '#8d6e63', display: 'block', marginTop: '4px' }}>Posted by Admin</span>
                      </div>
                    )}
                    <div className="admin-comment-box">
                      <input 
                        type="text" 
                        placeholder="Add a comment on Buyer's Evidence......" 
                        value={disputeCommentInput}
                        onChange={(e) => setDisputeCommentInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendComment(); }}
                      />
                      <Send size={16} className="send-btn" onClick={handleSendComment} style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                </div>
                <div className="evidence-block">
                  <h4>Seller's Evidence</h4>
                  <p>Uploaded by {sellerEvidence.uploadedBy} on {sellerEvidence.date}</p>
                  <div className="file-list">
                    {sellerEvidence.files.map((file, i) => (
                      <div className="file-item" key={i}>
                        <div className="file-info"><div className={`file-icon ${file.type === 'video' ? 'video' : ''}`}>{file.type === 'video' ? <Video size={18} /> : <FileIcon size={18} />}</div><div className="file-details"><h6>{file.name}</h6><span>{file.size}</span></div></div>
                        <div className="file-actions">
                          <Eye size={16} onClick={() => handlePreviewFile(file)} style={{ cursor: 'pointer' }} />
                          <Download size={16} onClick={() => handleDownloadSellerFile(file)} style={{ cursor: 'pointer' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : disputeTab === 'Communication' ? (
              <div className="communication-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12px', color: '#aaa', fontWeight: '500' }}>{[...messages].reverse().length} messages</span>
                  <span style={{ fontSize: '11px', color: '#bbb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                    Newest first
                  </span>
                </div>
                <div className="message-thread" style={{ overflowY: 'auto', maxHeight: '360px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[...messages].reverse().map((m, i) => (
                    <div className="message-item" key={i} style={{ opacity: i === 0 ? 1 : 0.92 }}>
                      <div className={`message-avatar ${m.type}`}>
                        {m.type === 'buyer' ? <User size={18} /> : m.type === 'seller' ? <Store size={18} /> : m.type === 'admin' ? <Gavel size={18} /> : <Info size={18} />}
                      </div>
                      <div className="message-content-wrapper">
                        <div className="message-header"><div className="sender-info">{m.sender}<span className="sender-role">({m.role})</span></div><span className="message-time">{m.time}</span></div>
                        <div className={`message-bubble ${m.type === 'system' ? 'admin-note' : m.type === 'admin' ? 'admin-message' : ''}`}>{m.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="admin-message-input-bar" style={{ display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="Type a mediation message to the thread..." 
                    value={disputeMessageInput}
                    onChange={(e) => setDisputeMessageInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '20px',
                      border: '1px solid #ccc',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <button 
                    onClick={handleSendMessage}
                    style={{
                      backgroundColor: '#5D4037',
                      color: '#FFF',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#4E342E'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#5D4037'}
                  >
                    <Send size={14} />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h4>Case Details</h4>
                <div className="case-details-grid">
                  <div className="detail-item"><label>Buyer</label><span>{selectedDispute.buyerName || selectedDispute.buyer || 'N/A'}</span></div>
                  <div className="detail-item"><label>Seller</label><span>{selectedDispute.sellerName || selectedDispute.seller || 'N/A'}</span></div>
                  <div className="detail-item"><label>Item</label><span>{selectedDispute.itemName || selectedDispute.item || 'N/A'}</span></div>
                  <div className="detail-item"><label>Order ID</label><span>{selectedDispute.orderNumber || selectedDispute.orderId || 'N/A'}</span></div>
                  <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Dispute Reason</label><span>{selectedDispute.reason || 'N/A'}</span></div>
                  <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Desired Outcome</label><span>{selectedDispute.outcome || 'N/A'}</span></div>
                </div>
              </>
            )}
          </div>
          <div className="action-info-group">
            <div className="detail-section-card">
              <h4>Action & Info</h4>

              {/* Mediation Tools */}
              <div className="action-sub-group">
                <label>Mediation Tools</label>
                <button
                  className="btn-primary-blue"
                  onClick={async () => {
                    const { value: messageText, isConfirmed } = await Swal.fire({
                      title: 'Send Mediation Message',
                      html: `<p style="font-size:13px;color:#666;margin-bottom:12px;">Type a message to send directly to the dispute communication thread. Both parties will be notified.</p>`,
                      input: 'textarea',
                      inputPlaceholder: 'Type your mediation message here...',
                      inputAttributes: { rows: 4, style: 'font-size:13px;resize:none;' },
                      confirmButtonText: 'Send Message',
                      confirmButtonColor: '#4285F4',
                      showCancelButton: true,
                      cancelButtonColor: '#9e9e9e',
                      inputValidator: (value) => { if (!value?.trim()) return 'Please enter a message.' }
                    });
                    if (isConfirmed && messageText?.trim()) {
                      try {
                        const res = await fetch(`http://localhost:8082/api/admin/disputes/${selectedDispute.id}/message`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(messageText.trim())
                        });
                        if (res.ok) {
                          const updated = await res.json();
                          setDisputesList(prev => prev.map(d => d.id === updated.id ? updated : d));
                          setSelectedDispute(updated);
                          setDisputeTab('Communication');
                          Swal.fire({ icon: 'success', title: 'Message Sent', text: 'Your message has been posted to the communication thread.', confirmButtonColor: '#4285F4', timer: 2000 });
                        }
                      } catch (e) { console.error('Error sending message:', e); }
                    }
                  }}
                  title="Send a mediation message to the dispute thread"
                >
                  <Send size={16} /> Send Message
                </button>
                <div
                  className="request-info-link"
                  style={{ cursor: 'pointer' }}
                  onClick={async () => {
                    const { value: infoRequest, isConfirmed } = await Swal.fire({
                      title: 'Request More Information',
                      html: `<p style="font-size:13px;color:#666;margin-bottom:12px;">Send an official request to <strong>${selectedDispute.buyerName}</strong> and <strong>${selectedDispute.sellerName}</strong> for additional evidence or clarification.</p>`,
                      input: 'textarea',
                      inputPlaceholder: 'Describe what additional information or evidence is needed...',
                      inputAttributes: { rows: 4, style: 'font-size:13px;resize:none;' },
                      confirmButtonText: 'Send Request',
                      confirmButtonColor: '#4285F4',
                      showCancelButton: true,
                      cancelButtonColor: '#9e9e9e',
                      inputValidator: (value) => { if (!value?.trim()) return 'Please enter a request message.' }
                    });
                    if (isConfirmed && infoRequest?.trim()) {
                      const message = `[Info Request] ${infoRequest.trim()}`;
                      try {
                        const res = await fetch(`http://localhost:8082/api/admin/disputes/${selectedDispute.id}/message`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(message)
                        });
                        if (res.ok) {
                          const updated = await res.json();
                          setDisputesList(prev => prev.map(d => d.id === updated.id ? updated : d));
                          setSelectedDispute(updated);
                          setDisputeTab('Communication');
                          Swal.fire({ icon: 'success', title: 'Request Sent', text: 'Your information request has been added to the communication thread.', confirmButtonColor: '#4285F4', timer: 2000 });
                        }
                      } catch (e) { console.error('Error sending info request:', e); }
                    }
                  }}
                >
                  <Info size={14} /> Request More Info
                </div>
              </div>

              {/* Make a Decision */}
              <div className="action-sub-group" style={{ marginTop: '20px' }}>
                <label>Make a Decision</label>
                {selectedDispute.status === 'Resolved' ? (
                  <div style={{ padding: '12px', background: '#E8F5E9', borderRadius: '8px', border: '1px solid #A5D6A7' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#2E7D32', marginBottom: '4px' }}>✓ Dispute Resolved</div>
                    <div style={{ fontSize: '12px', color: '#388E3C' }}>Outcome: {selectedDispute.outcome}</div>
                  </div>
                ) : (
                  <>
                    <button
                      className="btn-decision-buyer"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: 'Rule in Favor of Buyer?',
                          html: `<p style="font-size:13px;color:#555;">This will mark the dispute as <strong>Resolved</strong> with outcome <strong>"Full Refund"</strong> for <strong>${selectedDispute.buyerName}</strong>.<br/><br/>This action cannot be undone.</p>`,
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: '✓ Confirm Decision',
                          confirmButtonColor: '#4CAF50',
                          cancelButtonColor: '#9e9e9e'
                        });
                        if (result.isConfirmed) {
                          await handleDisputeDecision('Full Refund');
                          Swal.fire({ icon: 'success', title: 'Decision Recorded', text: 'Dispute resolved in favor of the Buyer. Full refund will be processed.', confirmButtonColor: '#4CAF50', timer: 2500 });
                        }
                      }}
                    >
                      <ThumbsUp size={16} /> Rule in Favor of Buyer
                    </button>
                    <button
                      className="btn-decision-seller"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: 'Rule in Favor of Seller?',
                          html: `<p style="font-size:13px;color:#555;">This will mark the dispute as <strong>Resolved</strong> with outcome <strong>"Dismissed"</strong> in favor of <strong>${selectedDispute.sellerName}</strong>.<br/><br/>This action cannot be undone.</p>`,
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: '✓ Confirm Decision',
                          confirmButtonColor: '#333',
                          cancelButtonColor: '#9e9e9e'
                        });
                        if (result.isConfirmed) {
                          await handleDisputeDecision('Dismissed');
                          Swal.fire({ icon: 'success', title: 'Decision Recorded', text: 'Dispute resolved in favor of the Seller. Case has been dismissed.', confirmButtonColor: '#333', timer: 2500 });
                        }
                      }}
                    >
                      <ThumbsDown size={16} /> Rule in Favor of Seller
                    </button>
                  </>
                )}
              </div>

              {/* Related Information */}
              <div className="action-sub-group" style={{ marginTop: '20px' }}>
                <label>Related Information</label>
                <div className="related-links-list">
                  <div 
                    className="related-link" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const buyerUser = usersList.find(u => u.name?.toLowerCase() === selectedDispute.buyerName?.toLowerCase());
                      const bName = buyerUser ? buyerUser.name : (selectedDispute.buyerName || 'N/A');
                      const bEmail = buyerUser ? buyerUser.email : 'buyer@example.com';
                      const bRole = buyerUser ? buyerUser.role : 'Buyer';
                      const bRegDate = buyerUser ? buyerUser.registrationDate : 'May 10, 2026';
                      const bStatus = buyerUser ? buyerUser.status : 'Active';

                      Swal.fire({
                        title: 'Buyer Profile',
                        html: `
                          <div style="text-align: left; font-size: 14px; color: #555; padding: 10px 0;">
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Full Name:</strong> <span style="float: right; font-weight: 600;">${bName}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Email Address:</strong> <span style="float: right;">${bEmail}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Role:</strong> <span style="float: right; background: #e3f2fd; color: #1565c0; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">${bRole}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Member Since:</strong> <span style="float: right;">${bRegDate}</span>
                            </div>
                            <div style="margin-bottom: 5px;">
                              <strong style="color: #3e2723;">Account Status:</strong> <span style="float: right; background: ${bStatus === 'Active' ? '#e8f5e9' : '#ffebee'}; color: ${bStatus === 'Active' ? '#2e7d32' : '#c62828'}; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">${bStatus}</span>
                            </div>
                          </div>
                        `,
                        confirmButtonText: 'Done',
                        confirmButtonColor: '#5D4037'
                      });
                    }}
                  >
                    <User size={14} /> View Buyer's Profile
                  </div>
                  <div 
                    className="related-link" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const sellerObj = sellersList.find(s => s.name?.toLowerCase() === selectedDispute.sellerName?.toLowerCase());
                      const sName = sellerObj ? sellerObj.name : (selectedDispute.sellerName || 'N/A');
                      const sProducts = sellerObj ? sellerObj.productsCount : '12';
                      const sSales = sellerObj ? `LKR ${sellerObj.totalSales?.toLocaleString()}` : 'LKR 45,000';
                      const sRegDate = sellerObj ? sellerObj.registrationDate : 'April 20, 2026';
                      const sStatus = sellerObj ? sellerObj.status : 'Active';

                      Swal.fire({
                        title: 'Seller Profile',
                        html: `
                          <div style="text-align: left; font-size: 14px; color: #555; padding: 10px 0;">
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Shop Name:</strong> <span style="float: right; font-weight: 600;">${sName}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Total Products:</strong> <span style="float: right; font-weight: 600; color: #8d6e63;">${sProducts}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Total Sales:</strong> <span style="float: right; font-weight: 600; color: #2e7d32;">${sSales}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Seller Since:</strong> <span style="float: right;">${sRegDate}</span>
                            </div>
                            <div style="margin-bottom: 5px;">
                              <strong style="color: #3e2723;">Verification Status:</strong> <span style="float: right; background: ${sStatus === 'Active' ? '#e8f5e9' : '#fff3e0'}; color: ${sStatus === 'Active' ? '#2e7d32' : '#e65100'}; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">${sStatus}</span>
                            </div>
                          </div>
                        `,
                        confirmButtonText: 'Done',
                        confirmButtonColor: '#5D4037'
                      });
                    }}
                  >
                    <User size={14} /> View Seller's Profile
                  </div>
                  <div 
                    className="related-link" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const productObj = productsList.find(p => p.name?.toLowerCase() === selectedDispute.itemName?.toLowerCase());
                      const pName = productObj ? productObj.name : (selectedDispute.itemName || 'N/A');
                      const pCategory = productObj ? productObj.category : 'Handicrafts';
                      const pPrice = productObj ? `LKR ${productObj.price?.toLocaleString()}` : 'LKR 4,200';
                      const pSku = productObj ? productObj.sku : 'SKU-VASE-101';
                      const pStock = productObj ? productObj.stock : '15';
                      const pStatus = productObj ? productObj.status : 'Active';

                      Swal.fire({
                        title: 'Product Information',
                        html: `
                          <div style="text-align: left; font-size: 14px; color: #555; padding: 10px 0;">
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Product Name:</strong> <span style="float: right; font-weight: 600;">${pName}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">SKU Code:</strong> <span style="float: right; font-family: monospace; font-size: 12px;">${pSku}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Category:</strong> <span style="float: right;">${pCategory}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Unit Price:</strong> <span style="float: right; font-weight: 600; color: #2e7d32;">${pPrice}</span>
                            </div>
                            <div style="margin-bottom: 10px; border-bottom: 1px solid #f1e6da; padding-bottom: 8px;">
                              <strong style="color: #3e2723;">Available Stock:</strong> <span style="float: right; font-weight: 600;">${pStock} units</span>
                            </div>
                            <div style="margin-bottom: 5px;">
                              <strong style="color: #3e2723;">Listing Status:</strong> <span style="float: right; background: ${pStatus === 'Active' ? '#e8f5e9' : '#fff3e0'}; color: ${pStatus === 'Active' ? '#2e7d32' : '#e65100'}; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;">${pStatus}</span>
                            </div>
                          </div>
                        `,
                        confirmButtonText: 'Done',
                        confirmButtonColor: '#5D4037'
                      });
                    }}
                  >
                    <Package size={14} /> View Product Page
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDisputeResolution = () => {
    const uniqueSellers = ['All Sellers', ...new Set(disputesList.map(d => d.sellerName).filter(Boolean))];
    const statuses = ['All Status', 'Pending', 'Escalated', 'Resolved'];

    const filteredDisputes = disputesList.filter(dispute => {
      // 1. Status Filter
      if (disputeStatusFilter !== 'All Status') {
        if ((dispute.status || '').toLowerCase() !== disputeStatusFilter.toLowerCase()) return false;
      }

      // 2. Seller Filter
      if (disputeSeller !== 'All Sellers') {
        if (dispute.sellerName !== disputeSeller) return false;
      }

      // 3. Search Filter
      if (disputeSearch.trim() !== '') {
        const q = disputeSearch.toLowerCase();
        const dispNo = (dispute.disputeNumber || '').toLowerCase();
        const reason = (dispute.reason || '').toLowerCase();
        const bName = (dispute.buyerName || '').toLowerCase();
        const sName = (dispute.sellerName || '').toLowerCase();
        const ordNo = (dispute.orderNumber || '').toLowerCase();
        const iName = (dispute.itemName || '').toLowerCase();
        
        if (
          !dispNo.includes(q) &&
          !reason.includes(q) &&
          !bName.includes(q) &&
          !sName.includes(q) &&
          !ordNo.includes(q) &&
          !iName.includes(q)
        ) {
          return false;
        }
      }

      return true;
    });

    return (
      <div className="dispute-resolution-view">
        <div className="admin-view-header"><h2>Dispute Resolution Center</h2></div>
        <div className="filters-bar" style={{ justifyContent: 'space-between', gap: '15px' }}>
          <div className="search-bar-container" style={{ maxWidth: '400px' }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search dispute #, reason, customer, seller..." 
              value={disputeSearch}
              onChange={(e) => setDisputeSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <select 
              className="filter-select"
              value={disputeStatusFilter}
              onChange={(e) => setDisputeStatusFilter(e.target.value)}
            >
              {statuses.map((status, i) => (
                <option key={i} value={status}>{status}</option>
              ))}
            </select>
            <select 
              className="filter-select"
              value={disputeSeller}
              onChange={(e) => setDisputeSeller(e.target.value)}
            >
              {uniqueSellers.map((seller, i) => (
                <option key={i} value={seller}>{seller}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="refund-card-grid" style={{ marginTop: '20px' }}>
          {filteredDisputes.length > 0 ? (
            filteredDisputes.map((dispute, index) => (
              <div className="dispute-card" key={index}>
                <h4>Dispute {dispute.disputeNumber} - {dispute.orderNumber}</h4>
                <p className="dispute-reason">{dispute.reason}</p>
                <div className="dispute-info">
                  <span>Item: {dispute.itemName}</span>
                  <span>Buyer: {dispute.buyerName}</span>
                </div>
                <div className="dispute-footer">
                  <span className={`status-badge ${dispute.status.toLowerCase()}`}>{dispute.status}</span>
                  <div className="view-details-link" onClick={() => setSelectedDispute(dispute)}>
                    <Eye size={14} />
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-records-message" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', color: '#999', fontSize: '14px', fontWeight: '500', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <span>No disputes found matching your criteria.</span>
              {(disputeSearch || disputeSeller !== 'All Sellers' || disputeStatusFilter !== 'All Status') && (
                <button 
                  onClick={() => { setDisputeSearch(''); setDisputeSeller('All Sellers'); setDisputeStatusFilter('All Status'); }}
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

  const renderSystemSettings = () => {
    const handleInputChange = (field, value) => {
      setSystemSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleToggleChange = async (field, currentValue) => {
      const updated = { ...systemSettings, [field]: !currentValue };
      setSystemSettings(updated);
      const success = await updateSystemSettings(updated);
      if (success) {
        Swal.fire({
          icon: 'success',
          title: field === 'maintenanceMode' ? 'Maintenance Mode Updated' : 'Caching Setting Updated',
          text: `System configuration has been updated successfully in the database.`,
          confirmButtonColor: '#5D4037',
          timer: 1500,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });
      }
    };

    const handleSelectChange = async (field, value) => {
      const updated = { ...systemSettings, [field]: value };
      setSystemSettings(updated);
      const success = await updateSystemSettings(updated);
      if (success) {
        let label = '';
        if (field === 'defaultCurrency') label = 'Currency Updated';
        else if (field === 'defaultLanguage') label = 'Language Updated';
        else if (field === 'timeZone') label = 'Time Zone Updated';

        Swal.fire({
          icon: 'success',
          title: label,
          text: `Localization setting updated to "${value}" in database in real-time.`,
          confirmButtonColor: '#5D4037',
          timer: 1500,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });
      }
    };

    return (
      <div className="system-settings-view">
        <div className="admin-view-header"><h2>{translate('System Settings')}</h2></div>
        <div className="settings-container">
          {/* Site Information */}
          <div className="settings-card">
            <div className="settings-card-header"><h3>{translate('General Settings')}</h3></div>
            <div className="settings-card-body">
              <div className="settings-group">
                <label>{translate('Site Title')}</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={systemSettings.siteTitle || ''} 
                  onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                />
              </div>
              <div className="settings-group">
                <label>{translate('Tagline')}</label>
                <input 
                  type="text" 
                  className="settings-input" 
                  value={systemSettings.tagline || ''} 
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                />
              </div>
              <div className="settings-group">
                <label>{translate('Admin Email')}</label>
                <input 
                  type="email" 
                  className="settings-input" 
                  value={systemSettings.adminEmail || ''} 
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                />
              </div>
              <div className="settings-group">
                <label>Site Logo</label>
                <div className="logo-section">
                  <div className="logo-preview">
                    {systemSettings.logoUrl ? (
                      <img src={systemSettings.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : 'Logo'}
                  </div>
                  <button 
                    className="upload-btn"
                    onClick={async () => {
                      const { value: url } = await Swal.fire({
                        title: 'Upload Site Logo',
                        input: 'url',
                        inputLabel: 'Logo Image URL',
                        inputPlaceholder: 'Enter absolute logo image URL...',
                        confirmButtonColor: '#5D4037',
                        showCancelButton: true
                      });
                      if (url) {
                        const updated = { ...systemSettings, logoUrl: url };
                        setSystemSettings(updated);
                        await updateSystemSettings(updated);
                        Swal.fire({ icon: 'success', title: 'Logo Updated', confirmButtonColor: '#5D4037', timer: 1500 });
                      }
                    }}
                  >
                    Upload New Logo
                  </button>
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn-primary-blue"
                  style={{ backgroundColor: '#5D4037', color: '#FFF', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                  onClick={async () => {
                    const success = await updateSystemSettings(systemSettings);
                    if (success) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Settings Saved',
                        text: 'Site Information has been successfully saved to the database.',
                        confirmButtonColor: '#5D4037',
                        timer: 2000
                      });
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Save Failed',
                        text: 'Could not save settings. Please check backend status.',
                        confirmButtonColor: '#5D4037'
                      });
                    }
                  }}
                >
                  {translate('Save System Settings')}
                </button>
              </div>
            </div>
          </div>

          {/* Maintenance & Performance */}
          <div className="settings-card">
            <div className="settings-card-header"><h3>{translate('System Settings')}</h3></div>
            <div className="settings-card-body">
              <div className="settings-toggle-row">
                <div className="toggle-info">
                  <h4>{translate('Maintenance Mode')}</h4>
                  <p>Puts the storefront in maintenance mode. Admins can still access the site.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={!!systemSettings.maintenanceMode} 
                    onChange={() => handleToggleChange('maintenanceMode', !!systemSettings.maintenanceMode)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="settings-toggle-row">
                <div className="toggle-info">
                  <h4>{translate('Caching Status')}</h4>
                  <p>Improves site performance by caching pages. Recommended for production.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={!!systemSettings.cachingEnabled} 
                    onChange={() => handleToggleChange('cachingEnabled', !!systemSettings.cachingEnabled)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Localization */}
          <div className="settings-card">
            <div className="settings-card-header"><h3>{translate('System & Localization')}</h3></div>
            <div className="settings-card-body">
              <div className="localization-grid">
                <div className="settings-group">
                  <label>{translate('Default Currency')}</label>
                  <select 
                    className="settings-input"
                    value={systemSettings.defaultCurrency || 'SL Rupee (LKR)'}
                    onChange={(e) => handleSelectChange('defaultCurrency', e.target.value)}
                  >
                    <option value="SL Rupee (LKR)">SL Rupee (LKR)</option>
                    <option value="US Dollar (USD)">US Dollar (USD)</option>
                    <option value="Euro (EUR)">Euro (EUR)</option>
                  </select>
                </div>
                <div className="settings-group">
                  <label>{translate('Default Language')}</label>
                  <select 
                    className="settings-input"
                    value={systemSettings.defaultLanguage || 'English'}
                    onChange={(e) => handleSelectChange('defaultLanguage', e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
              </div>
              <div className="settings-group">
                <label>{translate('Time Zone')}</label>
                <select 
                  className="settings-input"
                  value={systemSettings.timeZone || 'Asia/Colombo (UTC+5.30)'}
                  onChange={(e) => handleSelectChange('timeZone', e.target.value)}
                >
                  <option value="Asia/Colombo (UTC+5.30)">Asia/Colombo (UTC+5.30)</option>
                  <option value="UTC (UTC+0.00)">UTC (UTC+0.00)</option>
                  <option value="Asia/Kolkata (UTC+5.30)">Asia/Kolkata (UTC+5.30)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getNotifications = () => {
    const notifications = [];
    
    // 1. Pending Products
    const pendingProducts = productsList.filter(p => p.status === 'Pending');
    pendingProducts.forEach(p => {
      notifications.push({
        id: `prod-${p.id}`,
        title: 'Product Pending',
        desc: `"${p.name}" requires admin review.`,
        time: 'Pending',
        targetTab: 'Product Approval'
      });
    });

    // 2. Escalated Disputes
    const escalatedDisputes = disputesList.filter(d => d.status === 'Escalated');
    escalatedDisputes.forEach(d => {
      notifications.push({
        id: `disp-${d.id}`,
        title: 'Dispute Escalated',
        desc: `Dispute #${d.disputeNumber} requires immediate action.`,
        time: 'Urgent',
        targetTab: 'Dispute Resolution'
      });
    });

    // 3. Pending Refunds
    const pendingRefunds = refundsList.filter(r => r.status === 'Pending' || r.status === 'Processing');
    pendingRefunds.forEach(r => {
      notifications.push({
        id: `ref-${r.id}`,
        title: 'Refund Requested',
        desc: `LKR ${r.amount?.toLocaleString()} for Order #${r.orderNumber}.`,
        time: r.status || 'Active',
        targetTab: 'Refund Workflow'
      });
    });

    return notifications;
  };

  const translate = (text) => {
    const lang = systemSettings.defaultLanguage || 'English';
    if (lang === 'English') return text;
    
    const dict = {
      // Sidebar Navigation
      'Dashboard': {
        'Sinhala': 'පාලන පුවරුව',
        'Tamil': 'டாஷ்போர்டு'
      },
      'User Management': {
        'Sinhala': 'පරිශීලක කළමනාකරණය',
        'Tamil': 'பயனர் மேலாண்மை'
      },
      'Seller Management': {
        'Sinhala': 'විකුණුම්කරුවන්ගේ කළමනාකරණය',
        'Tamil': 'விற்பனையாளர் மேலாண்மை'
      },
      'Product Approval': {
        'Sinhala': 'නිෂ්පාදන අනුමැතිය',
        'Tamil': 'தயாரிப்பு ஒப்புதல்'
      },
      'Order Monitoring': {
        'Sinhala': 'ඇණවුම් නිරීක්ෂණය',
        'Tamil': 'ஆர்டர் கண்காணிப்பு'
      },
      'Content Management': {
        'Sinhala': 'අන්තර්ගත කළමනාකරණය',
        'Tamil': 'உள்ளடக்க மேலாண்மை'
      },
      'Sales & Analytics': {
        'Sinhala': 'විකුණුම් සහ විශ්ලේෂණ',
        'Tamil': 'விற்பனை மற்றும் பகுப்பாய்வு'
      },
      'Refund Workflow': {
        'Sinhala': 'මුදල් ආපසු ගෙවීමේ ක්‍රියාවලිය',
        'Tamil': 'பணத்தைத் திரும்பப்பெறும் செயல்முறை'
      },
      'Dispute Resolution': {
        'Sinhala': 'ආරවුල් විසඳීම',
        'Tamil': 'சர்ச்சை தீர்வு'
      },
      'System Settings': {
        'Sinhala': 'පද්ධති සැකසුම්',
        'Tamil': 'அமைப்பு அமைப்புகள்'
      },
      'Help': {
        'Sinhala': 'උදව්',
        'Tamil': 'உதவி'
      },
      'Logout': {
        'Sinhala': 'පිටවීම',
        'Tamil': 'வெளியேறு'
      },

      // Header Navigation Links
      'Home': {
        'Sinhala': 'මුල් පිටුව',
        'Tamil': 'முகப்பு'
      },
      'Shops': {
        'Sinhala': 'සාප්පු',
        'Tamil': 'கடைகள்'
      },
      'About Us': {
        'Sinhala': 'අප ගැන',
        'Tamil': 'எங்களைப் பற்றி'
      },

      // Dashboard Titles & Metrics
      'Total Sales': {
        'Sinhala': 'මුළු විකුණුම්',
        'Tamil': 'மொத்த விற்பனை'
      },
      'New Orders': {
        'Sinhala': 'නව ඇණවුම්',
        'Tamil': 'புதிய ஆர்டர்கள்'
      },
      'New Sellers': {
        'Sinhala': 'නව විකුණුම්කරුවන්',
        'Tamil': 'புதிய விற்பனையாளர்கள்'
      },
      'Pending Products': {
        'Sinhala': 'අනුමත නොකළ නිෂ්පාදන',
        'Tamil': 'நிலುவையில் உள்ள தயாரிப்புகள்'
      },
      'Sales Over Time': {
        'Sinhala': 'කාලය අනුව විකුණුම්',
        'Tamil': 'காலப்போக்கில் விற்பனை'
      },
      'Top Categories': {
        'Sinhala': 'ප්‍රමුඛතම ප්‍රවර්ග',
        'Tamil': 'சிறந்த வகைகள்'
      },

      // User Profile Info
      'Admin': {
        'Sinhala': 'පරිපාලක',
        'Tamil': 'நிர்வாகி'
      },
      'Ayodya Senavirathne': {
        'Sinhala': 'අයෝද්‍යා සෙනවිරත්න',
        'Tamil': 'அயோத்யா செனவிரத்ன'
      },

      // Buttons & UI Controls
      '+ New Order': {
        'Sinhala': '+ නව ඇණවුම',
        'Tamil': '+ புதிய ஆர்டர்'
      },
      'System Settings & Variables': {
        'Sinhala': 'පද්ධති සැකසුම් සහ විචල්‍යයන්',
        'Tamil': 'அமைப்பு அமைப்புகள் மற்றும் மாறிகள்'
      },
      'Configure platform constants and control variables in real-time.': {
        'Sinhala': 'වේදිකා නියතයන් සහ පාලන විචල්‍යයන් තථ්‍ය කාලීනව සකසන්න.',
        'Tamil': 'நடைமேடை மாறிலிகள் மற்றும் கட்டுப்பாட்டு மாறிகளை நிகழ்நேரத்தில் கட்டமைக்கவும்.'
      },
      'General Settings': {
        'Sinhala': 'පොදු සැකසුම්',
        'Tamil': 'பொதுவான அமைப்புகள்'
      },
      'System & Localization': {
        'Sinhala': 'පද්ධතිය සහ ප්‍රාදේශීයකරණය',
        'Tamil': 'அமைப்பு மற்றும் உள்ளூர்மயமாக்கல்'
      },
      'Site Title': {
        'Sinhala': 'වෙබ් අඩවි ශීර්ෂය',
        'Tamil': 'தளத்தின் தலைப்பு'
      },
      'Tagline': {
        'Sinhala': 'ටැග්ලයින්',
        'Tamil': 'குறிக்கோள் வாசகம்'
      },
      'Admin Email': {
        'Sinhala': 'පරිපාලක විද්‍යුත් තැපෑල',
        'Tamil': 'நிர்வாக மின்னஞ்சல்'
      },
      'Maintenance Mode': {
        'Sinhala': 'නඩත්තු ප්‍රකාරය',
        'Tamil': 'பராமரிப்பு முறை'
      },
      'Caching Status': {
        'Sinhala': 'හැඹිලි තත්ත්වය',
        'Tamil': 'கேச்சிங் நிலை'
      },
      'Save System Settings': {
        'Sinhala': 'පද්ධති සැකසුම් සුරකින්න',
        'Tamil': 'அமைப்பு அமைப்புகளைச் சேமிக்கவும்'
      },
      'Default Currency': {
        'Sinhala': 'පෙරනිමි මුදල් ඒකකය',
        'Tamil': 'இயல்புநிலை நாணயம்'
      },
      'Default Language': {
        'Sinhala': 'පෙරනිමි භාෂාව',
        'Tamil': 'இயல்புநிலை மொழி'
      },
      'Time Zone': {
        'Sinhala': 'වේලා කලාපය',
        'Tamil': 'நேර மண்டலம்'
      }
    };

    if (dict[text] && dict[text][lang]) {
      return dict[text][lang];
    }
    return text;
  };



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

  const notifications = getNotifications();
  const processingOrdersCount = ordersList.filter(o => o.orderStatus === 'Processing' || o.orderStatus === 'Pending' || o.orderStatus === 'New').length;

  return (
    <div className="admin-dashboard-container">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">LANKA CRAFT</div>
        <div className="admin-profile"><img src={adminAvatar} alt="Admin" className="admin-avatar" /><div className="admin-info"><h3>{translate('Ayodya Senavirathne')}</h3><p>{translate('Admin')}</p></div></div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (<div key={item.name} className={`nav-item ${activeTab === item.name ? 'active' : ''}`} onClick={() => { setActiveTab(item.name); setSelectedDispute(null); }}>{item.icon}<span>{translate(item.name)}</span></div>))}
          <div className="nav-item-bottom"><div className="nav-item" onClick={handleHelpClick}><HelpCircle size={20} /><span>{translate('Help')}</span></div><div className="nav-item" onClick={handleLogoutClick}><LogOut size={20} /><span>{translate('Logout')}</span></div></div>
        </nav>
      </aside>
      <main className="admin-main-content">
        <header className="admin-header" style={{ position: 'relative' }}>
          <nav className="header-nav">
            <span 
              style={{ cursor: 'pointer', transition: 'color 0.2s' }} 
              onClick={() => navigate('/')}
              onMouseEnter={(e) => e.target.style.color = '#8D6E63'}
              onMouseLeave={(e) => e.target.style.color = ''}
            >
              {translate('Home')}
            </span>
            <span 
              style={{ cursor: 'pointer', transition: 'color 0.2s' }} 
              onClick={() => navigate('/categories')}
              onMouseEnter={(e) => e.target.style.color = '#8D6E63'}
              onMouseLeave={(e) => e.target.style.color = ''}
            >
              {translate('Shops')}
            </span>
            <span 
              style={{ cursor: 'pointer', transition: 'color 0.2s' }} 
              onClick={() => navigate('/about')}
              onMouseEnter={(e) => e.target.style.color = '#8D6E63'}
              onMouseLeave={(e) => e.target.style.color = ''}
            >
              {translate('About Us')}
            </span>
          </nav>
          
          <div className="header-actions">
            {/* Real-time Global Search */}
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              {isHeaderSearchOpen && (
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid #F1E6DA',
                    outline: 'none',
                    fontSize: '12px',
                    width: '180px',
                    marginRight: '8px',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  autoFocus
                />
              )}
              <div 
                className="action-icon" 
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsHeaderSearchOpen(!isHeaderSearchOpen);
                  if (isHeaderSearchOpen) setHeaderSearchQuery('');
                }}
              >
                <Search size={20} />
              </div>

              {/* Global Search Results Dropdown Overlay */}
              {isHeaderSearchOpen && headerSearchQuery.trim().length > 0 && (() => {
                const query = headerSearchQuery.toLowerCase();
                const results = [];

                // Search Products
                productsList.forEach(p => {
                  if ((p.name || '').toLowerCase().includes(query) || (p.sku || '').toLowerCase().includes(query)) {
                    results.push({
                      type: 'Product',
                      title: p.name,
                      subtitle: `SKU: ${p.sku || 'N/A'} - LKR ${p.price?.toLocaleString()}`,
                      targetTab: 'Product Approval'
                    });
                  }
                });

                // Search Orders
                ordersList.forEach(o => {
                  if ((o.orderNumber || '').toLowerCase().includes(query) || (o.buyerName || '').toLowerCase().includes(query)) {
                    results.push({
                      type: 'Order',
                      title: `Order ${o.orderNumber}`,
                      subtitle: `Customer: ${o.buyerName} - LKR ${o.amount?.toLocaleString()}`,
                      targetTab: 'Order Monitoring'
                    });
                  }
                });

                // Search Sellers
                sellersList.forEach(s => {
                  if ((s.name || '').toLowerCase().includes(query)) {
                    results.push({
                      type: 'Seller',
                      title: s.name,
                      subtitle: `Products: ${s.productsCount} - Sales: LKR ${s.totalSales?.toLocaleString()}`,
                      targetTab: 'Seller Management'
                    });
                  }
                });

                // Search Users
                usersList.forEach(u => {
                  if ((u.name || '').toLowerCase().includes(query) || (u.email || '').toLowerCase().includes(query)) {
                    results.push({
                      type: 'User',
                      title: u.name,
                      subtitle: `${u.role} - ${u.email}`,
                      targetTab: 'User Management'
                    });
                  }
                });

                const filteredResults = results.slice(0, 5); // top 5 results

                return (
                  <div 
                    className="search-results-overlay"
                    style={{
                      position: 'absolute',
                      top: '40px',
                      right: '0',
                      backgroundColor: '#FFF',
                      border: '1px solid #F1E6DA',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(93, 64, 55, 0.15)',
                      width: '280px',
                      zIndex: 1000,
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      padding: '8px 12px',
                      borderBottom: '1px solid #FDF6EE',
                      fontSize: '11px',
                      color: '#A1887F',
                      fontWeight: '600'
                    }}>
                      Search Results ({filteredResults.length})
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                      {filteredResults.length > 0 ? (
                        filteredResults.map((r, i) => (
                          <div 
                            key={i} 
                            style={{
                              padding: '8px 12px',
                              borderBottom: i === filteredResults.length - 1 ? 'none' : '1px solid #FDF6EE',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDFBF7'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                            onClick={() => {
                              setActiveTab(r.targetTab);
                              setSelectedDispute(null);
                              setIsHeaderSearchOpen(false);
                              setHeaderSearchQuery('');
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', alignItems: 'center' }}>
                              <span style={{ fontWeight: '700', fontSize: '11px', color: '#5D4037' }}>{r.title}</span>
                              <span style={{
                                fontSize: '9px',
                                background: '#F1E6DA',
                                color: '#5D4037',
                                padding: '1px 5px',
                                borderRadius: '4px',
                                fontWeight: '600'
                              }}>{r.type}</span>
                            </div>
                            <p style={{ fontSize: '10px', color: '#888', margin: '0' }}>{r.subtitle}</p>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: '20px 12px', textAlign: 'center', color: '#999', fontSize: '11px' }}>
                          No matches found.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Shopping Bag / Orders Shortcut */}
            <div 
              className="action-icon" 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => { setActiveTab('Order Monitoring'); setSelectedDispute(null); }}
            >
              <ShoppingBag size={20} />
              {processingOrdersCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#5D4037',
                  color: '#FFF',
                  fontSize: '10px',
                  fontWeight: '700',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {processingOrdersCount}
                </span>
              )}
            </div>

            {/* Notification Alerts */}
            <div 
              className="action-icon" 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#D84315',
                  color: '#FFF',
                  fontSize: '10px',
                  fontWeight: '700',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {notifications.length}
                </span>
              )}
              
              {/* Notifications Dropdown Card */}
              {isNotificationsOpen && (
                <div 
                  className="notifications-dropdown"
                  style={{
                    position: 'absolute',
                    top: '35px',
                    right: '0',
                    backgroundColor: '#FFF',
                    border: '1px solid #F1E6DA',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(93, 64, 55, 0.15)',
                    width: '320px',
                    zIndex: 1000,
                    cursor: 'default',
                    textAlign: 'left'
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #F1E6DA',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#FDFBF7',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px'
                  }}>
                    <strong style={{ color: '#3E2723', fontSize: '14px' }}>System Alerts</strong>
                    <span style={{ fontSize: '11px', color: '#8D6E63', fontWeight: '600' }}>
                      {notifications.length} Pending
                    </span>
                  </div>
                  <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                    {notifications.length > 0 ? (
                      notifications.map((n, i) => (
                        <div 
                          key={n.id} 
                          style={{
                            padding: '12px 16px',
                            borderBottom: i === notifications.length - 1 ? 'none' : '1px solid #FDF6EE',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDFBF7'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                          onClick={() => {
                            setActiveTab(n.targetTab);
                            setSelectedDispute(null);
                            setIsNotificationsOpen(false);
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '700', fontSize: '12px', color: '#5D4037' }}>{n.title}</span>
                            <span style={{ fontSize: '9px', color: '#A1887F' }}>{n.time}</span>
                          </div>
                          <p style={{ fontSize: '11px', color: '#777', margin: '0' }}>{n.desc}</p>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '30px 16px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
                        No active alerts. All quiet!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
