"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cartService, CartItem, CartTotals } from "@/lib/api/cart";

export interface CartContextType {
  items: CartItem[];
  totals: CartTotals | null;
  loading: boolean;
  error: string | null;
  addItem: (productId: string, quantity?: number, variantId?: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<CartTotals | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cart = await cartService.getCart();
      setItems(cart.items || []);
      
      // Also fetch totals
      const cartTotals = await cartService.getTotals();
      setTotals(cartTotals);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Sepet yüklenemedi");
      // If error, try to load from localStorage as fallback
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const localItems = JSON.parse(savedCart);
        setItems(localItems);
      }
    } finally {
      setLoading(false);
    }
  };

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load cart on mount (only on client side)
  useEffect(() => {
    if (mounted) {
      setLoading(true);
      fetchCart();
    }
  }, [mounted]);

  // Save to localStorage as backup
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, loading]);

  const addItem = async (productId: string, quantity: number = 1, variantId?: string) => {
    try {
      setError(null);
      const newItem = await cartService.addItem(productId, quantity, variantId);
      
      // Refresh cart to get updated totals
      await fetchCart();
    } catch (err) {
      console.error("Failed to add item:", err);
      setError("Ürün sepete eklenemedi");
      throw err;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setError(null);
      await cartService.removeItem(itemId);
      
      // Update local state immediately for better UX
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      
      // Refresh cart to get updated totals
      await fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
      setError("Ürün silinemedi");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }
    
    try {
      setError(null);
      await cartService.updateItem(itemId, quantity);
      
      // Update local state immediately for better UX
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      
      // Refresh cart to get updated totals
      await fetchCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setError("Miktar güncellenemedi");
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      await cartService.clearCart();
      setItems([]);
      setTotals(null);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Failed to clear cart:", err);
      setError("Sepet temizlenemedi");
    }
  };

  const getTotalPrice = () => {
    if (totals) {
      return totals.total;
    }
    // Fallback calculation
    return items.reduce((total, item) => {
      const itemTotal = parseFloat(item.total || item.price) * (item.quantity || 1);
      return total + itemTotal;
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        loading,
        error,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        refreshCart: fetchCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}