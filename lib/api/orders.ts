import { api, apiRequest } from './client';

// Order Types
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  zipCode: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerEmail: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'credit_card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod: 'credit_card' | 'bank_transfer';
}

// Order API Service
export const orderService = {
  // Create a new order
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    return apiRequest(api.post<Order>('/orders', orderData));
  },

  // Get order by ID
  async getOrder(orderId: string): Promise<Order> {
    return apiRequest(api.get<Order>(`/orders/${orderId}`));
  },

  // Get order by order number
  async getOrderByNumber(orderNumber: string): Promise<Order> {
    return apiRequest(api.get<Order>(`/orders/number/${orderNumber}`));
  },

  // Get customer orders (requires auth)
  async getMyOrders(): Promise<Order[]> {
    return apiRequest(api.get<Order[]>('/orders/my-orders'));
  },

  // Track order
  async trackOrder(orderNumber: string, email: string): Promise<Order> {
    return apiRequest(api.post<Order>('/orders/track', { orderNumber, email }));
  },

  // Cancel order
  async cancelOrder(orderId: string): Promise<Order> {
    return apiRequest(api.post<Order>(`/orders/${orderId}/cancel`, {}));
  },

  // Process payment for order
  async processPayment(orderId: string, paymentData: any): Promise<{
    success: boolean;
    transactionId?: string;
    message: string;
  }> {
    return apiRequest(api.post(`/orders/${orderId}/payment`, paymentData));
  },
};