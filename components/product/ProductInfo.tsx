"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Star, Heart, Minus, Plus, Check, ShoppingBag, Leaf, Award, Shield, Package, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { AddToCartButton } from "@/components/product/AddToCartButton"


interface ProductSize {
  id: number
  size: string
  price: number
  available: boolean
  popular?: boolean
}

interface ProductHighlight {
  icon: React.ReactNode
  text: string
}

interface ProductInfoProps {
  product: {
    id: string
    name: string
    subtitle: string
    category: string
    price: number
    oldPrice?: number
    rating: number
    reviews: number
    sold: number
    inStock: boolean
    stockCount: number
    sizes: ProductSize[]
    highlights: ProductHighlight[]
    images?: { id: number; src: string; alt: string }[]
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false)
  const [reservationTimer, setReservationTimer] = useState<string | null>(null)
  
  const router = useRouter()
  const selectedPrice = product.sizes[selectedSize].price
  const selectedSizeData = product.sizes[selectedSize]

  const handleBuyNow = async () => {
    setIsProcessingCheckout(true)
    
    try {
      // Navigate to checkout page
      router.push('/checkout')
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsProcessingCheckout(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div>
          <p className="text-[11px] text-neutral-400 font-extralight tracking-[0.3em] uppercase mb-3">
            {product.category} Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-thin text-neutral-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg text-neutral-500 mt-2 font-extralight">{product.subtitle}</p>
        </div>

        {/* Rating & Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-neutral-900 text-neutral-900"
                      : "fill-transparent text-neutral-300"
                  )}
                />
              ))}
            </div>
            <span className="text-neutral-900">{product.rating}</span>
          </div>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-600 font-light">{product.reviews} Reviews</span>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-600 font-light">{product.sold.toLocaleString('en-US')} Sold</span>
        </div>
      </div>

      {/* Price - Luxury Style */}
      <div className="py-8 border-y border-neutral-100">
        <div className="flex items-end gap-6">
          <div>
            <p className="text-[11px] tracking-[0.3em] text-neutral-400 uppercase mb-3">Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-thin text-neutral-900">
                {selectedPrice.toFixed(2)}
              </span>
              <span className="text-sm font-extralight text-neutral-500 uppercase tracking-wider">TRY</span>
            </div>
          </div>
          {product.oldPrice && (
            <div className="pb-2">
              <span className="text-2xl text-neutral-300 line-through font-thin">
                {product.oldPrice.toFixed(2)}
              </span>
            </div>
          )}
        </div>
        {product.inStock && (
          <div className="flex items-center gap-2 mt-6">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-[11px] tracking-[0.2em] text-neutral-500 uppercase">
              In Stock • {product.stockCount} Available
            </p>
          </div>
        )}
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 gap-6">
        {product.highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-600">
              {highlight.icon}
            </div>
            <span className="text-sm text-neutral-600 font-light">{highlight.text}</span>
          </div>
        ))}
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <p className="text-[11px] font-light tracking-[0.3em] text-neutral-400 uppercase">Select Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size, index) => (
            <button
              key={size.id}
              onClick={() => size.available && setSelectedSize(index)}
              disabled={!size.available}
              className={cn(
                "relative px-6 py-3 border transition-all duration-300 min-w-[100px]",
                selectedSize === index
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 hover:border-neutral-400 bg-white",
                !size.available && "opacity-30 cursor-not-allowed"
              )}
            >
              {size.popular && (
                <div className="absolute -top-2 -right-2 bg-neutral-900 text-white w-5 h-5 rounded-full flex items-center justify-center">
                  <span className="text-[8px]">★</span>
                </div>
              )}
              <p className="text-sm font-light">{size.size}</p>
              <p className="text-[10px] mt-0.5 font-extralight opacity-60">{size.price} TL</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center border border-neutral-300">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-5 py-4 hover:bg-neutral-50 transition-all duration-200"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-8 py-4 text-sm font-light min-w-[80px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-5 py-4 hover:bg-neutral-50 transition-all duration-200"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">Total</p>
            <p className="text-lg font-extralight">{(selectedPrice * quantity).toFixed(2)} <span className="text-sm">TRY</span></p>
          </div>
        </div>

        <div className="flex gap-4">
          <AddToCartButton
            productId={product.id}
            quantity={quantity}
            size="lg"
            fullWidth
            className="flex-1 h-14 text-sm font-extralight tracking-[0.2em] hover:tracking-[0.3em]"
          />
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(
              "w-14 h-14 border flex items-center justify-center transition-all",
              isWishlisted 
                ? "border-neutral-900 bg-neutral-900 text-white" 
                : "border-neutral-300 hover:border-neutral-500"
            )}
          >
            <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
          </button>
        </div>

        <Button
          variant="outline"
          onClick={handleBuyNow}
          className="w-full h-14 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white text-sm font-extralight tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.3em]"
          disabled={!product.inStock || isProcessingCheckout}
        >
          {isProcessingCheckout ? (
            <span className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 animate-spin" />
              <span>İşleniyor...</span>
            </span>
          ) : (
            'Hemen Satın Al'
          )}
        </Button>
      </div>

      {/* Rezervasyon Timer */}
      {reservationTimer && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-amber-600" />
            <span className="text-amber-800">
              Ürününüz rezerve edildi. Kalan süre: <strong>{reservationTimer}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}