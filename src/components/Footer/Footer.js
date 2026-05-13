import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * branding: Ceylon Made
 */
export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* About Section */}
          <div className="footer-section about">
            <h3 className="footer-logo">Ceylon Made</h3>
            <p className="footer-description">
              Supporting local artisans and bringing the best of Sri Lankan 
              craftsmanship to the world through authentic handmade products.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" aria-label="Facebook" className="social-icon"><Facebook size={20} /></a>
              <a href="https://instagram.com" aria-label="Instagram" className="social-icon"><Instagram size={20} /></a>
              <a href="https://twitter.com" aria-label="Twitter" className="social-icon"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section links">
            <h4 className="footer-heading">Help & Support</h4>
            <ul className="footer-nav">
              <li><a href="/faq">Help/FAQ</a></li>
              <li><a href="/shipping">Shipping & Returns</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section newsletter">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-subtext">Sign up for updates on new arrivals and artisan stories.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input" 
                required 
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ceylon Made. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}