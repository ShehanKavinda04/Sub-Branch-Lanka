import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ProductCard from "../../components/ProductCard/ProductCard";
import HeroSection from "../../components/HeroSection/HeroSection";
import DailyDeals from "../../components/DailyDeals/DailyDeals";

// Assets & Data
import { categoriesData, getFakeProducts } from "./LandingPageData";
import landingImg from "../../assets/landing.jpg";
import "./LandingPage.css";

/**
 * LandingPage Component
 * branding: Ceylon Made - Artisan Marketplace
 */
const LandingPage = ({ onAuthOpen }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching mock data for featured products
    setProducts(getFakeProducts());
  }, []);

  const handleAddToCart = (product) => {
    // Logic for adding product to cart context
    console.log("Adding to cart:", product.title);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${categoryName.toLowerCase()}`);
  };

  return (
    <main className="landing-container">
      {/* Hero Section with Call to Action */}
      <HeroSection image={landingImg} onShopNowClick={onAuthOpen} />

      {/* Promotional Section */}
      <DailyDeals />

      {/* Shop by Category - Horizontal Scroll */}
      <section className="category-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <button className="view-all-link" onClick={() => navigate("/categories")}>
            View All &rarr;
          </button>
        </div>
        
        <div className="scroll-wrapper">
          {categoriesData.map((cat) => (
            <div 
              key={cat.id} 
              className="category-item" 
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="image-holder">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <div className="overlay-label">
                  <span>{cat.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products - Responsive Grid */}
      <section className="featured-section">
        <h2 className="section-title">Featured Products</h2> 
        <div className="product-layout-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;