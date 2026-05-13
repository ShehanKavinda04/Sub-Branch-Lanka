import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../Pages/Context/CartContext';
import './Header.css';

/**
 * Header Component
 * Managed branding: Ceylon Made
 */
export default function Header({ onAuthOpen }) {
  const { cartCount = 0, wishlistCount = 0 } = useCart() || {};

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Left Section: Logo & Navigation */}
        <div className="header-left">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
              </svg>
            </div>
            <h2 className="logo-text">Ceylon Made</h2>
          </Link>

          <nav className="nav-menu">
            <Link className="nav-item" to="/categories">Shop</Link>
            <Link className="nav-item" to="/about">About Us</Link>
            <button className="nav-item btn-link" onClick={onAuthOpen}>
              Login / Register
            </button>
          </nav>
        </div>

        {/* Right Section: Search & Actions */}
        <div className="header-right">
          <div className="search-container">
            <Search className="search-ui-icon" size={18} />
            <input className="search-field" placeholder="Search products..." />
          </div>

          <div className="action-group">
            {/* Wishlist Icon with ID for Animation */}
            <button 
              id="wishlist-icon" 
              className="action-btn" 
              aria-label="Wishlist"
            >
              <Heart className="icon" />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
            
            {/* Cart Icon with ID for Animation */}
            <Link 
              id="cart-icon" 
              to="/cart" 
              className="action-btn" 
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="icon" />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>

            {/* Profile */}
            <Link to="/profile" className="action-btn" aria-label="User Profile">
              <User className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}