"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { useProducts, useFeaturedProducts } from "@/lib/hooks/useProducts";
import { useCategories } from "@/lib/hooks/useCategories";
import { Loader2 } from "lucide-react";

export default function ProductsPageWithAPI() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [page, setPage] = useState(1);

  // Fetch products with filters
  const { data, loading, error } = useProducts({
    page,
    limit: 12,
    category: selectedCategory,
    sort: sortBy,
  });

  // Fetch categories for filter
  const { categories } = useCategories();

  // Fetch featured products
  const { products: featuredProducts } = useFeaturedProducts();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Bir hata oluştu</p>
          <p className="text-neutral-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
      {/* Premium Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/50 via-transparent to-neutral-100/30" />
        <div className="container mx-auto px-6 py-20 relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extralight text-neutral-900 mb-6"
          >
            Ürünlerimiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-600 font-extralight text-lg"
          >
            Geleneksel lezzetler, modern sunum
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Filters */}
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data?.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    category={product.category}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {data && data.total > data.limit && (
              <div className="mt-16 flex justify-center gap-2">
                {Array.from({ length: Math.ceil(data.total / data.limit) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-full transition-all duration-300 ${
                      page === i + 1
                        ? "bg-neutral-900 text-white"
                        : "bg-white border border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}