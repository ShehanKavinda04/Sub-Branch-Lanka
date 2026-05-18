
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CartPage.css";

const Cart = () => {
  
  const { cartItems, removeFromCart } = useCart(); 
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="cart-page-wrapper">
      <Header />
      
      <main className="cart-page-content">
        <header className="cart-page-header">
          <h1>My Shopping Cart</h1>
          <span className="item-count">{cartItems.length} Items</span>
        </header>

        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <FaShoppingBag className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any Sri Lankan treasures yet.</p>
            <button className="btn-return" onClick={() => navigate("/categories")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout-container">
            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="item-main-info">
                    <img src={item.image} alt={item.name} className="item-thumbnail" />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-meta">Handmade Original</p>
                      <span className="mobile-price">LKR {item.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="item-qty-display">
                    <span className="label">Qty</span>
                    <span className="value">{item.qty}</span>
                  </div>

                  <div className="item-price-info">
                    <span className="total-price">LKR {(item.price * item.qty).toLocaleString()}</span>
                    <button 
                      className="btn-remove-item" 
                      onClick={() => removeFromCart(item.id)}
                      title="Remove Item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <aside className="cart-summary-sidebar">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="shipping-note">Calculated at next step</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row grand-total">
                  <span>Total</span>
                  <span>LKR {subtotal.toLocaleString()}</span>
                </div>
                
                <button 
                  className="btn-checkout-primary" 
                  onClick={() => navigate("/address")}
                >
                  Proceed to Checkout
                </button>
                <p className="secure-checkout-text">🔒 Secure Checkout Guaranteed</p>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;