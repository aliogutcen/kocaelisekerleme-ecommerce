"use client";

import { useState, useEffect } from 'react';
import { categoryService, Category } from '@/lib/api/categories';

// Hook for fetching all categories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await categoryService.getActiveCategories();
        setCategories(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Hook for fetching single category
export function useCategory(slug: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchCategory() {
      try {
        setLoading(true);
        const response = await categoryService.getCategoryBySlug(slug);
        setCategory(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch category'));
        setCategory(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCategory();
  }, [slug]);

  return { category, loading, error };
}