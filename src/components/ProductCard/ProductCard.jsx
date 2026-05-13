import React from "react";
import "./ProductCard.css";

/**
 * Reusable Product Card Component
 * Managed colors: #6A4E42 (Primary), #F2E9E1 (Light)
 */
export default function ProductCard({ product, onAdd }) {
  // Destructuring for cleaner code
  const { image, title, shop, price } = product;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-details">
        <h3 className="product-title">{title}</h3>

        {/* Shop Attribution */}
        {shop && <p className="product-vendor">By {shop}</p>}

        <div className="product-footer">
          <p className="product-price">LKR {price.toLocaleString()}</p>
          <button
            className="add-to-cart-btn"
            onClick={() => onAdd(product)}
            aria-label={`Add ${title} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}