"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  Package,
  ChevronLeft,
  ChevronRight,
  Star,
  Minus,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface ProductDetailClientProps {
  product: any
  relatedProducts: any[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("500g")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const { toast } = useToast()

  const images = product.images?.length > 0 
    ? product.images 
    : [{ url: "/placeholder.png", alt: product.name }]

  const handleAddToCart = () => {
    toast({
      title: "Sepete Eklendi",
      description: `${product.name} sepetinize eklendi.`,
    })
  }

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1)
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Kopyalandı",
        description: "Ürün linki panoya kopyalandı.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center gap-2 text-xs tracking-wider text-neutral-400">
          <Link href="/" className="hover:text-neutral-600 transition-colors">
            ANA SAYFA
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-neutral-600 transition-colors">
            ÜRÜNLER
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link 
                href={`/products?category=${product.category.slug}`} 
                className="hover:text-neutral-600 transition-colors"
              >
                {product.category.name.toUpperCase()}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-neutral-600">{product.name.toUpperCase()}</span>
        </nav>
      </div>

      {/* Product Section - Premium Minimal */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Premium Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden bg-neutral-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[selectedImageIndex]?.url || "/placeholder.png"}
                    alt={images[selectedImageIndex]?.alt || product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Minimal Navigation Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_: any, index:any) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        selectedImageIndex === index
                          ? "bg-neutral-900 w-8"
                          : "bg-neutral-400 hover:bg-neutral-600"
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Minimal Discount Badge */}
              {product.discountPrice && (
                <div className="absolute top-6 left-6 bg-neutral-900 text-white px-4 py-2 text-xs tracking-wider">
                  %{Math.round(((parseFloat(product.price) - parseFloat(product.discountPrice)) / parseFloat(product.price)) * 100)} İNDİRİM
                </div>
              )}
            </div>

            {/* Thumbnail Grid - More Minimal */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image:any, index:any) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden bg-neutral-50 transition-all duration-300",
                      selectedImageIndex === index
                        ? "ring-1 ring-neutral-900"
                        : "hover:opacity-80"
                    )}
                  >
                    <Image
                      src={image.url || "/placeholder.png"}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Premium Minimal */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Category - Minimal */}
            {product.category && (
              <div className="text-xs tracking-widest text-neutral-400">
                {product.category.name.toUpperCase()}
              </div>
            )}

            {/* Title - Elegant Typography */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extralight text-neutral-900 tracking-tight">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price - Prominent */}
            <div className="py-8 border-y border-neutral-100">
              <div className="flex items-baseline gap-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-4xl font-extralight text-neutral-900">
                      {parseFloat(product.discountPrice).toFixed(2)}
                    </span>
                    <span className="text-2xl font-extralight text-neutral-400 line-through">
                      {parseFloat(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-neutral-600">TL</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-extralight text-neutral-900">
                      {parseFloat(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-neutral-600">TL</span>
                  </>
                )}
              </div>
              {product.avgRating > 0 && (
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.avgRating)
                            ? "fill-neutral-900 text-neutral-900"
                            : "fill-none text-neutral-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">
                    {product.avgRating.toFixed(1)} • {product.reviewCount} değerlendirme
                  </span>
                </div>
              )}
            </div>

            {/* Options - Clean Design */}
            <div className="space-y-6">
              {/* Size */}
              <div>
                <label className="text-xs tracking-wider text-neutral-600 mb-3 block">
                  GRAMAJ SEÇİNİZ
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['250g', '500g', '1kg'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "py-3 px-4 border text-sm tracking-wide transition-all duration-200",
                        selectedSize === size
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 hover:border-neutral-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity - Minimal */}
              <div>
                <label className="text-xs tracking-wider text-neutral-600 mb-3 block">
                  ADET
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="w-12 h-12 border border-neutral-200 hover:border-neutral-400 transition-colors flex items-center justify-center"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-20 h-12 text-center border-y border-neutral-200 focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="w-12 h-12 border border-neutral-200 hover:border-neutral-400 transition-colors flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="ml-6 text-sm text-neutral-500">
                    Stokta {product.stock || 10} adet
                  </span>
                </div>
              </div>
            </div>

            {/* Actions - Premium Buttons */}
            <div className="space-y-4 pt-6">
              <Button
                onClick={handleAddToCart}
                className="w-full h-14 bg-neutral-900 hover:bg-neutral-800 text-white text-sm tracking-wider font-light"
              >
                SEPETE EKLE
              </Button>
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  variant="outline"
                  className="flex-1 h-12 border-neutral-200 hover:border-neutral-900 font-light"
                >
                  <Heart className={cn("h-4 w-4 mr-2", isWishlisted && "fill-current")} />
                  {isWishlisted ? "FAVORİLERDE" : "FAVORİLERE EKLE"}
                </Button>
                <Button
                  onClick={shareProduct}
                  variant="outline"
                  className="h-12 px-4 border-neutral-200 hover:border-neutral-900"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Trust Badges - Minimal Icons */}
            <div className="flex justify-between pt-8 border-t border-neutral-100">
              <div className="text-center">
                <Truck className="h-5 w-5 text-neutral-400 mx-auto mb-2" />
                <p className="text-xs text-neutral-600">ÜCRETSİZ KARGO</p>
                <p className="text-xs text-neutral-400">200₺ Üzeri</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 text-neutral-400 mx-auto mb-2" />
                <p className="text-xs text-neutral-600">GÜVENLİ ÖDEME</p>
                <p className="text-xs text-neutral-400">SSL Korumalı</p>
              </div>
              <div className="text-center">
                <Package className="h-5 w-5 text-neutral-400 mx-auto mb-2" />
                <p className="text-xs text-neutral-600">HIZLI TESLİMAT</p>
                <p className="text-xs text-neutral-400">1-3 İş Günü</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details - Premium Design */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Premium Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              <button
                onClick={() => setActiveTab('description')}
                className={cn(
                  "group relative pb-2 text-sm tracking-wider transition-all duration-300",
                  activeTab === 'description' 
                    ? "text-neutral-900" 
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                ÜRÜN DETAYI
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1px] bg-neutral-900 transition-all duration-300",
                  activeTab === 'description' ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={cn(
                  "group relative pb-2 text-sm tracking-wider transition-all duration-300",
                  activeTab === 'ingredients' 
                    ? "text-neutral-900" 
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                İÇİNDEKİLER
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1px] bg-neutral-900 transition-all duration-300",
                  activeTab === 'ingredients' ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={cn(
                  "group relative pb-2 text-sm tracking-wider transition-all duration-300",
                  activeTab === 'nutrition' 
                    ? "text-neutral-900" 
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                BESİN DEĞERLERİ
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1px] bg-neutral-900 transition-all duration-300",
                  activeTab === 'nutrition' ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={cn(
                  "group relative pb-2 text-sm tracking-wider transition-all duration-300",
                  activeTab === 'usage' 
                    ? "text-neutral-900" 
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                KULLANIM ÖNERİSİ
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1px] bg-neutral-900 transition-all duration-300",
                  activeTab === 'usage' ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </button>
            </div>

            {/* Tab Content with Animation */}
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                      <h3 className="text-xs tracking-widest text-neutral-400 mb-6">ÜRÜN HAKKINDA</h3>
                      <p className="text-lg font-light text-neutral-700 leading-relaxed">
                        {product.description || "1948'den beri aynı özenle hazırladığımız ürünlerimiz, geleneksel tariflerle modern hijyen standartlarında üretilmektedir."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs tracking-widest text-neutral-400 mb-6">ÖZELLİKLER</h3>
                      <div className="space-y-4">
                        {(product.features || [
                          "Geleneksel üretim yöntemi",
                          "Katkı maddesi içermez",
                          "Doğal içerikler",
                          "Özel ambalajında taze"
                        ]).map((feature: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-px h-4 bg-neutral-900 mt-1" />
                            <p className="text-sm text-neutral-600 font-light">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ingredients' && (
                <motion.div
                  key="ingredients"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto text-center"
                >
                  <div className="inline-block text-left">
                    <h3 className="text-xs tracking-widest text-neutral-400 mb-8">İÇİNDEKİLER</h3>
                    <div className="space-y-2">
                      {(product.ingredients || "Susam, şeker, glikoz şurubu").split(',').map((ingredient:any, index:any) => (
                        <p key={index} className="text-2xl font-extralight text-neutral-800">
                          {ingredient.trim()}
                        </p>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-neutral-200">
                      <p className="text-xs tracking-wider text-neutral-400">
                        DOĞAL İÇERİKLER • KATKI MADDESİ İÇERMEZ
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'nutrition' && (
                <motion.div
                  key="nutrition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                    {[
                      { label: "Enerji", value: "520", unit: "kcal" },
                      { label: "Protein", value: "13", unit: "g" },
                      { label: "Yağ", value: "32", unit: "g" },
                      { label: "Doymuş Yağ", value: "5.2", unit: "g" },
                      { label: "Karbonhidrat", value: "48", unit: "g" },
                      { label: "Şeker", value: "45", unit: "g" },
                      { label: "Lif", value: "3.5", unit: "g" },
                      { label: "Tuz", value: "0.02", unit: "g" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-baseline">
                        <span className="text-sm text-neutral-600">{item.label}</span>
                        <span className="text-2xl font-extralight text-neutral-900">
                          {item.value}<span className="text-sm ml-1 text-neutral-600">{item.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 pt-8 border-t border-neutral-100 text-center">
                    <p className="text-xs tracking-wider text-neutral-400">100 GRAM İÇİN ORTALAMA DEĞERLER</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'usage' && (
                <motion.div
                  key="usage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                      <h3 className="text-xs tracking-widest text-neutral-400 mb-6">SERVİS ÖNERİSİ</h3>
                      <p className="text-lg font-light text-neutral-700 leading-relaxed mb-8">
                        Kahvaltıda, çay saatlerinde veya tatlı ihtiyacınızı karşılamak için ideal.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-px h-4 bg-neutral-900 mt-1" />
                          <p className="text-sm text-neutral-600 font-light">Sade olarak</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-px h-4 bg-neutral-900 mt-1" />
                          <p className="text-sm text-neutral-600 font-light">Tahin ile</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-px h-4 bg-neutral-900 mt-1" />
                          <p className="text-sm text-neutral-600 font-light">Pekmez ile</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs tracking-widest text-neutral-400 mb-6">SAKLAMA KOŞULLARI</h3>
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm font-medium text-neutral-900 mb-2">Açılmadan Önce</p>
                          <p className="text-sm text-neutral-600 font-light">
                            Serin ve kuru yerde, güneş ışığından uzakta saklayınız.
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 mb-2">Açıldıktan Sonra</p>
                          <p className="text-sm text-neutral-600 font-light">
                            Hava almayacak şekilde kapatarak buzdolabında muhafaza ediniz. 
                            30 gün içinde tüketiniz.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Reviews Section - Premium */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-xs tracking-widest text-neutral-400 mb-4">MÜŞTERİ YORUMLARI</h2>
              <p className="text-3xl font-extralight text-neutral-900">
                {product.avgRating.toFixed(1)} / 5.0
              </p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.avgRating)
                        ? "fill-neutral-900 text-neutral-900"
                        : "fill-none text-neutral-300"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-500 mt-2">{product.reviewCount} değerlendirme</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              {product.reviews.slice(0, 3).map((review: any) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-b border-neutral-100 pb-8 last:border-0"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {review.user.name} {review.user.surname?.[0]}.
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-neutral-900 text-neutral-900"
                              : "fill-none text-neutral-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-600 font-light leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
            {product.reviews.length > 3 && (
              <div className="text-center mt-12">
                <Button variant="outline" className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white">
                  TÜM YORUMLARI GÖR
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bundle Section - Premium Minimal */}
      {relatedProducts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-xs tracking-widest text-neutral-400 mb-4">ÖZEL FIRSATLAR</p>
                <h2 className="text-3xl font-extralight text-neutral-900">Mükemmel Kombinler</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bundle 1 */}
                <div className="group cursor-pointer h-full" onClick={() => {
                  handleAddToCart()
                  toast({
                    title: "Set Sepete Eklendi",
                    description: "2 ürün sepetinize eklendi.",
                  })
                }}>
                  <div className="border border-neutral-200 p-6 md:p-8 hover:border-neutral-400 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-20 h-20 relative bg-neutral-50 overflow-hidden">
                        <Image
                          src={images[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-lg font-extralight text-neutral-300">+</div>
                      <div className="w-20 h-20 relative bg-neutral-50 overflow-hidden">
                        <Image
                          src={relatedProducts[0]?.images?.[0]?.url || "/placeholder.png"}
                          alt={relatedProducts[0]?.name || "İlgili Ürün"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium text-neutral-900 mb-2">KAHVALTI SETİ</h3>
                    <p className="text-xs text-neutral-600 mb-4 flex-grow">
                      {product.name} + {relatedProducts[0]?.name || "Tahin"}
                    </p>
                    
                    <div className="flex items-baseline justify-between mt-auto">
                      <div>
                        <p className="text-xs text-neutral-400 line-through">
                          {(parseFloat(product.price) + (relatedProducts[0] ? parseFloat(relatedProducts[0].price) : 45)).toFixed(2)} TL
                        </p>
                        <p className="text-2xl font-extralight text-neutral-900">
                          {((parseFloat(product.discountPrice || product.price) + (relatedProducts[0] ? parseFloat(relatedProducts[0].discountPrice || relatedProducts[0].price) : 45)) * 0.85).toFixed(2)} TL
                        </p>
                      </div>
                      <span className="text-xs tracking-wider text-green-600">%15 İNDİRİM</span>
                    </div>
                  </div>
                </div>

                {/* Bundle 2 */}
                {relatedProducts.length > 1 && (
                  <div className="group cursor-pointer h-full" onClick={() => {
                    handleAddToCart()
                    toast({
                      title: "Set Sepete Eklendi",
                      description: "3 ürün sepetinize eklendi.",
                    })
                  }}>
                    <div className="border border-neutral-200 p-8 hover:border-neutral-400 transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-20 h-20 relative bg-neutral-50 overflow-hidden">
                          <Image
                            src={images[0]?.url || "/placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-lg font-extralight text-neutral-300">+</div>
                        <div className="w-20 h-20 relative bg-neutral-50 overflow-hidden">
                          <Image
                            src={relatedProducts[0]?.images?.[0]?.url || "/placeholder.png"}
                            alt={relatedProducts[0]?.name || "Ürün"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-lg font-extralight text-neutral-300">+</div>
                        <div className="w-20 h-20 relative bg-neutral-50 overflow-hidden">
                          <Image
                            src={relatedProducts[1]?.images?.[0]?.url || "/placeholder.png"}
                            alt={relatedProducts[1]?.name || "Ürün"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-medium text-neutral-900 mb-2">GURME SETİ</h3>
                      <p className="text-xs text-neutral-600 mb-4 flex-grow">
                        3 farklı lezzet bir arada
                      </p>
                      
                      <div className="flex items-baseline justify-between mt-auto">
                        <div>
                          <p className="text-xs text-neutral-400 line-through">
                            {(parseFloat(product.price) + relatedProducts.slice(0, 2).reduce((sum, item) => sum + parseFloat(item.price), 0)).toFixed(2)} TL
                          </p>
                          <p className="text-2xl font-extralight text-neutral-900">
                            {((parseFloat(product.discountPrice || product.price) + relatedProducts.slice(0, 2).reduce((sum, item) => sum + parseFloat(item.discountPrice || item.price), 0)) * 0.80).toFixed(2)} TL
                          </p>
                        </div>
                        <span className="text-xs tracking-wider text-green-600">%20 İNDİRİM</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center mt-8">
                <p className="text-xs text-neutral-500">Setlere tıklayarak sepete ekleyebilirsiniz</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Section - Minimal */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-3xl font-extralight text-neutral-900 mb-2">1948</p>
                <p className="text-xs tracking-wider text-neutral-400">KURULUŞ</p>
              </div>
              <div>
                <p className="text-3xl font-extralight text-neutral-900 mb-2">3</p>
                <p className="text-xs tracking-wider text-neutral-400">NESİL</p>
              </div>
              <div>
                <p className="text-3xl font-extralight text-neutral-900 mb-2">%100</p>
                <p className="text-xs tracking-wider text-neutral-400">DOĞAL</p>
              </div>
              <div>
                <p className="text-3xl font-extralight text-neutral-900 mb-2">30</p>
                <p className="text-xs tracking-wider text-neutral-400">GÜN İADE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products - Premium */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-xs tracking-widest text-neutral-400">İLGİLİ ÜRÜNLER</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/products/${relatedProduct.slug}`}
                    className="group block"
                  >
                    <div className="aspect-square relative overflow-hidden bg-neutral-100 mb-4">
                      <Image
                        src={relatedProduct.images?.[0]?.url || "/placeholder.png"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-light text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-extralight text-neutral-900">
                        {parseFloat(relatedProduct.price).toFixed(2)} <span className="text-sm">TL</span>
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}