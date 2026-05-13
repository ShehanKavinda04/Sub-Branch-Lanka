import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './AddressPage.css';

export default function AddressPage() {
  const navigate = useNavigate();

  // State to store saved addresses - starts as an empty array (no default data)
  const [addresses, setAddresses] = useState([]);

  // Form state to handle new address input fields
  const [form, setForm] = useState({ 
    name: '', 
    line: '', 
    city: '', 
    postalcode: '' 
  });

  // Function to add a new address to the list
  const add = () => {
    // Validation to check if required fields are filled
    if(!form.name || !form.line) {
      return alert("Please fill details");
    }

    // Adding new address to the state with a unique ID
    setAddresses(prev => [...prev, { ...form, id: Date.now() }]);

    // Resetting the form fields after successful addition
    setForm({ name: '', line: '', city: '', postalcode: '' });
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="container address-page" style={{padding: '40px 20px', maxWidth: '1000px', margin: '0 auto'}}>
        <h2>Shipping Address</h2>
        <div className="row" style={{display: 'flex', gap: '30px', marginTop: '20px'}}>
          
          {/* Section 1: Displaying Saved Addresses */}
          <div className="col card" style={{flex: 1, padding: '20px', border: '1px solid #eee'}}>
            <h3>Saved Addresses</h3>
            {addresses.length > 0 ? (
              addresses.map(a => (
                <div key={a.id} className="address-card" style={{padding: '10px', border: '1px solid #6d4c41', marginBottom: '10px', borderRadius: '8px'}}>
                  <strong>{a.name}</strong>
                  <div>{a.line}, {a.city} - {a.pincode}</div>
                  <button className="btn-select" onClick={() => navigate('/payment')} style={{marginTop: '10px', cursor: 'pointer'}}>
                    Deliver Here
                  </button>
                </div>
              ))
            ) : (
              <p style={{color: '#888', textAlign: 'center'}}>No addresses saved yet.</p>
            )}
          </div>

          {/* Section 2: Form to Add a New Address */}
          <div className="col card" style={{flex: 1, padding: '20px', border: '1px solid #eee'}}>
            <h3>Add New Address</h3>
            <div className="form-group">
              <label>Recipient's Full Name</label>
              <input 
                style={{width:'100%', marginBottom:'10px'}} 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input 
                style={{width:'100%', marginBottom:'10px'}} 
                value={form.line} 
                onChange={(e) => setForm({ ...form, line: e.target.value })} 
              />
            </div>
            <div className="form-row" style={{display: 'flex', gap: '10px'}}>
              <div className="form-group" style={{flex: 1}}>
                <label>City</label>
                <input 
                  style={{width:'100%', marginBottom:'10px'}} 
                  value={form.city} 
                  onChange={(e) => setForm({ ...form, city: e.target.value })} 
                />
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Postal Code</label>
                <input 
                  style={{width:'100%', marginBottom:'10px'}} 
                  value={form.pincode} 
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })} 
                />
              </div>
            </div>
            <button className="btn-primary" onClick={add} style={{width: '100%', padding: '10px', cursor: 'pointer'}}>
              Add Address
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}