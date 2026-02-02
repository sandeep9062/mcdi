'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, DentistRegistration, Note } from '@/types/types';

interface CartItem {
  course?: Course;
  dentistRegistration?: DentistRegistration;
  note?: Note;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Course | DentistRegistration | Note) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (item: Course | DentistRegistration | Note) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => {
        if (cartItem.course) return cartItem.course.id === item.id;
        if (cartItem.dentistRegistration) return cartItem.dentistRegistration.id === item.id;
        if (cartItem.note) return cartItem.note.id === item.id;
        return false;
      });

      if (existingItem) {
        return prevItems.map((cartItem) => {
          const matches = 
            (cartItem.course?.id === item.id) || 
            (cartItem.dentistRegistration?.id === item.id) || 
            (cartItem.note?.id === item.id);
          
          return matches ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem;
        });
      }

      if ('category' in item) {
        if ('mode' in item && ['Online', 'Offline', 'Hybrid'].includes(item.mode)) {
          return [...prevItems, { dentistRegistration: item as DentistRegistration, quantity: 1 }];
        }
        return [...prevItems, { course: item as Course, quantity: 1 }];
      }
      
      return [...prevItems, { note: item as Note, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => {
      if (item.course) return item.course.id !== itemId;
      if (item.dentistRegistration) return item.dentistRegistration.id !== itemId;
      if (item.note) return item.note.id !== itemId;
      return true;
    }));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => {
        const matches = 
          (item.course?.id === itemId) || 
          (item.dentistRegistration?.id === itemId) || 
          (item.note?.id === itemId);
          
        return matches ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      if (item.course) return total + item.course.price * item.quantity;
      if (item.dentistRegistration) return total + item.dentistRegistration.price * item.quantity;
      if (item.note) return total + item.note.price * item.quantity;
      return total;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
