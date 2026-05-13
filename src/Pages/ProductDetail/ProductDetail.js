import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './ProductDetail.css';
import potImg from "../../assets/pottery.jpg";

const ProductDetail = () => {
  const { productId } = useParams();
  
  // Destructuring with a fallback to avoid "undefined" errors
  const cartContext = useCart();
  const addToCart = cartContext?.addToCart;
  const addToWishlist = cartContext?.addToWishlist;
  
  const [quantity, setQuantity] = useState(1);
  const [isFlying, setIsFlying] = useState(false);
  const [flyTarget, setFlyTarget] = useState({ x: 0, y: 0 });

  const productData = {
    id: productId || "p-001",
    name: "Hand Painted Talavera Brown & White Vase",
    price: 1500,
    image: potImg,
    seller: "Pottery Shop by Anusha Perera",
    description: "This exquisite vase is handcrafted with care by a skilled artisan from Sri Lanka."
  };

  const handleAction = (targetId, type) => {
    const icon = document.getElementById(targetId);

    // If icon is found, run the animation
    if (icon) {
      const rect = icon.getBoundingClientRect();
      setFlyTarget({ x: rect.left, y: rect.top });
      setIsFlying(true);

      setTimeout(() => {
        setIsFlying(false);
        executeCartLogic(type);
      }, 800);
    } else {
      // If icon is NOT found (ID missing in Header), still execute the logic
      console.warn(`Element with ID ${targetId} not found. Executing logic without animation.`);
      executeCartLogic(type);
    }
  };

  // Helper function to handle Context logic
  const executeCartLogic = (type) => {
    if (type === 'cart' && addToCart) {
      addToCart(productData, Number(quantity));
      alert(`${quantity} item(s) added to cart!`);
    } else if (type === 'wishlist' && addToWishlist) {
      addToWishlist();
      alert("Added to wishlist!");
    }
  };

  return (
    <div className="product-page-wrapper">
      <Header />

      {isFlying && (
        <img 
          src={potImg} 
          className="flying-item-anim" 
          style={{ '--tx': `${flyTarget.x}px`, '--ty': `${flyTarget.y}px` }}
          alt="anim"
        />
      )}

      <div className="product-detail-container">
        <div className="product-main-section">
          <div className="image-gallery">
            <img src={potImg} alt="Main" className="main-featured-img" />
            <div className="thumb-row">
              <img src={potImg} alt="thumb" /><img src={potImg} alt="thumb" /><img src={potImg} alt="thumb" />
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{productData.name}</h1>
            <p className="description-text">{productData.description}</p>
            <h2 className="price-tag">LKR {productData.price.toLocaleString()}</h2>
            
            <div className="qty-box">
              <span>Quantity:</span>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <div className="btn-group">
              <button className="add-cart-main-btn" onClick={() => handleAction('cart-icon', 'cart')}>
                Add to cart
              </button>
              <button className="heart-btn" onClick={() => handleAction('wishlist-icon', 'wishlist')}>
                ♥
              </button>
            </div>
          </div>
        </div>
        {/* ... Rest of the components (Reviews, Related) remain same */}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;