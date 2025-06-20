"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, ChevronDown, Search, Grid3X3, Grid2X2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Fake products data
const allProducts = [
  {
    id: 1,
    name: "Geleneksel Tahin Helvası",
    slug: "geleneksel-tahin-helvasi",
    category: "Tahin Helvası",
    description: "500g vakumlu paket",
    price: "149.90",
    oldPrice: "179.90",
    image: "/hero.jpg",
    isNew: false,
    inStock: true
  },
  {
    id: 2,
    name: "Organik Susam Tahini",
    slug: "organik-susam-tahini",
    category: "Tahin",
    description: "350g cam kavanoz",
    price: "89.90",
    image: "/hero.jpg",
    isNew: true,
    inStock: true
  },
  {
    id: 3,
    name: "Antep Fıstıklı Helva",
    slug: "antep-fistikli-helva",
    category: "Tahin Helvası",
    description: "400g özel kutu",
    price: "189.90",
    oldPrice: "219.90",
    image: "/hero.jpg",
    isNew: false,
    inStock: true
  },
  {
    id: 4,
    name: "Gül Lokumu",
    slug: "gul-lokumu",
    category: "Lokum",
    description: "250g ahşap kutu",
    price: "129.90",
    image: "/hero.jpg",
    isNew: false,
    inStock: true
  },
  {
    id: 5,
    name: "Cevizli Tahin Helvası",
    slug: "cevizli-tahin-helvasi",
    category: "Tahin Helvası",
    description: "500g vakumlu paket",
    price: "169.90",
    image: "/hero.jpg",
    isNew: false,
    inStock: false
  },
  {
    id: 6,
    name: "Kakaolu Tahin Helvası",
    slug: "kakaolu-tahin-helvasi",
    category: "Tahin Helvası",
    description: "500g vakumlu paket",
    price: "159.90",
    oldPrice: "189.90",
    image: "/hero.jpg",
    isNew: false,
    inStock: true
  },
  {
    id: 7,
    name: "Yaz Helvası",
    slug: "yaz-helvasi",
    category: "Yaz Helvası",
    description: "300g cam kavanoz",
    price: "99.90",
    image: "/hero.jpg",
    isNew: true,
    inStock: true
  },
  {
    id: 8,
    name: "Fıstıklı Lokum",
    slug: "fistikli-lokum",
    category: "Lokum",
    description: "300g özel kutu",
    price: "149.90",
    image: "/hero.jpg",
    isNew: false,
    inStock: true
  },
  {
    id: 9,
    name: "Sade Tahin",
    slug: "sade-tahin",
    category: "Tahin",
    description: "600g cam kavanoz",
    price: "119.90",
    image: "/hero.jpg",
    isNew: false,
    inStock: true
  }
]

const categories = [
  { name: "Tümü", count: allProducts.length },
  { name: "Tahin Helvası", count: 4 },
  { name: "Tahin", count: 2 },
  { name: "Lokum", count: 2 },
  { name: "Yaz Helvası", count: 1 }
]

const sortOptions = [
  { value: "featured", label: "Öne Çıkanlar" },
  { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
  { value: "name-asc", label: "İsim: A-Z" },
  { value: "newest", label: "En Yeniler" }
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [sortBy, setSortBy] = useState("featured")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [gridView, setGridView] = useState<2 | 3>(3)
  const [searchQuery, setSearchQuery] = useState("")

  // Set category from URL
  useEffect(() => {
    if (categoryParam) {
      const categoryMap: { [key: string]: string } = {
        'helva': 'Tahin Helvası',
        'tahin': 'Tahin',
        'lokum': 'Lokum',
        'yaz-helvasi': 'Yaz Helvası'
      }
      setSelectedCategory(categoryMap[categoryParam] || "Tümü")
    }
  }, [categoryParam])

  // Filter products
  let filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === "Tümü" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parseFloat(a.price) - parseFloat(b.price)
      case "price-desc":
        return parseFloat(b.price) - parseFloat(a.price)
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "newest":
        return b.isNew ? 1 : -1
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Ürünler"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white"
        >
          <p className="text-xs tracking-[0.4em] mb-4 opacity-80">KOLEKSİYON</p>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight">
            {selectedCategory === "Tümü" ? "Tüm Ürünler" : selectedCategory}
          </h1>
          <p className="text-lg font-light mt-4 opacity-90">
            {filteredProducts.length} ürün
          </p>
        </motion.div>
      </section>

      {/* Filters & Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80">
              <div className="sticky top-24">
                {/* Search */}
                <div className="mb-12">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 border-b border-neutral-200 focus:border-neutral-900 transition-colors bg-transparent placeholder:text-neutral-400 text-sm tracking-wide focus:outline-none"
                    />
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-xs tracking-[0.3em] text-neutral-400 mb-8">KATEGORİLER</h3>
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={cn(
                          "w-full flex items-center justify-between py-3 px-4 text-sm transition-all duration-300",
                          selectedCategory === category.name
                            ? "bg-neutral-900 text-white"
                            : "hover:bg-neutral-50 text-neutral-700"
                        )}
                      >
                        <span className="font-light">{category.name}</span>
                        <span className="text-xs">{category.count}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtreler
                  </Button>

                  {/* Grid View Toggle */}
                  <div className="hidden md:flex items-center gap-2 border border-neutral-200 p-1">
                    <button
                      onClick={() => setGridView(2)}
                      className={cn(
                        "p-2 transition-colors",
                        gridView === 2 ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-900"
                      )}
                    >
                      <Grid2X2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridView(3)}
                      className={cn(
                        "p-2 transition-colors",
                        gridView === 3 ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-900"
                      )}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border border-neutral-200 px-4 py-2 pr-10 text-sm focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Products */}
              <motion.div
                layout
                className={cn(
                  "grid gap-8",
                  gridView === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
                )}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/products/${product.slug}`} className="group block">
                      <div className="relative aspect-square overflow-hidden bg-neutral-50 mb-6">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {product.isNew && (
                          <span className="absolute top-4 left-4 bg-white px-3 py-1 text-xs tracking-wider">
                            YENİ
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="text-sm tracking-wider text-neutral-600">TÜKENDİ</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-light text-neutral-900 mb-1 group-hover:text-neutral-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mb-3">{product.description}</p>
                        <div className="flex items-baseline gap-3">
                          {product.oldPrice && (
                            <span className="text-sm text-neutral-400 line-through">{product.oldPrice} TL</span>
                          )}
                          <span className="text-lg font-light text-neutral-900">{product.price} TL</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-neutral-500 mb-4">Aramanızla eşleşen ürün bulunamadı.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("Tümü")
                      setSearchQuery("")
                    }}
                  >
                    Filtreleri Temizle
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-light">Filtreler</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 border-b border-neutral-200 focus:border-neutral-900 transition-colors bg-transparent placeholder:text-neutral-400 text-sm tracking-wide focus:outline-none"
                    />
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-xs tracking-[0.3em] text-neutral-400 mb-6">KATEGORİLER</h3>
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => {
                          setSelectedCategory(category.name)
                          setShowMobileFilters(false)
                        }}
                        className={cn(
                          "w-full flex items-center justify-between py-3 px-4 text-sm transition-all duration-300",
                          selectedCategory === category.name
                            ? "bg-neutral-900 text-white"
                            : "hover:bg-neutral-50 text-neutral-700"
                        )}
                      >
                        <span className="font-light">{category.name}</span>
                        <span className="text-xs">{category.count}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}