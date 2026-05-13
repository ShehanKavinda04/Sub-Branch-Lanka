import React, { useState } from "react";
import "./SellerProducts.css";

const SellerProducts = () => {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState([]); // data passe add karanna

  return (
    <div className="sub-page-container">
      <header className="sub-page-header">
        <div>
          <h2>Product Management</h2>
          <p>View, Edit and Manage all your handmade product listings.</p>
        </div>
        <button className="action-btn-primary">+ Add New Product</button>
      </header>

      <div className="filter-bar">
        {/* Filter by Status */}
        <select className="filter-select">
          <option value="">Filter by Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending Review</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="draft">Draft</option>
        </select>

        {/* Filter by Categories */}
        <select className="filter-select">
          <option value="">Filter by Categories</option>
          <option value="wood-carvings">Wood Carvings</option>
          <option value="batik-textiles">Batik & Textiles</option>
          <option value="pottery">Pottery</option>
          <option value="jewellery">Jewellery</option>
          <option value="flower-bouquets">Flower Bouquets</option>
          <option value="coconut-shell">Coconut Shell Products</option>
          <option value="candles">Candles</option>
          <option value="wedding-stationary">Wedding Stationary & Cake Boxes</option>
          <option value="hakuru">Hakuru</option>
          <option value="beeralu-lace">Beeralu Lace</option>
          <option value="resin-art">Resin Art</option>
          <option value="photo-frames">Photo Frames</option>
          <option value="note-books">Note Books</option>
          <option value="lacquer-work">Lacquer Work (Laksha)</option>
          <option value="drums">Drums</option>
          <option value="dumbara-weaves">Dumbara Weaves</option>
          <option value="brass-work">Brass Work</option>
          <option value="greeting-cards">Greeting Cards & Gift Boxes</option>
          <option value="masks">Masks</option>
          <option value="pencil-arts">Pencil Arts</option>
        </select>

        <input type="text" placeholder="Search product..." className="search-input-sub" />
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, i) => (
                <tr key={i}>
                  <td><input type="checkbox" /></td>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td><span className={`status-tag ${p.status}`}>{p.status}</span></td>
                  <td><button className="edit-btn">Edit</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-table-msg">No products added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts;