"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Menu, X, User, Heart, ChevronDown, Sparkles, Package, Truck, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "Tahin Ürünleri",
    href: "/products?category=tahin",
    featured: true,
    description: "Geleneksel taş değirmende öğütülmüş",
    image: "/hero.jpg",
    subcategories: [
      { name: "Sade Tahin", href: "/products?category=tahin&type=sade", badge: "En Çok Satan" },
      { name: "Organik Tahin", href: "/products?category=tahin&type=organik", badge: "Yeni" },
      { name: "Kepekli Tahin", href: "/products?category=tahin&type=kepekli" },
      { name: "Ballı Tahin", href: "/products?category=tahin&type=bal", badge: "Özel" },
    ]
  },
  {
    name: "Tahin Helvası",
    href: "/products?category=helva",
    featured: true,
    description: "3 nesil aile tarifi",
    image: "/hero.jpg",
    subcategories: [
      { name: "Sade Helva", href: "/products?category=helva&type=sade" },
      { name: "Kakaolu Helva", href: "/products?category=helva&type=kakao", badge: "Favori" },
      { name: "Fıstıklı Helva", href: "/products?category=helva&type=fistik" },
      { name: "Vanilyalı Helva", href: "/products?category=helva&type=vanilya", badge: "Yeni" },
    ]
  },
  {
    name: "Pekmez",
    href: "/products?category=pekmez",
    description: "Doğal tatlandırıcı",
    image: "/hero.jpg",
    subcategories: [
      { name: "Üzüm Pekmezi", href: "/products?category=pekmez&type=uzum" },
      { name: "Dut Pekmezi", href: "/products?category=pekmez&type=dut", badge: "Organik" },
      { name: "Keçiboynuzu", href: "/products?category=pekmez&type=keciboynuzu" },
      { name: "Harnup Pekmezi", href: "/products?category=pekmez&type=harnup" },
    ]
  },
  {
    name: "Lokum",
    href: "/products?category=lokum",
    description: "El yapımı özel lokumlar",
    image: "/hero.jpg",
    subcategories: [
      { name: "Gül Lokumu", href: "/products?category=lokum&type=gul", badge: "Premium" },
      { name: "Nar Lokumu", href: "/products?category=lokum&type=nar" },
      { name: "Fıstıklı Lokum", href: "/products?category=lokum&type=fistik" },
      { name: "Çifte Kavrulmuş", href: "/products?category=lokum&type=cifte", badge: "Özel" },
    ]
  },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartItemsCount, setCartItemsCount] = useState(2)
  const [wishlistCount, setWishlistCount] = useState(3)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar - Multi-tier Announcement */}
      <div className="relative overflow-hidden">
        {/* Primary announcement bar */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient"></div>
          <div className="container mx-auto px-4 py-2 relative z-10">
            <div className="flex items-center justify-center gap-3 text-sm">
              <div className="flex items-center gap-2 animate-pulse">
                <Sparkles className="h-4 w-4" />
                <span className="font-black text-xs uppercase tracking-wider">Yeni Yıl</span>
              </div>
              <p className="font-medium">
                Tüm ürünlerde %25 indirim + 150₺ üzeri ücretsiz kargo
              </p>
              <Link href="/kampanya" className="group flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold hover:bg-white/30 transition-all">
                Kampanyalar
                <ChevronDown className="h-3 w-3 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        {/* Secondary info bar */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-accent/20">
          <div className="container mx-auto px-4 py-1">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                Aynı gün kargo
              </span>
              <span className="h-3 w-px bg-border"></span>
              <span className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                Türkiye'nin her yerine teslimat
              </span>
              <span className="h-3 w-px bg-border"></span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                4.9/5 müşteri memnuniyeti
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "bg-white/90 backdrop-blur-2xl shadow-2xl" 
          : "bg-white/70 backdrop-blur-lg"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-12 xl:gap-16">
              <Link href="/" className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center">
                  <h1 className="text-2xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                      KOCAELİ
                    </span>
                  </h1>
                  <span className="text-[10px] font-bold text-accent tracking-[0.35em] uppercase">
                    ŞEKERLEME
                  </span>
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center gap-2">
                {categories.map((category, index) => (
                  <div
                    key={category.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(category.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={category.href}
                      className={cn(
                        "group relative flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium transition-all duration-300",
                        "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:shadow-lg hover:shadow-primary/10",
                        activeDropdown === category.name && "bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg shadow-primary/10"
                      )}
                    >
                      <span className="relative">
                        {category.name}
                        {category.featured && (
                          <span className="absolute -top-2 -right-8 text-[10px] font-bold text-primary animate-pulse">
                            HOT
                          </span>
                        )}
                      </span>
                      <ChevronDown className={cn(
                        "h-3.5 w-3.5 transition-all duration-300",
                        activeDropdown === category.name && "rotate-180 text-primary"
                      )} />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    <div className={cn(
                      "absolute top-full left-0 mt-4 opacity-0 invisible translate-y-4 transition-all duration-300",
                      activeDropdown === category.name && "opacity-100 visible translate-y-0"
                    )}>
                      <div className="w-[520px] bg-white rounded-3xl shadow-2xl border border-border/20 overflow-hidden backdrop-blur-xl">
                        {/* Header with image */}
                        <div className="relative h-32 overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-4 left-6 text-white">
                            <h3 className="text-xl font-bold">{category.name}</h3>
                            <p className="text-sm opacity-90">{category.description}</p>
                          </div>
                        </div>
                        
                        {/* Subcategories */}
                        <div className="p-6 grid grid-cols-2 gap-3">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="group/item flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:shadow-md transition-all duration-200"
                            >
                              <span className="font-medium group-hover/item:text-primary transition-colors">
                                {sub.name}
                              </span>
                              {sub.badge && (
                                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                        
                        {/* Footer CTA */}
                        <div className="px-6 pb-6">
                          <Link 
                            href={category.href}
                            className="block w-full text-center py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                          >
                            Tüm {category.name} →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link
                  href="/about"
                  className="px-5 py-2.5 rounded-2xl font-medium hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  Hakkımızda
                </Link>

                <Link
                  href="/blog"
                  className="px-5 py-2.5 rounded-2xl font-medium hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  Blog
                </Link>
                
                <Link
                  href="/sustainability"
                  className="px-5 py-2.5 rounded-2xl font-medium hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  Sürdürülebilirlik
                </Link>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Premium Features */}
              <div className="hidden lg:flex items-center gap-6 mr-6">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Ücretsiz Kargo</span>
                </div>
                <div className="h-4 w-px bg-border"></div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Hızlı Teslimat</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl"></div>
                  <Search className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                </Button>
                
                {/* Advanced Search Dropdown */}
                <div className={cn(
                  "absolute right-0 top-full mt-4 w-96 opacity-0 invisible translate-y-4 transition-all duration-300",
                  isSearchOpen && "opacity-100 visible translate-y-0"
                )}>
                  <div className="bg-white rounded-3xl shadow-2xl border border-border/20 p-6 backdrop-blur-xl">
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Ürün, kategori veya marka ara..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                        autoFocus
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    {/* Quick Links */}
                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Popüler Aramalar</p>
                      <div className="flex flex-wrap gap-2">
                        {['Organik Tahin', 'Kakaolu Helva', 'Üzüm Pekmezi', 'Gül Lokumu'].map((term) => (
                          <button
                            key={term}
                            className="text-xs px-3 py-1.5 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Actions Group */}
              <div className="hidden md:flex items-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-full p-1 gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/50 transition-all duration-300 relative group"
                >
                  <User className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
                </Button>

                <div className="h-6 w-px bg-border/30"></div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/50 transition-all duration-300 relative group"
                >
                  <Heart className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-[10px] font-bold text-white flex items-center justify-center shadow-lg">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </div>
              
              {/* Cart with Price */}
              <Link href="/cart" className="relative ml-2">
                <Button 
                  className="relative rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-4 py-2 flex items-center gap-3 group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] opacity-90">Sepetim</span>
                    <span className="text-sm font-bold">249,90₺</span>
                  </div>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent text-[11px] font-bold text-white flex items-center justify-center shadow-lg animate-pulse-glow border-2 border-white">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden rounded-full hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-5 h-5">
                  <span className={cn(
                    "absolute h-0.5 w-5 bg-current transform transition-all duration-300",
                    isMenuOpen ? "rotate-45 top-2" : "rotate-0 top-0"
                  )}></span>
                  <span className={cn(
                    "absolute h-0.5 w-5 bg-current top-2 transition-all duration-300",
                    isMenuOpen && "opacity-0"
                  )}></span>
                  <span className={cn(
                    "absolute h-0.5 w-5 bg-current transform transition-all duration-300",
                    isMenuOpen ? "-rotate-45 top-2" : "rotate-0 top-4"
                  )}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Mobile Menu */}
        <div className={cn(
          "xl:hidden bg-background/95 backdrop-blur-xl absolute top-full left-0 right-0 shadow-2xl transition-all duration-500 max-h-[calc(100vh-96px)] overflow-y-auto",
          isMenuOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-4"
        )}>
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <input
                type="search"
                placeholder="Ürün ara..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2 mb-6">
              {categories.map((category) => (
                <div key={category.name} className="border-b border-border/50 last:border-0">
                  <Link
                    href={category.href}
                    className="flex items-center justify-between py-4 font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div>
                      <span>{category.name}</span>
                      {category.featured && (
                        <span className="ml-2 text-[10px] font-bold text-primary">HOT</span>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Link>
                </div>
              ))}

              <Link
                href="/about"
                className="flex items-center justify-between py-4 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Hakkımızda</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Link>
              
              <Link
                href="/blog"
                className="flex items-center justify-between py-4 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Blog</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Link>
              
              <Link
                href="/sustainability"
                className="flex items-center justify-between py-4 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Sürdürülebilirlik</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Link>
              
              <Link
                href="/press"
                className="flex items-center justify-between py-4 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Basın</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Link>
            </div>

            {/* Mobile User Actions */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
              <Link 
                href="/account" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-6 w-6" />
                <span className="text-xs">Hesabım</span>
              </Link>
              <Link 
                href="/wishlist" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent/10 transition-colors relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-6 w-6" />
                <span className="text-xs">Favoriler</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-2 bg-accent text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/orders" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-6 w-6" />
                <span className="text-xs">Siparişler</span>
              </Link>
            </div>

            {/* Mobile Features */}
            <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent" />
                <span>Ücretsiz Kargo</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" />
                <span>%100 Memnuniyet</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}