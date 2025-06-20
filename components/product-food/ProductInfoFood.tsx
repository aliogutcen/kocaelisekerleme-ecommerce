"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, Heart, Minus, Plus, ShoppingCart, Flame, Clock, Truck, ChefHat } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductSize {
  id: number
  size: string
  price: number
  available: boolean
  popular?: boolean
  calories?: string
}

interface ProductHighlight {
  icon: React.ReactNode
  text: string
}

interface ProductInfoProps {
  product: {
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
    preparationTime?: string
    spicyLevel?: number
  }
}

export function ProductInfoFood({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const selectedPrice = product.sizes[selectedSize].price

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div>
          <p className="text-xs text-red-600 font-medium tracking-wider uppercase mb-3">
            {product.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{product.subtitle}</p>
        </div>

        {/* Rating & Stats */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{product.reviews} Yorum</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{product.sold.toLocaleString('tr-TR')} Satış</span>
          {product.preparationTime && (
            <>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="text-gray-600">{product.preparationTime}</span>
              </div>
            </>
          )}
        </div>

        {/* Spicy Level */}
        {product.spicyLevel && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Acılık:</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Flame
                  key={i}
                  className={cn(
                    "h-4 w-4 transition-colors",
                    i < product.spicyLevel
                      ? "fill-red-500 text-red-500"
                      : "fill-transparent text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="py-8 border-y border-gray-100">
        <div className="flex items-end gap-6">
          <div>
            <p className="text-xs tracking-wider text-gray-500 uppercase mb-2">Fiyat</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-red-600">
                ₺{selectedPrice.toFixed(2)}
              </span>
            </div>
          </div>
          {product.oldPrice && (
            <div className="pb-2">
              <span className="text-2xl text-gray-400 line-through">
                ₺{product.oldPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm font-medium text-red-600">
                %{Math.round(((product.oldPrice - selectedPrice) / product.oldPrice) * 100)} İndirim
              </span>
            </div>
          )}
        </div>
        {product.inStock ? (
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-green-600 font-medium">
              Stokta • {product.stockCount} Adet
            </p>
          </div>
        ) : (
          <p className="text-sm text-red-600 font-medium mt-4">
            Stokta Yok
          </p>
        )}
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 gap-4">
        {product.highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
            <div className="text-red-600">
              {highlight.icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{highlight.text}</span>
          </div>
        ))}
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">Porsiyon Seçimi</p>
        <div className="grid grid-cols-3 gap-3">
          {product.sizes.map((size, index) => (
            <button
              key={size.id}
              onClick={() => size.available && setSelectedSize(index)}
              disabled={!size.available}
              className={cn(
                "relative p-4 border-2 rounded-xl transition-all duration-300",
                selectedSize === index
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-red-200 bg-white",
                !size.available && "opacity-50 cursor-not-allowed"
              )}
            >
              {size.popular && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 rounded-full">
                  <span className="text-[10px] font-bold">Popüler</span>
                </div>
              )}
              <p className="font-medium text-gray-900">{size.size}</p>
              <p className="text-xs text-gray-500 mt-1">₺{size.price}</p>
              {size.calories && (
                <p className="text-xs text-gray-400 mt-1">{size.calories} kcal</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center border-2 border-gray-200 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-6 font-medium min-w-[60px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Toplam</p>
            <p className="text-2xl font-bold text-gray-900">₺{(selectedPrice * quantity).toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white font-medium text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isAddingToCart ? "Eklendi!" : "Sepete Ekle"}
          </Button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(
              "w-14 h-14 border-2 rounded-xl flex items-center justify-center transition-all",
              isWishlisted 
                ? "border-red-500 bg-red-50 text-red-600" 
                : "border-gray-200 hover:border-red-200 text-gray-400"
            )}
          >
            <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
          </button>
        </div>

        <Button
          variant="outline"
          className="w-full h-14 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium rounded-xl transition-all"
          disabled={!product.inStock}
        >
          Hemen Satın Al
        </Button>
      </div>
    </div>
  )
}