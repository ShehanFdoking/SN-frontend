import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const updateCart = useCallback((cartData) => {
    setCart(cartData);
    setCartCount(cartData?.items?.length || 0);
  }, []);

  const addItem = useCallback((item) => {
    setCart(prevCart => {
      if (!prevCart) {
        return { items: [item], totalPrice: item.price * item.quantity };
      }
      const existingItem = prevCart.items.find(i => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        prevCart.items.push(item);
      }
      prevCart.totalPrice = prevCart.items.reduce((total, i) => total + i.price * i.quantity, 0);
      return { ...prevCart };
    });
    setCartCount(prevCount => prevCount + 1);
  }, []);

  const removeItem = useCallback((productId) => {
    setCart(prevCart => {
      prevCart.items = prevCart.items.filter(i => i.productId !== productId);
      prevCart.totalPrice = prevCart.items.reduce((total, i) => total + i.price * i.quantity, 0);
      return { ...prevCart };
    });
    setCartCount(prevCount => Math.max(0, prevCount - 1));
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], totalPrice: 0 });
    setCartCount(0);
  }, []);

  const value = {
    cart,
    cartCount,
    updateCart,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
