import { api, apiRequest } from './client';

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category API Service
export const categoryService = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    return apiRequest(api.get<Category[]>('/categories'));
  },

  // Get active categories only
  async getActiveCategories(): Promise<Category[]> {
    return apiRequest(api.get<Category[]>('/categories/active'));
  },

  // Get single category by ID
  async getCategory(id: string): Promise<Category> {
    return apiRequest(api.get<Category>(`/categories/${id}`));
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category> {
    return apiRequest(api.get<Category>(`/categories/slug/${slug}`));
  },
};