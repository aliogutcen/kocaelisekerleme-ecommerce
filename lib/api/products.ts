import { api, apiRequest } from './client';

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  sku: string;
  barcode: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    parent_id: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
  };
  brand: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo: string | null;
    website: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  price: string;
  compare_price: string | null;
  quantity: number;
  in_stock: boolean;
  track_quantity: boolean;
  allow_backorder: boolean;
  featured: boolean;
  digital: boolean;
  downloadable: boolean;
  weight: number;
  dimensions: {
    length: number | null;
    width: number | null;
    height: number | null;
  };
  images: string[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  variants: any[];
  rating: {
    average: number;
    count: number;
  };
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Product API Service
export const productService = {
  // Get all products with pagination and filters
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
  }): Promise<ProductListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sort) queryParams.append('sort', params.sort);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    return apiRequest(api.get<ProductListResponse>(`/products${query}`));
  },

  // Get single product by ID
  async getProduct(id: string): Promise<Product> {
    return apiRequest(api.get<Product>(`/products/${id}`));
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiRequest(api.get<Product[]>(`/products/category/${category}`));
  },

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    return apiRequest(api.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`));
  },

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    return apiRequest(api.get<Product[]>('/products/featured'));
  },
};