import React, { useState, useEffect } from 'react'; // useEffect එකතු කළා
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryDetails.css';
import potImg from "../../assets/pottery.jpg";

const CategoryDetail = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Temporary Mock Data Loader ---
  useEffect(() => {
    // This simulates a backend API call
    const fetchCategoryProducts = () => {
      setLoading(true);
      
      // Temporary data for testing (In future, replace this with your Spring Boot API call)
      const mockData = [
        { id: 1, title: "Hand Painted Talavera Vase", shop: "Pottery Shop", price: 1500, rating: 5, image: potImg },
        { id: 2, title: "Decorative Toucan Vase", shop: "Lanka Pottery", price: 1800, rating: 4, image: potImg },
        { id: 3, title: "Traditional Clay Pot", shop: "Craft Home", price: 1200, rating: 5, image: potImg },
        { id: 4, title: "Modern Ceramic Bowl", shop: "Lanka Pottery", price: 2500, rating: 4, image: potImg },
      ];

      // Simulating a small delay like a real network
      setTimeout(() => {
        setProducts(mockData);
        setLoading(false);
      }, 500); 
    };

    fetchCategoryProducts();
  }, [categoryName]); // Reloads when the category changes

  const displayTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : "Products";

  return (
    <div className="category-detail-page">
      <div className="container">
        <header className="category-detail-header">
          <h1>Explore Our {displayTitle}</h1>
          <p>Find the perfect handmade item from Sri Lankan artisans.</p>
        </header>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((p) => (
                <div key={p.id} className="detail-product-card">
                  <div className="detail-img-wrapper">
                    <img src={p.image} alt={p.title} />
                  </div>
                  <div className="detail-info">
                    <h3 className="p-title">{p.title}</h3>
                    <p className="shop-name">{p.shop}</p>
                    <div className="price-rating">
                      <span className="price">LKR {p.price.toLocaleString()}</span>
                      <div className="stars">
                        {"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}
                      </div>
                    </div>
                    <button 
                      className="shop-now-btn" 
                      onClick={() => navigate(`/product/${p.id}`)}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;