import React, { useState } from "react";
import "./SellerHelp.css";

const SellerHelp = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    { question: "How do I add a new product?", answer: "Go to the 'Products' tab and click on the '+ Add New Product' button to fill in the details." },
    { question: "When will I receive my payments?", answer: "Payments are processed every Friday for orders completed during the previous week." },
    { question: "How to handle a return request?", answer: "You can view return requests in the 'Orders' section under 'Pending Returns'." },
    { question: "Can I change my shop name?", answer: "Yes, you can update your shop name in the 'Profile Settings' section." }
  ];

  return (
    <div className="help-container">
      <header className="help-header">
        <h1>How can we help you?</h1>
        <div className="help-search">
          <input 
            type="text" 
            placeholder="Search for articles, guides..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="help-content">
        {/* Help Categories */}
        <section className="help-categories">
          <div className="category-card">
            <span className="icon">📦</span>
            <h3>Order Issues</h3>
            <p>Tracking, shipping, and order management.</p>
          </div>
          <div className="category-card">
            <span className="icon">💳</span>
            <h3>Payments</h3>
            <p>Withdrawals, fees, and transaction history.</p>
          </div>
          <div className="category-card">
            <span className="icon">🛠️</span>
            <h3>Account</h3>
            <p>Profile updates and security settings.</p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="contact-support">
          <div className="support-box">
            <h3>Still need help?</h3>
            <p>Our support team is available 24/7 to assist you.</p>
            <div className="contact-buttons">
              <button className="email-btn">Email Support</button>
              <button className="chat-btn">Live Chat</button>
            </div>
            <p className="phone-text">Call us: <strong>+94 11 234 5678</strong></p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerHelp;