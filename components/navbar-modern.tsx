"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Menu, X, User, Heart, ChevronDown, Sparkles, Package, Truck, Star, Gift, Clock, Shield, ArrowRight, Zap, Crown } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  {
    name: "Tahin Ürünleri",
    href: "/products?category=tahin",
    featured: true,
    icon: "🥜",
    color: "from-amber-500 to-orange-600",
    description: "Geleneksel taş değirmende öğütülmüş",
    image: "/hero.jpg",
    subcategories: [
      { name: "Sade Tahin", href: "/products?category=tahin&type=sade", badge: "En Çok Satan", hot: true },
      { name: "Organik Tahin", href: "/products?category=tahin&type=organik", badge: "Yeni", new: true },
      { name: "Kepekli Tahin", href: "/products?category=tahin&type=kepekli" },
      { name: "Ballı Tahin", href: "/products?category=tahin&type=bal", badge: "Özel", special: true },
    ]
  },
  {
    name: "Tahin Helvası",
    href: "/products?category=helva",
    featured: true,
    icon: "🍯",
    color: "from-yellow-500 to-amber-600",
    description: "3 nesil aile tarifi",
    image: "/hero.jpg",
    subcategories: [
      { name: "Sade Helva", href: "/products?category=helva&type=sade" },
      { name: "Kakaolu Helva", href: "/products?category=helva&type=kakao", badge: "Favori", hot: true },
      { name: "Fıstıklı Helva", href: "/products?category=helva&type=fistik" },
      { name: "Vanilyalı Helva", href: "/products?category=helva&type=vanilya", badge: "Yeni", new: true },
    ]
  },
  {
    name: "Pekmez",
    href: "/products?category=pekmez",
    icon: "🍇",
    color: "from-purple-500 to-pink-600",
    description: "Doğal tatlandırıcı",
    image: "/hero.jpg",
    subcategories: [
      { name: "Üzüm Pekmezi", href: "/products?category=pekmez&type=uzum" },
      { name: "Dut Pekmezi", href: "/products?category=pekmez&type=dut", badge: "Organik", special: true },
      { name: "Keçiboynuzu", href: "/products?category=pekmez&type=keciboynuzu" },
      { name: "Harnup Pekmezi", href: "/products?category=pekmez&type=harnup" },
    ]
  },
  {
    name: "Lokum",
    href: "/products?category=lokum",
    icon: "🍬",
    color: "from-pink-500 to-red-600",
    description: "El yapımı özel lokumlar",
    image: "/hero.jpg",
    subcategories: [
      { name: "Gül Lokumu", href: "/products?category=lokum&type=gul", badge: "Premium", special: true },
      { name: "Nar Lokumu", href: "/products?category=lokum&type=nar" },
      { name: "Fıstıklı Lokum", href: "/products?category=lokum&type=fistik" },
      { name: "Çifte Kavrulmuş", href: "/products?category=lokum&type=cifte", badge: "Özel", special: true },
    ]
  },
]

export function NavbarModern() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartItemsCount, setCartItemsCount] = useState(2)
  const [wishlistCount, setWishlistCount] = useState(3)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 0, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Animated Top Bar */}
      <div className="relative overflow-hidden">
        {/* Primary announcement with countdown */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-gradient"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
          </div>
          
          <div className="container mx-auto px-4 py-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                    <div className="absolute inset-0 blur-md bg-yellow-400/50"></div>
                  </div>
                  <span className="font-black text-sm uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    MEGA İNDİRİM
                  </span>
                </div>
                
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <Gift className="h-4 w-4 text-primary" />
                  <p className="font-medium">
                    Tüm ürünlerde <span className="font-bold text-yellow-400">%35 indirim</span> + 150₺ üzeri ücretsiz kargo
                  </p>
                </div>
              </div>
              
              {/* Countdown Timer */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  <div className="flex items-center gap-1 font-mono">
                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-yellow-400">:</span>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-yellow-400">:</span>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
                
                <Link 
                  href="/kampanya" 
                  className="group flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 rounded-full text-xs font-bold hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105"
                >
                  Fırsatları Gör
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust badges bar */}
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center gap-8 text-xs">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white">
                  <Shield className="h-3 w-3" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Güvenli Alışveriş</span>
              </div>
              
              <div className="h-4 w-px bg-gray-200"></div>
              
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white">
                  <Truck className="h-3 w-3" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Hızlı Teslimat</span>
              </div>
              
              <div className="h-4 w-px bg-gray-200"></div>
              
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                  <Crown className="h-3 w-3" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Premium Kalite</span>
              </div>
              
              <div className="h-4 w-px bg-gray-200"></div>
              
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">4.9/5 (2,847 değerlendirme)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-700",
        isScrolled 
          ? "bg-white/95 backdrop-blur-2xl shadow-2xl" 
          : "bg-white/80 backdrop-blur-xl"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-10 xl:gap-16">
              <Link href="/" className="group relative">
                {/* Animated background glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-gradient"></div>
                
                {/* Logo container with 3D effect */}
                <div className="relative transform group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
                  
                  <div className="relative bg-gradient-to-br from-white to-gray-50 p-3 rounded-2xl shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-500">
                    <div className="flex flex-col items-center">
                      <h1 className="text-2xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-primary via-red-500 to-accent bg-clip-text text-transparent animate-gradient bg-300%">
                          KOCAELİ
                        </span>
                      </h1>
                      <div className="flex items-center gap-1 -mt-1">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                        <span className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase">
                          ŞEKERLEME
                        </span>
                        <div className="h-px w-8 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                      </div>
                      <span className="text-[8px] text-gray-500 font-medium">EST. 1948</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center gap-1">
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
                        "group relative flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium transition-all duration-500",
                        "hover:bg-gradient-to-r hover:shadow-xl",
                        category.featured ? "hover:from-primary/10 hover:to-accent/10 hover:shadow-primary/20" : "hover:from-gray-100 hover:to-gray-50",
                        activeDropdown === category.name && "bg-gradient-to-r from-primary/10 to-accent/10 shadow-xl shadow-primary/20"
                      )}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="relative">
                        {category.name}
                        {category.featured && (
                          <span className="absolute -top-3 -right-8 flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                          </span>
                        )}
                      </span>
                      <ChevronDown className={cn(
                        "h-3.5 w-3.5 transition-all duration-500",
                        activeDropdown === category.name && "rotate-180 text-primary"
                      )} />
                    </Link>

                    {/* Ultra Mega Dropdown Menu */}
                    <div className={cn(
                      "absolute top-full left-0 mt-4 opacity-0 invisible translate-y-4 transition-all duration-500",
                      activeDropdown === category.name && "opacity-100 visible translate-y-0"
                    )}>
                      <div className="w-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Gradient header with parallax image */}
                        <div className={cn("relative h-40 overflow-hidden bg-gradient-to-br", category.color)}>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover opacity-30 scale-110 group-hover:scale-125 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          
                          {/* Floating elements */}
                          <div className="absolute top-4 right-4 text-6xl animate-float opacity-50">{category.icon}</div>
                          <div className="absolute bottom-8 right-8 text-4xl animate-float animation-delay-200 opacity-30">{category.icon}</div>
                          
                          <div className="absolute bottom-6 left-8 text-white">
                            <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                            <p className="text-sm opacity-90 flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              {category.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Subcategories with hover effects */}
                        <div className="p-8">
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="group/item relative flex items-center justify-between px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "w-2 h-2 rounded-full bg-gradient-to-r",
                                    sub.hot && "from-red-500 to-orange-500",
                                    sub.new && "from-green-500 to-emerald-500",
                                    sub.special && "from-purple-500 to-pink-500",
                                    !sub.hot && !sub.new && !sub.special && "from-gray-300 to-gray-400"
                                  )}></div>
                                  <span className="font-medium group-hover/item:text-primary transition-colors">
                                    {sub.name}
                                  </span>
                                </div>
                                {sub.badge && (
                                  <span className={cn(
                                    "text-[10px] font-bold px-3 py-1 rounded-full",
                                    sub.hot && "bg-gradient-to-r from-red-500 to-orange-500 text-white",
                                    sub.new && "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
                                    sub.special && "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                                    !sub.hot && !sub.new && !sub.special && "bg-gray-200 text-gray-700"
                                  )}>
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                          
                          {/* Special offer banner */}
                          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl shadow-md">
                                  <Gift className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900">Özel Fırsat!</p>
                                  <p className="text-xs text-gray-600">Bu kategoride 2 al 1 öde</p>
                                </div>
                              </div>
                              <span className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-full">
                                KAMPANYA
                              </span>
                            </div>
                          </div>
                          
                          {/* Footer CTA with animation */}
                          <Link 
                            href={category.href}
                            className={cn(
                              "relative block w-full text-center py-4 rounded-2xl font-bold text-white overflow-hidden group/cta transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
                              "bg-gradient-to-r", category.color
                            )}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              Tüm {category.name} Ürünleri
                              <ArrowRight className="h-4 w-4 group-hover/cta:translate-x-2 transition-transform" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link
                  href="/about"
                  className="px-5 py-2.5 rounded-2xl font-medium hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:shadow-lg transition-all duration-500"
                >
                  Hakkımızda
                </Link>

                <Link
                  href="/blog"
                  className="px-5 py-2.5 rounded-2xl font-medium hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:shadow-lg transition-all duration-500"
                >
                  Blog
                </Link>
              </nav>
            </div>

            {/* Right Actions - Ultra Modern */}
            <div className="flex items-center gap-4">
              {/* Search with AI suggestion */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-primary/10 hover:to-accent/10 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/10"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-1 -right-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-primary to-accent"></span>
                    </span>
                  </div>
                </Button>
                
                {/* Advanced Search Dropdown */}
                <div className={cn(
                  "absolute right-0 top-full mt-4 w-[420px] opacity-0 invisible translate-y-4 transition-all duration-500",
                  isSearchOpen && "opacity-100 visible translate-y-0"
                )}>
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <div className="relative">
                        <input
                          type="search"
                          placeholder="Ne aramıştınız?"
                          className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                          autoFocus
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200">⌘K</kbd>
                        </div>
                      </div>
                      
                      {/* AI Suggestions */}
                      <div className="mt-6">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Sparkles className="h-3 w-3" />
                          AI Önerileri
                        </p>
                        <div className="space-y-2">
                          {['Organik Tahin 500g', 'Antep Fıstıklı Helva', 'Üzüm Pekmezi 1kg', 'Özel Gül Lokumu'].map((term, i) => (
                            <button
                              key={term}
                              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-xl transition-all duration-300 group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">{term}</span>
                                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Trending searches footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Zap className="h-3 w-3" />
                        <span>Trend aramalar:</span>
                        <div className="flex gap-2">
                          {['Helva', 'Tahin', 'Lokum'].map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white rounded-full text-xs font-medium hover:bg-primary hover:text-white cursor-pointer transition-all">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User & Wishlist Capsule */}
              <div className="hidden md:flex items-center bg-gradient-to-r from-gray-100 to-gray-50 rounded-full p-1.5 gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative w-10 h-10 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <User className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
                </Button>

                <div className="h-6 w-px bg-gray-300"></div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative w-10 h-10 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <Heart className="h-5 w-5 relative z-10 group-hover:scale-110 group-hover:text-red-500 transition-all" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg animate-bounce">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Premium Cart Button */}
              <Link href="/cart" className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Button 
                  className="relative rounded-2xl bg-gradient-to-r from-primary via-red-500 to-primary bg-200% animate-gradient text-white pl-4 pr-5 py-2.5 flex items-center gap-3 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-500"
                >
                  <div className="relative">
                    <ShoppingBag className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-white text-primary text-[11px] font-black flex items-center justify-center shadow-lg border-2 border-primary animate-bounce">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] opacity-90 font-medium">Sepetim</span>
                    <span className="text-base font-black">₺249,90</span>
                  </div>
                  <div className="ml-2 h-8 w-px bg-white/20"></div>
                  <ChevronDown className="h-4 w-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-primary/10 hover:to-accent/10 transition-all duration-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span className={cn(
                    "absolute h-0.5 w-6 bg-gray-900 transform transition-all duration-500",
                    isMenuOpen ? "rotate-45" : "-translate-y-2"
                  )}></span>
                  <span className={cn(
                    "absolute h-0.5 w-6 bg-gray-900 transition-all duration-500",
                    isMenuOpen && "opacity-0"
                  )}></span>
                  <span className={cn(
                    "absolute h-0.5 w-6 bg-gray-900 transform transition-all duration-500",
                    isMenuOpen ? "-rotate-45" : "translate-y-2"
                  )}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Mobile Menu */}
        <div className={cn(
          "xl:hidden bg-white/95 backdrop-blur-2xl absolute top-full left-0 right-0 shadow-2xl transition-all duration-500 max-h-[calc(100vh-80px)] overflow-y-auto",
          isMenuOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-8"
        )}>
          {/* Mobile menu content here - similar structure but optimized for mobile */}
        </div>
      </nav>
    </>
  )
}