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
  ChevronRight,
  Eye,
  Send,
  Info,
  ThumbsUp,
  ThumbsDown,
  User,
  Package
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
  const [refundSubTab, setRefundSubTab] = useState('New Requests (2)');
  const [analyticsSubTab, setAnalyticsSubTab] = useState('Sales Overview');
  const [timePeriod, setTimePeriod] = useState('Today');
  const [selectedDispute, setSelectedDispute] = useState(null);

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
    { name: 'Ruvini Perera', status: 'Active', sales: 'LKR 2,500', products: 42, date: '2023.05.12', img: avatarFemale },
    { name: 'Nimal Silva', status: 'Pending', sales: 'LKR 0', products: 8, date: '2023.05.12', img: adminAvatar },
    { name: 'Kavya Bandara', status: 'Active', sales: 'LKR 5,120', products: 88, date: '2023.05.12', img: adminAvatar },
    { name: 'Saman Bandara', status: 'Suspend', sales: 'LKR 850', products: 15, date: '2023.05.12', img: avatarMale2 },
  ];

  const products = [
    { id: 1, name: 'Hand-painted Ceramic Vars', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Active', img: vaseImg, seller: 'Artisan Craft', date: '2023.05.12' },
    { id: 2, name: 'Bathik Print Silk Saree', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Pending Review', img: sareeImg, seller: 'Silk Waves', date: '2023.05.12' },
    { id: 3, name: 'Carved Wooden Elephant', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Out of Stock', img: elephantImg, seller: 'Wooden Store', date: '2023.05.12' },
    { id: 4, name: 'Woven Reed Storage Basket', sku: 'SKU-001', price: 'LKR 2,500', stock: 12, status: 'Draft', img: vaseImg, seller: 'Glow Guild', date: '2023.05.12' },
  ];

  const orders = [
    { id: '#ORD1234', date: '2024-06-12', buyer: 'Ayodya Senavirathne', seller: 'Crafty Hand', amount: 'LKR 42,000', payment: 'Paid', status: 'Completed' },
    { id: '#ORD4567', date: '2024-06-12', buyer: 'Ayodya Senavirathne', seller: 'Silk Waves', amount: 'LKR 42,000', payment: 'Unpaid', status: 'Pending' },
    { id: '#ORD7896', date: '2024-06-12', buyer: 'Ayodya Senavirathne', seller: 'Island Gems', amount: 'LKR 42,000', payment: 'Paid', status: 'Completed' },
    { id: '#ORD4656', date: '2024-06-12', buyer: 'Ayodya Senavirathne', seller: 'Craft Hand', amount: 'LKR 42,000', payment: 'Paid', status: 'Cancelled' },
  ];

  const banners = [
    { title: 'Summer Sales Banner', img: bannerSale, period: '2023.05.12 to 2023.05.30', status: 'Published' },
    { title: 'Summer Sales Banner', img: bannerSale, period: '2023.05.12 to 2023.05.30', status: 'Published' },
    { title: 'Summer Sales Banner', img: bannerSale, period: 'Not Schedule', status: 'Draft' },
    { title: 'Summer Sales Banner', img: bannerSale, period: '2023.05.12 to 2023.05.30', status: 'Scheduled' },
  ];

  const refunds = [
    { id: '#1234', product: 'Hand -Painted Ceramic Vase', customer: 'Ayodya Senavirathne', amount: 'LKR 25,000', time: 'Today' },
    { id: '#1234', product: 'Hand -Painted Ceramic Vase', customer: 'Ayodya Senavirathne', amount: 'LKR 25,000', time: 'Yesterday' },
    { id: '#1234', product: 'Hand -Painted Ceramic Vase', customer: 'Ayodya Senavirathne', amount: 'LKR 25,000', time: '3days ago' },
    { id: '#1234', product: 'Hand -Painted Ceramic Vase', customer: 'Ayodya Senavirathne', amount: 'LKR 25,000', time: 'Today' },
  ];

  const disputes = [
    { id: '#1234', reason: 'Item not as described', item: 'Hand -Painted Ceramic Vase', buyer: 'Anura Perera', seller: 'Crafty Hands', orderId: '#ORD 1234', status: 'Pending', outcome: 'Full Refund' },
    { id: '#1235', reason: 'Item significantly not as described', item: 'Hand -Painted Ceramic Vase', buyer: 'Anura Perera', seller: 'Crafty Hands', orderId: '#ORD 1234', status: 'Escalated', outcome: 'Full Refund' },
    { id: '#1236', reason: 'Non-delivery of items', item: 'Hand -Painted Ceramic Vase', buyer: 'Anura Perera', seller: 'Crafty Hands', orderId: '#ORD 1234', status: 'Resolved', outcome: 'Full Refund' },
    { id: '#1237', reason: 'Damaged item', item: 'Hand -Painted Ceramic Vase', buyer: 'Anura Perera', seller: 'Crafty Hands', orderId: '#ORD 1234', status: 'Pending', outcome: 'Full Refund' },
  ];

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

  const renderDashboard = () => (
    <>
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-title">Total Sales</div><div className="stat-value">LKR 124,500</div><div className="stat-change positive">+5.2% this month</div></div>
        <div className="stat-card"><div className="stat-title">New Orders</div><div className="stat-value">25</div><div className="stat-change positive">+10%</div></div>
        <div className="stat-card"><div className="stat-title">New Sellers</div><div className="stat-value">10</div><div className="stat-change positive">+25%</div></div>
        <div className="stat-card"><div className="stat-title">Pending Products</div><div className="stat-value">15</div><div className="stat-change">+15%</div></div>
      </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title"><h4>Sales Over Time</h4><div className="chart-subtitle">LKR 45,600</div><div className="stat-change positive">this month +5.2%</div></div></div>
          <div className="chart-placeholder">
            <svg className="area-chart-svg" viewBox="0 0 400 150">
              <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#8D6E63" stopOpacity="0.5" /><stop offset="100%" stopColor="#8D6E63" stopOpacity="0" /></linearGradient></defs>
              <path d="M0,120 Q50,80 100,100 T200,60 T300,110 T400,90 L400,150 L0,150 Z" fill="url(#gradient)" /><path d="M0,120 Q50,80 100,100 T200,60 T300,110 T400,90" fill="none" stroke="#8D6E63" strokeWidth="2" /><text x="0" y="145" fontSize="10" fill="#666">Week 1</text><text x="120" y="145" fontSize="10" fill="#666">Week 2</text><text x="240" y="145" fontSize="10" fill="#666">Week 3</text><text x="360" y="145" fontSize="10" fill="#666">Week 4</text>
            </svg>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title"><h4>Top Categories</h4><div className="chart-subtitle">350 Items</div><div className="stat-change positive">this month +8%</div></div></div>
          <div className="chart-placeholder">
            <div className="bar" style={{ height: '60%' }}><span className="bar-label">Clothing</span></div><div className="bar" style={{ height: '90%' }}><span className="bar-label">Jewelry</span></div><div className="bar" style={{ height: '80%' }}><span className="bar-label">Home</span></div><div className="bar" style={{ height: '30%' }}><span className="bar-label">Art</span></div><div className="bar" style={{ height: '70%' }}><span className="bar-label">Pottery</span></div>
          </div>
        </div>
      </section>
      <section className="product-table-card">
        <h3>Seller Management</h3>
        <table>
          <thead><tr><th>Seller Name</th><th>Status</th><th>Sales</th><th>Products</th><th>Action</th></tr></thead>
          <tbody>
            {sellers.slice(0, 4).map((seller, index) => (<tr key={index}><td>{seller.name}</td><td><span className={`status-badge ${seller.status.toLowerCase()}`}>{seller.status}</span></td><td>{seller.sales}</td><td>{seller.products}</td><td><div className="action-links">{seller.status === 'Pending' ? (<><span className="approve-link">Approve</span><span className="suspend-link">Suspend</span></>) : (<span className="edit-link">Edit</span>)}</div></td></tr>))}
          </tbody>
        </table>
      </section>
    </>
  );

  const renderUserManagement = () => (
    <div className="user-management-view">
      <div className="admin-view-header"><h2>User Management</h2><button className="add-btn">Add New User</button></div>
      <div className="filters-bar"><select className="filter-select"><option>All Status</option></select><select className="filter-select"><option>All Roles</option></select></div>
      <div className="product-table-card">
        <div className="table-controls"><span>Showing 1 - 10 of Products</span><div className="sort-control"><span>Sort by:</span><select className="filter-select" style={{ minWidth: 'auto' }}><option>Date Added</option></select></div></div>
        <table>
          <thead><tr><th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" /></th><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
          <tbody>
            {products.map((product) => (<tr key={product.id}><td><input type="checkbox" className="table-checkbox" /></td><td><div className="product-cell"><img src={product.img} alt={product.name} className="product-img" /><span>{product.name}</span></div></td><td>{product.sku}</td><td>{product.price}</td><td>{product.stock}</td><td><span className={`status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>{product.status}</span></td></tr>))}
          </tbody>
        </table>
        <div className="pagination"><button className="page-btn"><ChevronLeft size={14} /></button><button className="page-btn active">1</button><button className="page-btn">2</button><button className="page-btn">3</button><button className="page-btn"><ChevronRight size={14} /></button></div>
      </div>
    </div>
  );

  const renderSellerManagement = () => (
    <div className="seller-management-view">
      <div className="admin-view-header"><h2>Seller Management</h2></div>
      <div className="filters-bar" style={{ justifyContent: 'space-between' }}><div className="search-bar-container"><Search size={18} /><input type="text" placeholder="Seller, Store...." /></div><select className="filter-select"><option>All Status</option></select></div>
      <div className="product-table-card">
        <table>
          <thead><tr><th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" /></th><th>Seller/ Store Name</th><th>Date Registered</th><th>Total Sales</th><th>Products</th><th>Action</th></tr></thead>
          <tbody>
            {sellers.map((seller, index) => (<tr key={index}><td><input type="checkbox" className="table-checkbox" /></td><td><div className="seller-cell"><img src={seller.img} alt={seller.name} className="seller-img" /><span>{seller.name}</span></div></td><td>{seller.date}</td><td>{seller.sales}</td><td>{seller.products}</td><td><span className={`status-badge ${seller.status.toLowerCase()}`}>{seller.status}</span></td></tr>))}
          </tbody>
        </table>
        <div className="pagination"><button className="page-btn"><ChevronLeft size={14} /></button><button className="page-btn active">1</button><button className="page-btn">2</button><button className="page-btn">3</button><button className="page-btn"><ChevronRight size={14} /></button></div>
      </div>
    </div>
  );

  const renderProductApproval = () => (
    <div className="product-approval-view">
      <div className="admin-view-header"><h2>Product Approval Queue</h2></div>
      <div className="filters-bar" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginBottom: '15px' }}><select className="filter-select"><option>All Status</option></select><select className="filter-select"><option>All Sellers</option></select><select className="filter-select"><option>All Categories</option></select></div>
        <div className="search-bar-container" style={{ maxWidth: 'none' }}><Search size={18} /><input type="text" placeholder="Seller, Store, Catergories...." /></div>
      </div>
      <div className="product-table-card" style={{ marginTop: '20px' }}>
        <table>
          <thead><tr><th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" /></th><th>Product</th><th>Seller</th><th>Submission Date</th><th>Action</th></tr></thead>
          <tbody>
            {products.map((product) => (<tr key={product.id}><td><input type="checkbox" className="table-checkbox" /></td><td><div className="product-cell"><img src={product.img} alt={product.name} className="product-img" /><span>{product.name}</span></div></td><td>{product.seller}</td><td>{product.date}</td><td><div className="action-btn-group"><button className="action-btn approve">Approve</button><button className="action-btn reject">Reject</button><button className="action-btn request-edit">Request Edit</button><button className="action-btn view-details">View Details</button></div></td></tr>))}
          </tbody>
        </table>
        <div className="pagination"><button className="page-btn"><ChevronLeft size={14} /></button><button className="page-btn active">1</button><button className="page-btn">2</button><button className="page-btn">3</button><button className="page-btn"><ChevronRight size={14} /></button></div>
      </div>
    </div>
  );

  const renderOrderMonitoring = () => (
    <div className="order-monitoring-view">
      <div className="admin-view-header"><h2>Order Monitoring</h2><button className="add-btn">+ New Order</button></div>
      <div className="filters-bar" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginBottom: '15px' }}><select className="filter-select"><option>Filter by Status</option></select><select className="filter-select"><option>Sellers</option></select><select className="filter-select"><option>Payment Status</option></select></div>
        <div className="search-bar-container" style={{ maxWidth: 'none' }}><Search size={18} /><input type="text" placeholder="Search by Date, Order ID, Buyer or Product......" /></div>
      </div>
      <div className="product-table-card" style={{ marginTop: '20px' }}>
        <table>
          <thead><tr><th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" /></th><th>Order ID</th><th>Date</th><th>Buyer</th><th>Seller</th><th>Amount</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.slice(0, 4).map((order, index) => (<tr key={index}><td><input type="checkbox" className="table-checkbox" /></td><td>{order.id}</td><td>{order.date}</td><td>{order.buyer}</td><td>{order.seller}</td><td>{order.amount}</td><td><span className={`status-badge ${order.payment.toLowerCase()}`}>{order.payment}</span></td><td><span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></td><td><button className="action-view-btn"><Eye size={18} /></button></td></tr>))}
          </tbody>
        </table>
        <div className="pagination"><button className="page-btn"><ChevronLeft size={14} /></button><button className="page-btn active">1</button><button className="page-btn">2</button><button className="page-btn">3</button><button className="page-btn"><ChevronRight size={14} /></button></div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="content-management-view">
      <div className="admin-view-header"><h2>Content Management</h2><button className="add-btn">+ New Order</button></div>
      <div className="filters-bar" style={{ justifyContent: 'space-between' }}><div className="search-bar-container"><Search size={18} /><input type="text" placeholder="Search for Banners......" /></div><select className="filter-select"><option>Filter by Status</option></select></div>
      <div className="product-table-card">
        <table>
          <thead><tr><th style={{ width: '40px' }}><input type="checkbox" className="table-checkbox" /></th><th>Banner Title</th><th>image Preview</th><th>Display Period</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {banners.map((banner, index) => (<tr key={index}><td><input type="checkbox" className="table-checkbox" /></td><td>{banner.title}</td><td><img src={banner.img} alt="Preview" className="banner-preview-img" /></td><td>{banner.period}</td><td><span className={`status-badge ${banner.status.toLowerCase()}`}>{banner.status}</span></td><td><div className="action-links"><span className="edit-link">Edit</span><span className="delete-link">Delete</span></div></td></tr>))}
          </tbody>
        </table>
        <div className="pagination"><button className="page-btn"><ChevronLeft size={14} /></button><button className="page-btn active">1</button><button className="page-btn">2</button><button className="page-btn">3</button><button className="page-btn"><ChevronRight size={14} /></button></div>
      </div>
    </div>
  );

  const renderSalesOverview = () => (
    <>
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-title">Total Revenue</div><div className="stat-value">LKR 124, 500</div><div className="stat-change positive">+5.2%</div></div>
        <div className="stat-card"><div className="stat-title">Number of Orders</div><div className="stat-value">1,234</div><div className="stat-change positive">+10%</div></div>
        <div className="stat-card"><div className="stat-title">Average Order Value</div><div className="stat-value">LKR 52, 000</div><div className="stat-change" style={{ color: '#F44336' }}>-1.5%</div></div>
        <div className="stat-card"><div className="stat-title">New Customers</div><div className="stat-value">56</div><div className="stat-change positive">+20.1%</div></div>
      </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title"><h4>Sales Over Time</h4><div className="chart-subtitle">LKR 45,600</div><div className="stat-change positive">Jan - Jun 2025 +5.2%</div></div></div>
          <div className="chart-placeholder">
            <svg className="area-chart-svg" viewBox="0 0 400 150">
              <defs><linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#8D6E63" stopOpacity="0.5" /><stop offset="100%" stopColor="#8D6E63" stopOpacity="0" /></linearGradient></defs>
              <path d="M0,120 Q30,90 60,110 T120,70 T180,100 T240,60 T300,110 T400,90 L400,150 L0,150 Z" fill="url(#gradient2)" /><path d="M0,120 Q30,90 60,110 T120,70 T180,100 T240,60 T300,110 T400,90" fill="none" stroke="#8D6E63" strokeWidth="2" /><text x="0" y="145" fontSize="10" fill="#666">Jan</text><text x="80" y="145" fontSize="10" fill="#666">Feb</text><text x="160" y="145" fontSize="10" fill="#666">Mar</text><text x="240" y="145" fontSize="10" fill="#666">Apr</text><text x="320" y="145" fontSize="10" fill="#666">May</text><text x="380" y="145" fontSize="10" fill="#666">Jun</text>
            </svg>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header"><h4>Top Selling Products</h4></div>
          <div className="donut-chart-container">
            <div style={{ position: 'relative' }}>
              <svg className="donut-svg" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F1E6DA" strokeWidth="3"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8D6E63" strokeWidth="3" strokeDasharray="40 60" strokeDashoffset="0"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#A1887F" strokeWidth="3" strokeDasharray="32 68" strokeDashoffset="-40"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#FFCCBC" strokeWidth="3" strokeDasharray="18 82" strokeDashoffset="-72"></circle>
              </svg>
              <div className="donut-center-text"><span className="value">150</span><span className="label">Units</span></div>
            </div>
            <div className="donut-legend">
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#8D6E63' }}></div>Batik Sarees</div><span className="legend-value">40%</span></div>
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#A1887F' }}></div>Wooden Elephants</div><span className="legend-value">32%</span></div>
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#FFCCBC' }}></div>Clay Pots</div><span className="legend-value">18%</span></div>
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#F1E6DA' }}></div>Others</div><span className="legend-value">10%</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-table-card">
        <h3>Recent Transactions</h3>
        <table>
          <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((order, index) => (<tr key={index}><td>{order.id}</td><td>{order.date}</td><td>{order.buyer}</td><td>{order.amount}</td><td><span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></td></tr>))}
          </tbody>
        </table>
      </section>
    </>
  );

  const renderProductSalesView = () => (
    <>
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-title">Units Sold</div><div className="stat-value">8,721</div><div className="stat-change positive">+15.2%</div></div>
        <div className="stat-card"><div className="stat-title">Gross Sales</div><div className="stat-value">LKR 9, 250</div><div className="stat-change positive">+10%</div></div>
        <div className="stat-card"><div className="stat-title">Net Sales</div><div className="stat-value">LKR 52, 000</div><div className="stat-change positive">+12.9%</div></div>
        <div className="stat-card"><div className="stat-title">Product AOV</div><div className="stat-value">LKR 125, 000</div><div className="stat-change" style={{ color: '#F44336' }}>-0.8%</div></div>
      </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title"><h4>Net Sales Over Time</h4><div className="chart-subtitle">LKR 45,600</div><div className="stat-change positive">Jan - Jun 2025 +5.2%</div></div></div>
          <div className="chart-placeholder">
            <svg className="area-chart-svg" viewBox="0 0 400 150">
              <defs><linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#8D6E63" stopOpacity="0.5" /><stop offset="100%" stopColor="#8D6E63" stopOpacity="0" /></linearGradient></defs>
              <path d="M0,120 Q40,100 80,110 T160,80 T240,100 T320,70 T400,90 L400,150 L0,150 Z" fill="url(#gradient3)" /><path d="M0,120 Q40,100 80,110 T160,80 T240,100 T320,70 T400,90" fill="none" stroke="#8D6E63" strokeWidth="2" /><text x="0" y="145" fontSize="10" fill="#666">Jan</text><text x="80" y="145" fontSize="10" fill="#666">Feb</text><text x="160" y="145" fontSize="10" fill="#666">Mar</text><text x="240" y="145" fontSize="10" fill="#666">Apr</text><text x="320" y="145" fontSize="10" fill="#666">May</text><text x="380" y="145" fontSize="10" fill="#666">Jun</text>
            </svg>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header"><h4>Popular Variations</h4></div>
          <div className="variations-list">
            {variations.map((v, i) => (<div className="variation-item" key={i}><div className="variation-info"><h5>{v.name}</h5><p>{v.sold}</p></div><div className="variation-revenue">{v.revenue}</div></div>))}
          </div>
        </div>
      </section>
      <section className="product-table-card">
        <h3>Product Performance</h3>
        <table>
          <thead><tr><th>Product</th><th>Units Sold</th><th>Orders</th><th>Net Sales</th><th>Category</th></tr></thead>
          <tbody>
            {productPerformance.map((p, i) => (<tr key={i}><td>{p.name}</td><td>{p.sold}</td><td>{p.orders}</td><td>{p.revenue}</td><td>{p.category}</td></tr>))}
          </tbody>
        </table>
      </section>
    </>
  );

  const renderSellerRevenueView = () => (
    <>
      <section className="stats-grid">
        <div className="stat-card"><div className="stat-title">Total Seller Revenue</div><div className="stat-value">LKR 49, 870</div><div className="stat-change positive">+15.2%</div></div>
        <div className="stat-card"><div className="stat-title">Net Revenue (Payout)</div><div className="stat-value">LKR 8, 389.50</div><div className="stat-change positive">+10%</div></div>
        <div className="stat-card"><div className="stat-title">Total Orders</div><div className="stat-value">952</div><div className="stat-change positive">+17.9%</div></div>
        <div className="stat-card"><div className="stat-title">Avg. Sale Value</div><div className="stat-value">LKR 125, 000</div><div className="stat-change positive">+2.1%</div></div>
      </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header"><h4>Top Sellers by Revenue</h4></div>
          <div className="seller-bar-chart">
            {topSellers.map((s, i) => (
              <div className="seller-bar-item" key={i}>
                <div className="seller-bar-label"><span>{s.name}</span><span>{s.revenue}</span></div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${s.percent}%` }}>{s.name}</div><div className="progress-bar-value">{s.revenue}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header"><h4>Revenue Distribution</h4></div>
          <div className="donut-chart-container">
            <div style={{ position: 'relative' }}>
              <svg className="donut-svg" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F1E6DA" strokeWidth="3"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8D6E63" strokeWidth="3" strokeDasharray="46 54" strokeDashoffset="0"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#A1887F" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-46"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#FFCCBC" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-76"></circle>
              </svg>
              <div className="donut-center-text"><span className="value" style={{ fontSize: '14px' }}>LKR 49,870</span><span className="label">Total Revenue</span></div>
            </div>
            <div className="donut-legend">
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#8D6E63' }}></div>Silk Waves</div><span className="legend-value">46%</span></div>
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#A1887F' }}></div>Crafty Hands</div><span className="legend-value">30%</span></div>
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#FFCCBC' }}></div>Ceylon Pottery</div><span className="legend-value">20%</span></div>
              <div className="legend-item"><div className="legend-label"><div className="legend-dot" style={{ backgroundColor: '#F1E6DA' }}></div>Others</div><span className="legend-value">10%</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-table-card">
        <h3>Seller Performance Details</h3>
        <table>
          <thead><tr><th>Seller</th><th>Total Revenue</th><th>Net Revenue</th><th>Orders</th><th>Avg. Sale Value</th></tr></thead>
          <tbody>
            {sellerPerformance.map((p, i) => (<tr key={i}><td>{p.name}</td><td>{p.total}</td><td>{p.net}</td><td>{p.orders}</td><td>{p.avg}</td></tr>))}
          </tbody>
        </table>
      </section>
    </>
  );

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

  const renderRefundWorkflow = () => (
    <div className="refund-workflow-view">
      <div className="admin-view-header"><h2>Refund Workflow Management</h2></div>
      <div className="filters-bar" style={{ justifyContent: 'space-between' }}><div className="search-bar-container"><Search size={18} /><input type="text" placeholder="Search by order ID, Customer Name, Date....." /></div><select className="filter-select"><option>All Sellers</option></select></div>
      <div className="refund-tabs">
        <div className={`refund-tab ${refundSubTab === 'New Requests (2)' ? 'active' : ''}`} onClick={() => setRefundSubTab('New Requests (2)')}>New Requests (2)</div><div className={`refund-tab ${refundSubTab === 'Under Review (4)' ? 'active' : ''}`} onClick={() => setRefundSubTab('Under Review (4)')}>Under Review (4)</div><div className={`refund-tab awaiting ${refundSubTab === 'Awaiting seller Action(1)' ? 'active' : ''}`} onClick={() => setRefundSubTab('Awaiting seller Action(1)')}>Awaiting seller Action(1)</div>
      </div>
      <div className="refund-card-grid">{refunds.map((refund, index) => (<div className="refund-card" key={index}><div className="refund-card-header"><h4>Order {refund.id}</h4><p>{refund.product}</p></div><div className="refund-card-footer"><div className="refund-customer-info"><span className="customer-name">{refund.customer}</span><span className="refund-time">{refund.time}</span></div><div className="refund-amount">{refund.amount}</div></div></div>))}</div>
    </div>
  );

  const renderDisputeDetail = () => (
    <div className="dispute-detail-view">
      <div className="admin-view-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setSelectedDispute(null)}>
          <ChevronLeft size={24} />
          <h2>Refund Workflow Management</h2>
        </div>
      </div>

      <div className="dispute-detail-header-card">
        <span className="dispute-id-label">Dispute ID {selectedDispute.id}</span>
        <h3 className="dispute-title-large">{selectedDispute.reason}</h3>
        <span className="pending-action-badge">Pending Admin Action</span>
      </div>

      <div className="dispute-detail-tabs">
        <div className="dispute-detail-tab active">Summary</div>
        <div className="dispute-detail-tab">Communication</div>
        <div className="dispute-detail-tab">Evidence</div>
      </div>

      <div className="dispute-grid-layout">
        <div className="detail-section-card">
          <h4>Case Details</h4>
          <div className="case-details-grid">
            <div className="detail-item"><label>Buyer</label><span>{selectedDispute.buyer}</span></div>
            <div className="detail-item"><label>Seller</label><span>{selectedDispute.seller}</span></div>
            <div className="detail-item"><label>Item</label><span>{selectedDispute.item}</span></div>
            <div className="detail-item"><label>Order ID</label><span>{selectedDispute.orderId}</span></div>
            <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Dispute Reason</label><span>{selectedDispute.reason}</span></div>
            <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Desired Outcome</label><span>{selectedDispute.outcome}</span></div>
          </div>
        </div>

        <div className="action-info-group">
          <div className="detail-section-card">
            <h4>Action & Info</h4>
            <div className="action-sub-group">
              <label>Mediation Tools</label>
              <button className="btn-primary-blue"><Send size={16} /> Send Message</button>
              <div className="request-info-link"><Info size={14} /> Request More Info</div>
            </div>
            <div className="action-sub-group" style={{ marginTop: '20px' }}>
              <label>Make a Decision</label>
              <button className="btn-decision-buyer"><ThumbsUp size={16} /> Rule in Favor of Buyer</button>
              <button className="btn-decision-seller"><ThumbsDown size={16} /> Rule in Favor of Seller</button>
            </div>
            <div className="action-sub-group" style={{ marginTop: '20px' }}>
              <label>Related Information</label>
              <div className="related-links-list">
                <div className="related-link"><User size={14} /> View Buyer's Profile</div>
                <div className="related-link"><User size={14} /> View Seller's Profile</div>
                <div className="related-link"><Package size={14} /> View Product Page</div>
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
        {disputes.map((dispute, index) => (
          <div className="dispute-card" key={index}>
            <h4>Dispute {dispute.id} -</h4><p className="dispute-reason">{dispute.reason}</p><div className="dispute-info"><span>Item: {dispute.item}</span><span>Buyer: {dispute.buyer}</span></div>
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
