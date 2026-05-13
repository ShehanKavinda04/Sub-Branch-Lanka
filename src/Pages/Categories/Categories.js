import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

// images import
import wood from '../../assets/wood.jpg';
import batik from '../../assets/batik.jpg';
import pottery from '../../assets/pottery.jpg';
import jewellery from '../../assets/jewellery.jpg';
import flowers from '../../assets/flowers.jpg';
import candles from '../../assets/candles.jpg';
import wedding from '../../assets/wedding.jpg';
import Hakuru from '../../assets/Hakuru.jpg';
import Beeralu from '../../assets/Beeralu.jpg';
import resin from '../../assets/resin.jpg';
import Frames from '../../assets/Frames.jpg';
import Notebook from '../../assets/Notebook.jpg';
import Laksha from '../../assets/Laksha.jpg';
import Drums from '../../assets/Drums.jpg';
import coconutshell from '../../assets/coconutshell.jpg';
import Brass from '../../assets/Brass.jpg';
import Cards from '../../assets/Cards.jpg';
import masks from '../../assets/masks.jpg';
import stationery from '../../assets/stationery.jpg';

/**
 * Categories Page Component
 * Note: Data kept as default per user requirement.
 */
const Categories = () => {
  const navigate = useNavigate();

  const categoryData = [
    { id: 1, title: 'Wood Carvings', slug: 'woodwork', items: ['Masks', 'Statues', 'Decorative Boxes'], img: wood },
    { id: 2, title: 'Batik & Textiles', slug: 'batik', items: ['Sarees', 'Wall Hanging', 'Clothing'], img: batik },
    { id: 3, title: 'Pottery & Ceramics', slug: 'pottery', items: ['Vases', 'Tableware', 'Clay Pots'], img: pottery },
    { id: 4, title: 'Jewellery', slug: 'jewellery', items: ['Necklaces', 'Earrings', 'Bracelets'], img: jewellery },
    { id: 5, title: 'Flower Bouquets', slug: 'flowers', items: ['Fresh Flowers', 'Decorative Bunches'], img: flowers },
    { id: 6, title: 'Candles', slug: 'candles', items: ['Scented Candles', 'Handmade Wax'], img: candles },
    { id: 7, title: 'Wedding Stationery', slug: 'wedding', items: ['Cake Boxes', 'Invitations'], img: wedding },
    { id: 8, title: 'Traditional Foods', slug: 'hakuru', items: ['Hakuru (Jaggery)', 'Sweetmeats'], img: Hakuru },
    { id: 9, title: 'Beeralu Lace', slug: 'beeralu', items: ['Handmade Lace', 'Table Linen'], img: Beeralu },
    { id: 10, title: 'Resin Art', slug: 'resin', items: ['Coasters', 'Wall Decor'], img: resin },
    { id: 11, title: 'Photo Frames', slug: 'frames', items: ['Wooden Frames', 'Custom Frames'], img: Frames },
    { id: 12, title: 'Note Books', slug: 'notebooks', items: ['Handmade Paper', 'Journals'], img: Notebook },
    { id: 13, title: 'Lacquer Work', slug: 'laksha', items: ['Traditional Laksha', 'Walking Sticks'], img: Laksha },
    { id: 14, title: 'Traditional Drums', slug: 'drums', items: ['Geta Beraya', 'Yak Beraya'], img: Drums },
    { id: 15, title: 'Coconut Shell Art', slug: 'coconutshell', items: ['Spoons', 'Ornaments'], img: coconutshell },
    { id: 16, title: 'Brass Work', slug: 'brass', items: ['Oil Lamps', 'Wall Plaques'], img: Brass },
    { id: 17, title: 'Greeting Cards', slug: 'cards', items: ['Hand-painted Cards', 'Birthday Cards'], img: Cards },
    { id: 18, title: 'Traditional Masks', slug: 'masks', items: ['Raksha Masks', 'Sanni Masks'], img: masks },
    { id: 19, title: 'Snacks', slug: 'snacks', items: ['Home Made Snacks', 'Sweets'], img: stationery },
  ];

  return (
    <div className="categories-page-wrapper">
      <header className="categories-page-header">
        <h1 className="main-title">Explore Our Categories</h1>
        <p className="sub-title">Find the perfect handmade item by browsing our curated collections of Sri Lankan crafts.</p>
      </header>

      <div className="categories-layout-grid">
        {categoryData.map((cat) => (
          <article key={cat.id} className="category-explorer-card">
            <div className="category-img-container">
              <img src={cat.img} alt={cat.title} loading="lazy" />
            </div>
            
            <div className="category-info">
              <h3 className="category-name">{cat.title}</h3>
              <ul className="category-item-list">
                {cat.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button 
                className="category-view-btn" 
                onClick={() => navigate(`/categories/${cat.slug}`)}
              >
                View Collection <span className="arrow">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Categories;