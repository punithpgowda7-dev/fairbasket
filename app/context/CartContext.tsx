'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  finalPrice: number; // We will store the calculated price
  category: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart from local storage on start
  useEffect(() => {
    const stored = localStorage.getItem('transtore_cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('transtore_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    // Prevent duplicates (optional, but good for simple carts)
    if (!cart.find(item => item._id === product._id)) {
      setCart([...cart, product]);
    } else {
      alert("Item is already in your cart!");
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}