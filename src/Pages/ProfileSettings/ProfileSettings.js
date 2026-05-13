import React, { useState, useRef } from 'react';
import { User, MapPin, CreditCard, LogOut, Camera, ShoppingBag } from 'lucide-react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  // State for active tab navigation
  const [activeTab, setActiveTab] = useState('personal');
  
  // Common photo state for Sidebar and Personal Info
  const [userPhoto, setUserPhoto] = useState("https://via.placeholder.com/60");
  
  // State for orders (Empty by default)
  const [orders, setOrders] = useState([]);

  // Function to render content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfo userPhoto={userPhoto} setUserPhoto={setUserPhoto} />;
      case 'address':
        return <AddressInfo />;
      case 'payment':
        return <PaymentInfo />;
      case 'orders':
        return <OrderHistoryContent orders={orders} />;
      default:
        return <PersonalInfo userPhoto={userPhoto} setUserPhoto={setUserPhoto} />;
    }
  };

  return (
    <div className="profile-container">
      {/* Sidebar Section */}
      <div className="profile-sidebar">
        <div className="user-brief">
          <img src={userPhoto} alt="User" className="avatar" style={{ objectFit: 'cover' }} />
          <div className="user-details">
            <h4>Ayodya Senavirathne</h4>
            <p>ayodya@gmail.com</p>
          </div>
        </div>

        <nav className="side-nav">
          <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>
            <User size={18} /> Personal Information
          </button>
          <button className={activeTab === 'address' ? 'active' : ''} onClick={() => setActiveTab('address')}>
            <MapPin size={18} /> Address
          </button>
          <button className={activeTab === 'payment' ? 'active' : ''} onClick={() => setActiveTab('payment')}>
            <CreditCard size={18} /> Payment Method
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <ShoppingBag size={18} /> Order History
          </button>
        </nav>

        <button className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
};

// --- Sub Components ---

// 1. Personal Information Component
const PersonalInfo = ({ userPhoto, setUserPhoto }) => {
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setUserPhoto("https://via.placeholder.com/60");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Personal Information</h2>
        <button className="save-btn">Save Changes</button>
      </div>
      <p className="section-description">Update your photo and personal details.</p>
        
      <div className="photo-upload">
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleFileChange}
        />
        
        <div className="photo-placeholder" onClick={handlePhotoClick} style={{ cursor: 'pointer', overflow: 'hidden' }}>
          {userPhoto.includes('placeholder') ? (
            <>
              <Camera size={30} color="#999" />
              <span>Upload Photo</span>
            </>
          ) : (
            <img src={userPhoto} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
        <div className="photo-btns">
          <button className="change-photo" onClick={handlePhotoClick}>Change Photo</button>
          <button className="remove-photo" onClick={handleRemovePhoto}>Remove</button>
        </div>
      </div>

      <div className="input-group">
        <label>Full Name</label>
        <input type="text" defaultValue="Ayodya Senavirathne" />
      </div>
      <div className="input-group">
        <label>Email Address</label>
        <input type="email" defaultValue="ayodya@gmail.com" />
      </div>
      <div className="input-group">
        <label>Phone Number</label>
        <input type="text" defaultValue="+94xxxxxxxxx" />
      </div>
      <hr />

      <div className="section-header">
        <h2>Password</h2>
        <button className="change-pwd-btn">Change Password</button>
      </div>
      <div className="input-group">
        <label>Current Password</label>
        <input type="password" value="********" readOnly />
      </div>
      <div className="input-group">
        <label>New Password</label>
        <input type="text" placeholder="enter new password" />
      </div>
      <div className="input-group">
        <label>Confirm New Password</label>
        <input type="text" placeholder="re-enter new password" />
      </div>
      <hr />
      
      <div className="section-header">
        <h2>Privacy Settings</h2>
        <button className="save-btn">Save Changes</button>
      </div>
      <div className="toggle-group">
        <span>Make my profile public</span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-group">
        <span>Receive marketing emails</span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

// 2. Order History Component
const OrderHistoryContent = ({ orders }) => {
  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Order History</h2>
      </div>
      <p className="section-description">Manage and track your past orders from Ceylon Made.</p>

      {orders.length === 0 ? (
        <div className="empty-state-container">
          <div className="empty-icon-box">
            <ShoppingBag size={60} color="#d7ccc8" />
          </div>
          <h3>No orders yet</h3>
          <p>You haven't placed any orders yet. Start shopping today!</p>
          <button className="save-btn" onClick={() => window.location.href='/categories'}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="orders-list">
          <p>Orders will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

// 3. Address Information Component
const AddressInfo = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="content-section">
      <div className="section-group">
        <div className="section-header">
          <h2>Manage Your Shipping Addresses</h2>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Address'}
          </button>
        </div>
        <p className="section-description">Add, edit, or remove your shipping addresses. Set a default address for faster checkout.</p>
        
        {!showForm && (
          <p className="section-description" style={{textAlign: 'center', marginTop: '20px'}}>No addresses saved yet.</p>
        )}
      </div>
        
      {showForm && (
        <div className="address-form-container">
          <h3 style={{marginBottom: '20px'}}>Add a New Address</h3>
          <div className="input-group">
            <label>Recipient's Full Name</label>
            <input type="text" placeholder="e.g., Samith Perera" />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Address Line 1</label>
              <input type="text" placeholder="e.g., 123 Main Street" />
            </div>
            <div className="input-group">
              <label>Address Line 2 (Optional)</label>
              <input type="text" placeholder="e.g., Apartment, Suit, etc." />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>City</label>
              <input type="text" placeholder="e.g., Colombo" />
            </div>
            <div className="input-group">
              <label>District/Province</label>
              <select className="form-select">
                <option>Western Province</option>
                <option>Central Province</option>
                <option>Southern Province</option>
                <option>Eastern Province</option>
                <option>Northern Province</option>
                <option>North Western Province</option>
                <option>North Central Province</option>
                <option>Sabaragamuwa Province</option>
                <option>Uva Province</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Postal Code</label>
              <input type="text" placeholder="e.g., 003000" />
            </div>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="set-default" />
            <label htmlFor="set-default">Set as default shipping address</label>
          </div>

          <div className="form-footer">
            <button className="save-btn-large">Save Address</button>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. Payment Information Component
const PaymentInfo = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="content-section">
      <div className="section-group">
        <div className="section-header">
          <h2>Manage Your Payment Methods</h2>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Payment method'}
          </button>
        </div>
        <p className="section-description">
          Securely add, edit, or remove your payment methods. Your information is safe with us.
        </p>

        {!showForm && (
          <p className="section-description" style={{textAlign: 'center', marginTop: '20px'}}>No payment methods added yet.</p>
        )}
      </div>

      {showForm && (
        <div className="address-form-container">
           <h3 style={{marginBottom: '20px'}}>Add New Card</h3>
           <div className="input-group">
            <label>Cardholder Name</label>
            <input type="text" placeholder="Name on card" />
          </div>
          <div className="input-group">
            <label>Card Number</label>
            <input type="text" placeholder="**** **** **** ****" />
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input type="password" placeholder="***" />
            </div>
          </div>
          <button className="save-btn-large">Save Payment Method</button>
        </div>
      )}

      <hr className="divider" />

      <div className="security-notice">
        <div className="security-icon">🛡️</div>
        <div className="security-text">
          <h4>Your Security is Our Priority</h4>
          <p>We use industry-standard encryption to protect your payment details.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;