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
    <span className="absolute -top-2 -right-2 h-4 w-4 bg-gray-900 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
      {itemCount}
    </span>
  );
}