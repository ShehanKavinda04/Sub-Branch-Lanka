import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserTag, FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./AuthModal.css";

/**
 * AuthModal Component
 * Modes: login | register | forgot | otp | reset
 */
export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthAction = (e) => {
    e.preventDefault();
    // Role-based redirection logic
    if (formData.role === "seller") {
      navigate("/seller-dashboard");
    } else {
      navigate("/home");
    }
    onClose();
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setShowPassword(false); // Reset password visibility when switching
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>&times;</button>
        
        {/* Render different UI based on 'mode' */}
        <div className="auth-body">
          {mode === "login" && (
            <LoginForm 
              formData={formData} 
              handleChange={handleChange} 
              onSubmit={handleAuthAction} 
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onSwitch={() => switchMode("register")}
              onForgot={() => switchMode("forgot")}
            />
          )}

          {mode === "register" && (
            <RegisterForm 
              formData={formData} 
              handleChange={handleChange} 
              onSubmit={handleAuthAction} 
              onSwitch={() => switchMode("login")}
            />
          )}

          {mode === "forgot" && (
            <ForgotForm 
              handleChange={handleChange} 
              onSend={() => switchMode("otp")} 
              onBack={() => switchMode("login")} 
            />
          )}

          {mode === "otp" && (
            <OtpForm 
              otp={otp} 
              setOtp={setOtp} 
              onVerify={() => switchMode("reset")} 
            />
          )}

          {mode === "reset" && (
            <ResetForm 
              handleChange={handleChange} 
              onReset={() => switchMode("login")} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* --- Modular Sub-Components --- */

const LoginForm = ({ formData, handleChange, onSubmit, showPassword, setShowPassword, onSwitch, onForgot }) => (
  <>
    <h2 className="auth-title">Welcome Back</h2>
    <p className="auth-subtitle">Login to continue your artisan journey</p>
    <form onSubmit={onSubmit} className="auth-form-fields">
      <div className="custom-input-group">
        <FaEnvelope className="input-icon" />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
      </div>
      <div className="custom-input-group">
        <FaLock className="input-icon" />
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required onChange={handleChange} />
        <span className="pwd-toggle" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <span className="forgot-password-link" onClick={onForgot}>Forgot Password?</span>
      <button className="btn-auth-primary">Login</button>
    </form>
    <div className="auth-divider"><span>OR</span></div>
    <button className="btn-google-auth"><FcGoogle /> Continue with Google</button>
    <p className="auth-footer-text">New to Ceylon Made? <span onClick={onSwitch}>Create Account</span></p>
  </>
);

const RegisterForm = ({ formData, handleChange, onSubmit, onSwitch }) => (
  <>
    <h2 className="auth-title">Create Account</h2>
    <p className="auth-subtitle">Join our handmade community</p>
    <form onSubmit={onSubmit} className="auth-form-fields">
      <div className="custom-input-group"><FaUser className="input-icon"/><input type="text" name="name" placeholder="Full Name" required onChange={handleChange} /></div>
      <div className="custom-input-group"><FaEnvelope className="input-icon"/><input type="email" name="email" placeholder="Email" required onChange={handleChange} /></div>
      <div className="custom-input-group"><FaLock className="input-icon"/><input type="password" name="password" placeholder="Password" required onChange={handleChange} /></div>
      <div className="custom-input-group">
        <FaUserTag className="input-icon"/>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="buyer">Buyer (I want to shop)</option>
          <option value="seller">Seller (I want to sell)</option>
        </select>
      </div>
      <button className="btn-auth-primary">Register</button>
    </form>
    <p className="auth-footer-text">Already have an account? <span onClick={onSwitch}>Login here</span></p>
  </>
);

const ForgotForm = ({ handleChange, onSend, onBack }) => (
  <>
    <h2 className="auth-title">Recovery</h2>
    <p className="auth-subtitle">We'll send an OTP to your email</p>
    <form onSubmit={(e) => { e.preventDefault(); onSend(); }} className="auth-form-fields">
      <div className="custom-input-group"><FaEnvelope className="input-icon"/><input type="email" name="email" placeholder="Registered Gmail" required onChange={handleChange} /></div>
      <button className="btn-auth-primary">Send Reset Link</button>
      <p className="auth-footer-text"><span onClick={onBack}>Back to Login</span></p>
    </form>
  </>
);

const OtpForm = ({ otp, setOtp, onVerify }) => (
  <>
    <h2 className="auth-title">Verify OTP</h2>
    <p className="auth-subtitle">Enter the 6-digit code sent to your inbox</p>
    <form onSubmit={(e) => { e.preventDefault(); onVerify(); }} className="auth-form-fields">
      <div className="custom-input-group"><FaKey className="input-icon"/><input type="text" maxLength="6" placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} required /></div>
      <button className="btn-auth-primary">Verify & Proceed</button>
    </form>
  </>
);

const ResetForm = ({ handleChange, onReset }) => (
  <>
    <h2 className="auth-title">New Password</h2>
    <form onSubmit={(e) => { e.preventDefault(); onReset(); }} className="auth-form-fields">
      <div className="custom-input-group"><FaLock className="input-icon"/><input type="password" name="password" placeholder="New Password" required onChange={handleChange} /></div>
      <div className="custom-input-group"><FaLock className="input-icon"/><input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} /></div>
      <button className="btn-auth-primary">Update Password</button>
    </form>
  </>
);