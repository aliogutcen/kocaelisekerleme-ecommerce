import { api, apiRequest } from './client';

// Cart Types
export interface CartItem {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    images: string[];
  };
  quantity: number;
  price: string;
  total: string;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totals: CartTotals;
}

// Cart API Service
export const cartService = {
  // Get cart
  async getCart(): Promise<Cart> {
    return apiRequest(api.get<Cart>('/cart'));
  },

  // Add item to cart
  async addItem(productId: string, quantity: number = 1, variantId?: string): Promise<CartItem> {
    return apiRequest(api.post<CartItem>('/cart/items', {
      product_id: productId,
      quantity,
      variant_id: variantId || null
    }));
  },

  // Update cart item quantity
  async updateItem(itemId: string, quantity: number): Promise<CartItem> {
    return apiRequest(api.put<CartItem>(`/cart/items/${itemId}`, { quantity }));
  },

  // Remove item from cart
  async removeItem(itemId: string): Promise<void> {
    return apiRequest(api.delete(`/cart/items/${itemId}`));
  },

  // Clear cart
  async clearCart(): Promise<void> {
    return apiRequest(api.delete('/cart'));
  },

  // Get cart totals
  async getTotals(): Promise<CartTotals> {
    return apiRequest(api.get<CartTotals>('/cart/totals'));
  },
};