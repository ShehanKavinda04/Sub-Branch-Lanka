import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Cart එකේ බඩු ලැයිස්තුව
  const [wishlistCount, setWishlistCount] = useState(0);

  // 1. භාණ්ඩයක් Cart එකට එකතු කිරීම (හෝ ඇති ප්‍රමාණය වැඩි කිරීම)
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const isExisting = prevItems.find(item => item.id === product.id);
      if (isExisting) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prevItems, { ...product, qty: quantity }];
    });
  };

  // 2. භාණ්ඩයක් Cart එකෙන් ඉවත් කිරීම (Optional - Delete button එක සඳහා)
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // 3. මුළු Cart එකම හිස් කිරීම (Payment එකෙන් පසු භාවිතා කිරීමට)
  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = () => setWishlistCount(prev => prev + 1);

  // Header badge එක සඳහා මුළු ප්‍රමාණය ගණනය කිරීම
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      wishlistCount, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      addToWishlist 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);