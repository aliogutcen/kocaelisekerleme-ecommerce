"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductImage {
  id: number
  src: string
  alt: string
}

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
  discount?: number
  badge?: string
}

export function ProductGalleryFood({ images, productName, discount, badge }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageZoom, setImageZoom] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLDivElement>(null)

  const scrollToImage = (index: number) => {
    if (imageContainerRef.current) {
      const scrollAmount = index * (imageContainerRef.current.offsetWidth + 16)
      imageContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
    setSelectedImage(index)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div className="space-y-4">
      {/* Mobile Gallery */}
      <div className="lg:hidden">
        <div 
          ref={imageContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-none w-full aspect-square bg-gradient-to-br from-red-50 to-orange-50 snap-center rounded-2xl overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                selectedImage === index 
                  ? "w-6 bg-red-600" 
                  : "bg-red-200"
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop Gallery */}
      <div className="hidden lg:block space-y-6">
        {/* Main Image - Food Style */}
        <div 
          ref={mainImageRef}
          className="relative aspect-square bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden rounded-3xl"
          onMouseEnter={() => setImageZoom(true)}
          onMouseLeave={() => setImageZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            fill
            className="object-cover transition-transform duration-500"
            style={{
              transform: imageZoom ? `scale(1.3)` : 'scale(1)',
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
            }}
            priority
          />
          
          {badge && (
            <div className="absolute top-6 left-6">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full">
                <p className="text-xs font-medium tracking-wider uppercase">{badge}</p>
              </div>
            </div>
          )}
          
          {discount && (
            <div className="absolute top-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg">
                <p className="text-xs tracking-wider text-red-600 font-medium">İndirim</p>
                <p className="text-xl font-bold text-red-600">-%{discount}</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square bg-white border-2 rounded-xl transition-all duration-300 overflow-hidden",
                selectedImage === index 
                  ? "border-red-500 shadow-lg scale-105" 
                  : "border-transparent hover:border-red-200"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}