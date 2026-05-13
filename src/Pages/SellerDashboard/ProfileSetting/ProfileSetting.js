import React, { useState } from "react";
import "./ProfileSetting.css";

const ProfileSetting = () => {
  // imagewala link eka store karaganna 
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  // Device eken image ekak demmama eka show wenna
  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      // image eka tempory penna URL ekak hadagnna
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="profile-settings-container">
      <header className="profile-header">
        <h2>Seller Profile Settings</h2>
        <p>Manage your public store profile details, contact information, and business policies.</p>
      </header>

      {/* --- Profile Preview Section --- */}
      <section className="settings-section">
        <label className="section-title">Profile Preview</label>
        <div className="profile-preview-card">
          {/* selected karapu banner eka pennanna */}
          <div 
            className="preview-banner" 
            style={{ 
              backgroundImage: `url(${banner})`, 
              backgroundColor: banner ? 'transparent' : '#e0e0e0',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="preview-info">
            {/* selected karapu logo eka pennana */}
            <div 
              className="preview-avatar" 
              style={{ 
                backgroundImage: `url(${logo})`, 
                backgroundColor: logo ? 'transparent' : '#ccc',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="preview-text">
              <h4>Ceylon Crafts</h4>
              <p>Handmade with love in Sri Lanka.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Store Branding Section --- */}
      <section className="settings-section">
        <label className="section-title">Store Branding</label>
        <div className="branding-grid">
          
          {/* Logo Uploader */}
          <div className="upload-box">
            <p>Store Logo</p>
            <label className="upload-area">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, setLogo)} 
                hidden 
              />
              <div className="upload-placeholder">
                {logo ? (
                  <img src={logo} alt="Store Logo" className="uploaded-preview-img" />
                ) : (
                  <>
                    <span>Upload Logo</span>
                    <small>Recommended: 200x200px</small>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Banner Uploader */}
          <div className="upload-box">
            <p>Banner Image</p>
            <label className="upload-area">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, setBanner)} 
                hidden 
              />
              <div className="upload-placeholder banner">
                {banner ? (
                  <img src={banner} alt="Banner" className="uploaded-preview-img" />
                ) : (
                  <>
                    <span>Upload Banner</span>
                    <small>Recommended: 1200x300px</small>
                  </>
                )}
              </div>
            </label>
          </div>

        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Store Name</label>
            <input type="text" placeholder="Ceylon Crafts" />
          </div>
          <div className="input-group">
            <label>Tagline</label>
            <input type="text" placeholder="Handmade with love in Sri Lanka." />
          </div>
        </div>
        <div className="input-group full-width">
          <label>Store Description</label>
          <textarea placeholder="Tell your customers about your store, your craft, and your story..."></textarea>
        </div>
      </section>

      {/* --- Contact Information --- */}
      <section className="settings-section">
        <label className="section-title">Contact Information</label>
        <div className="input-row">
          <div className="input-group">
            <label>Business Email</label>
            <input type="email" placeholder="contact@ceyloncraft.lk" />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" placeholder="+94 77 123 4567" />
          </div>
        </div>
        <div className="toggle-group">
          <div className="toggle-label-wrap">
            <span>Show phone number on profile</span>
          </div>
          <input type="checkbox" className="toggle-switch" />
        </div>
      </section>

      {/* --- Social Media --- */}
      <section className="settings-section">
        <label className="section-title">Social Media</label>
        <div className="input-row">
          <div className="input-group">
            <label>Instagram</label>
            <div className="input-with-icon">
              <span className="at-icon"></span>
              <input type="text" placeholder="User Name" />
            </div>
          </div>
          <div className="input-group">
            <label>Facebook</label>
            <input type="text" placeholder="facebook.com/yourpage" />
          </div>
        </div>
      </section>

      {/* --- Business Policies --- */}
      <section className="settings-section">
        <label className="section-title">Business Policies</label>
        <div className="input-group full-width">
          <label>Shipping Policy</label>
          <textarea placeholder="Detail your shipping methods, processing times, and costs."></textarea>
        </div>
        <div className="input-group full-width">
          <label>Return & Refund Policy</label>
          <textarea placeholder="Explain your policy on returns, exchanges, and refunds."></textarea>
        </div>
        <div className="input-group full-width">
          <label>Payment Policy</label>
          <textarea placeholder="List the payment methods you accept."></textarea>
        </div>
      </section>

      {/* --- Form Actions --- */}
      <footer className="form-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-save">Save Changes</button>
      </footer>
    </div>
  );
};

export default ProfileSetting;