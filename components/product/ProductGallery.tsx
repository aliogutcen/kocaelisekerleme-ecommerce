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
}

export function ProductGallery({ images, productName, discount }: ProductGalleryProps) {
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
              className="relative flex-none w-full aspect-square bg-white snap-center"
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
                  ? "w-6 bg-neutral-900" 
                  : "bg-neutral-300"
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop Gallery */}
      <div className="hidden lg:block space-y-6">
        {/* Main Image - Luxury Style */}
        <div 
          ref={mainImageRef}
          className="relative aspect-square bg-gradient-to-br from-neutral-50 to-white overflow-hidden"
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
          
          {discount && (
            <div className="absolute top-8 left-8">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-full">
                <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">Limited Time</p>
                <p className="text-2xl font-thin text-neutral-900 mt-1">-{discount}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square bg-white border transition-all duration-300",
                selectedImage === index 
                  ? "border-neutral-900" 
                  : "border-neutral-200 hover:border-neutral-400"
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