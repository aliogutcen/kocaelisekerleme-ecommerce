"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Plus, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  variantId?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  fullWidth?: boolean;
}

export function AddToCartButton({
  productId,
  quantity = 1,
  variantId,
  size = "md",
  className,
  showIcon = true,
  fullWidth = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await addItem(productId, quantity, variantId);
      setSuccess(true);
      
      // Reset success state after animation
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setError("Ürün sepete eklenemedi");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-4 text-sm",
    lg: "h-14 px-6",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(fullWidth && "w-full")}
    >
      <Button
        onClick={handleAddToCart}
        disabled={loading || success}
        className={cn(
          "bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-widest uppercase transition-all duration-500 relative overflow-hidden group",
          sizeClasses[size],
          fullWidth && "w-full",
          success && "bg-emerald-600 hover:bg-emerald-600",
          error && "bg-red-600 hover:bg-red-600",
          className
        )}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[11px]">Ekleniyor...</span>
            </motion.div>
          ) : success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span className="text-[11px]">Sepete Eklendi</span>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[11px]"
            >
              {error}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              {showIcon && <Plus className="w-4 h-4" />}
              <span className="text-[11px]">Sepete Ekle</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </Button>
    </motion.div>
  );
}