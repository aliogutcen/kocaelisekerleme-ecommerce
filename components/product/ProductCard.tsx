"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { AddToCartButton } from "./AddToCartButton";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    compare_price?: string | null;
    images: string[];
    category: {
      name: string;
      slug: string;
    };
    brand: {
      name: string;
    };
    rating?: {
      average: number;
      count: number;
    };
    tags?: Array<{
      name: string;
      slug: string;
    }>;
    in_stock: boolean;
  };
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const price = parseFloat(product.price);
  const comparePrice = product.compare_price ? parseFloat(product.compare_price) : null;
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const isNew = product.tags?.some(tag => tag.slug === 'yeni');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden bg-white border border-neutral-100 hover:border-neutral-200 transition-all duration-500 group">
          {/* Image Container */}
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-neutral-50 to-white">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-neutral-200 stroke-[0.5]" />
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {isNew && (
                <span className="px-3 py-1 bg-neutral-900 text-white text-[10px] font-light tracking-wider uppercase">
                  Yeni
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-light tracking-wider">
                  %{discount}
                </span>
              )}
            </div>

            {/* Quick Add Button - Shows on hover */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <div onClick={(e) => e.preventDefault()}>
                <AddToCartButton
                  productId={product.id}
                  size="sm"
                  fullWidth
                  className="h-10 bg-white/95 backdrop-blur-sm text-neutral-900 hover:bg-neutral-900 hover:text-white border border-neutral-200"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5">
            {/* Category & Brand */}
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-light">
                {product.category.name}
              </p>
              <span className="text-neutral-300">•</span>
              <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-light">
                {product.brand.name}
              </p>
            </div>

            {/* Product Name */}
            <h3 className="text-sm font-light text-neutral-900 mb-3 line-clamp-2 leading-relaxed">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < Math.floor(product.rating.average)
                          ? "fill-neutral-900 text-neutral-900"
                          : "fill-transparent text-neutral-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-neutral-500">
                  ({product.rating.count})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-light text-neutral-900">
                ₺{price.toFixed(2)}
              </span>
              {comparePrice && (
                <span className="text-sm text-neutral-400 line-through font-light">
                  ₺{comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            {!product.in_stock && (
              <p className="text-[10px] text-red-600 mt-2 font-light">
                Stokta Yok
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}