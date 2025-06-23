"use client";

import { useCart } from "@/lib/cart-context";
import { useEffect, useState } from "react";

export function CartCount() {
  const { getTotalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const itemCount = getTotalItems();
  
  if (itemCount === 0) {
    return null;
  }

  return (
    <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-3.5 w-3.5 md:h-4 md:w-4 bg-gray-900 text-white text-[9px] md:text-[10px] rounded-full flex items-center justify-center font-medium">
      {itemCount}
    </span>
  );
}