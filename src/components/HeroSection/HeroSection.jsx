import React from "react";
import "./HeroSection.css";

/**
 * HeroSection Component
 * Featuring high-impact branding for Ceylon Made
 */
const HeroSection = ({ image, onShopNowClick }) => {
  return (
    <section 
      className="hero-container" 
      style={{ backgroundImage: `url(${image})` }}
      aria-label="Ceylon Made Hero Banner"
    >
      <div className="hero-scrim"></div>
      
      <div className="hero-inner-content">
        <h1 className="hero-headline">
          Discover the Soul of <br /> 
          <span>Sri Lankan Craftsmanship</span>
        </h1>
        <p className="hero-subtext">
          Unique, handmade treasures delivered to your doorstep.
        </p>
        <button className="hero-primary-btn" onClick={onShopNowClick}>
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;