import React, { createContext, useContext, useState, useMemo } from 'react';
import type { CartItem, Edition } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Edition, quantity: number) => void;
  updateQuantity: (issue: number, newQuantity: number) => void;
  removeFromCart: (issue: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Edition, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.issue === item.issue);
      if (existingItem) {
        return prevItems.map(i =>
          i.issue === item.issue
            // Define a quantidade em vez de adicionar a ela.
            ? { ...i, quantity: quantity }
            : i
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
  };

  const updateQuantity = (issue: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(issue);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.issue === issue ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (issue: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.issue !== issue));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const { totalItems, subtotal, shippingCost, total } = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    let shippingCost = 0;
    if (totalItems > 0) {
      const baseShipping = 10.00;
      const additionalShippingPerItem = 5.00;
      shippingCost = baseShipping + (totalItems - 1) * additionalShippingPerItem;
    }

    const total = subtotal + shippingCost;
    return { totalItems, subtotal, shippingCost, total };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    shippingCost,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};