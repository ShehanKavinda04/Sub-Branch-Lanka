import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; 
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Swal from 'sweetalert2';
import { CreditCard, Truck, CheckCircle, Info, X } from 'lucide-react';
import './PaymentPage.css';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { clearCart, cartItems } = useCart();
  
  const [method, setMethod] = useState('card');
  const [showSummary, setShowSummary] = useState(false);
  const [useNewCard, setUseNewCard] = useState(false);
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [savedCard] = useState({ last4: '4455', brand: 'Visa' });

  // මුදල් ගණනය කිරීම්
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryFee = 350; 
  const total = subtotal + deliveryFee;

  // Rating Popup - තරු යටට එන විදිහට සකසා ඇත
  const showRatingPopup = () => {
    Swal.fire({
      title: 'Rate Your Experience',
      html: '<p style="color: #666;">How was your shopping experience with Ceylon Made?</p>',
      input: 'radio',
      inputOptions: {
        '5': '⭐⭐⭐⭐⭐ Excellent',
        '4': '⭐⭐⭐⭐ Good',
        '3': '⭐⭐⭐ Average',
        '2': '⭐⭐ Fair',
        '1': '⭐ Poor'
      },
      customClass: {
        input: 'vertical-rating-radio'
      },
      inputValidator: (value) => {
        if (!value) return 'Please select a rating!';
      },
      showCancelButton: true,
      confirmButtonText: 'Submit Feedback',
      confirmButtonColor: '#6d4c41',
      cancelButtonColor: '#a8908a',
    }).then(() => {
      navigate('/'); 
    });
  };

  // Order Confirmation - Modal එක වැසී Notification එක පෙන්වීම
  const handleConfirmOrder = () => {
    // 1. Modal එක වසා දමන්න
    setShowSummary(false);

    // 2. Notification එක පටන් ගන්න
    Swal.fire({
      title: 'Processing Order...',
      timer: 2000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      return Swal.fire({
        title: 'Order Successful!',
        text: 'Your order has been placed successfully.',
        icon: 'success',
        confirmButtonColor: '#6d4c41',
      });
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart(); 
        showRatingPopup(); 
      }
    });
  };

  const handlePlaceOrderClick = () => {
    if (method === 'card' && useNewCard && (!card.number || !card.expiry)) {
      return Swal.fire('Error', 'Please enter your card details', 'error');
    }
    setShowSummary(true);
  };

  return (
    <div className="payment-page-wrapper">
      <Header />
      <main className="payment-main-container fade-in">
        <div className="payment-card-box slide-up">
          <h2 className="payment-title">Select Payment Method</h2>
          
          <div className="amount-summary-banner">
            <span>Total to Pay:</span>
            <strong>LKR {total.toLocaleString()}</strong>
          </div>

          <div className="payment-method-selector">
            <button className={`method-toggle-btn ${method === 'card' ? 'active' : ''}`} onClick={() => setMethod('card')}>
              <CreditCard size={20} /> <span>Card Payment</span>
            </button>
            <button className={`method-toggle-btn ${method === 'cod' ? 'active' : ''}`} onClick={() => setMethod('cod')}>
              <Truck size={20} /> <span>Cash on Delivery</span>
            </button>
          </div>

          <div className="payment-details-area">
            {method === 'cod' ? (
              <div className="cod-info-alert">
                <Info size={20} />
                <p>Pay with cash when your items are delivered.</p>
              </div>
            ) : (
              <div className="card-input-section">
                {savedCard && !useNewCard ? (
                  <div className="saved-card-row">
                    <div className="card-preview">
                      <span className="brand-tag">{savedCard.brand}</span>
                      <span className="card-number">**** **** **** {savedCard.last4}</span>
                    </div>
                    <button className="text-link-btn" onClick={() => setUseNewCard(true)}>Use another card</button>
                  </div>
                ) : (
                  <div className="new-card-entry">
                    <input type="text" placeholder="Card Number" className="form-input" onChange={(e) => setCard({...card, number: e.target.value})} />
                    <div className="form-row">
                      <input type="text" placeholder="MM/YY" className="form-input" />
                      <input type="password" placeholder="CVV" className="form-input" />
                    </div>
                    {savedCard && <button className="text-link-btn" onClick={() => setUseNewCard(false)}>Back to saved card</button>}
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="primary-order-btn" onClick={handlePlaceOrderClick}>Place Order</button>
        </div>
      </main>

      {/* Improved Order Summary Modal */}
      {showSummary && (
        <div className="modal-overlay-bg">
          <div className="order-summary-modal slide-up">
            <div className="modal-header">
              <h3>Order Summary</h3>
              <button className="modal-close-icon" onClick={() => setShowSummary(false)}><X size={24}/></button>
            </div>
            
            <div className="summary-scroll-area">
              {cartItems.map(item => (
                <div key={item.id} className="summary-product-item">
                  <div className="p-img-mini"><img src={item.image} alt={item.name} /></div>
                  <div className="p-details-mini">
                    <span className="p-name">{item.name}</span>
                    <span className="p-qty-price">{item.qty} x LKR {item.price.toLocaleString()}</span>
                  </div>
                  <div className="p-total-mini">LKR {(item.price * item.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="billing-details">
              <div className="bill-row"><span>Subtotal</span><span>LKR {subtotal.toLocaleString()}</span></div>
              <div className="bill-row"><span>Delivery Fee</span><span>LKR {deliveryFee.toLocaleString()}</span></div>
              <div className="bill-row total-highlight"><strong>Grand Total</strong><strong>LKR {total.toLocaleString()}</strong></div>
            </div>

            <button className="confirm-pay-btn" onClick={handleConfirmOrder}>Confirm & Pay Now</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}