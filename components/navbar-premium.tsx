"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Menu, User, Globe, ChevronDown, X, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CartCount } from "@/components/cart-count"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  {
    name: "Koleksiyonlar",
    href: "/collections",
    featured: [
      {
        name: "Signature Series",
        description: "Özel üretim tahini koleksiyonu",
        href: "/collections/signature",
        image: "/hero.jpg"
      },
      {
        name: "Heritage Collection",
        description: "1948'den gelen lezzetler",
        href: "/collections/heritage",
        image: "/hero.jpg"
      }
    ],
    categories: [
      { name: "Tahin", href: "/products/tahin" },
      { name: "Helva", href: "/products/helva" },
      { name: "Pekmez", href: "/products/pekmez" },
      { name: "Lokum", href: "/products/lokum" }
    ]
  },
  {
    name: "Hikayemiz",
    href: "/about"
  },
  {
    name: "Sürdürülebilirlik",
    href: "/sustainability"
  }
]

export function NavbarPremium() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Announcement Bar - Minimal */}
      <div className="bg-black text-white relative z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-2 text-[10px] md:text-xs">
            <button className="hover:opacity-60 transition-opacity flex items-center gap-1 md:gap-2">
              <Globe className="h-3 w-3 md:h-3.5 md:w-3.5" />
              <span className="font-light">Türkiye</span>
            </button>
            <p className="hidden md:block font-light">Ücretsiz kargo: 500₺ ve üzeri alışverişlerde</p>
            <Link href="/help" className="hover:opacity-60 transition-opacity font-light">
              Yardım
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "sticky top-0 z-50 transition-all duration-700 border-b",
        isScrolled 
          ? "bg-white/98 backdrop-blur-md shadow-sm border-gray-200" 
          : "bg-white/95 backdrop-blur-sm border-gray-100"
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="relative group">
              <div className="text-base md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-900">
                Kocaeli
              </div>
              <div className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gray-600 uppercase -mt-1 font-medium">
                Şekerleme
              </div>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-light tracking-wide text-gray-900 hover:text-gray-600 transition-all duration-300",
                      activeMenu === item.name && "text-gray-600"
                    )}
                  >
                    {item.name}
                  </Link>

                  {/* Dropdown for Collections */}
                  {item.featured && (
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-6 opacity-0 invisible transition-all duration-500",
                      activeMenu === item.name && "opacity-100 visible"
                    )}>
                      <div className="bg-background shadow-lg min-w-[800px] border border-gray-100">
                        <div className="grid grid-cols-3 gap-0">
                          {/* Featured Collections */}
                          <div className="col-span-2 grid grid-cols-2">
                            {item.featured.map((feature) => (
                              <Link
                                key={feature.name}
                                href={feature.href}
                                className="group relative h-80 overflow-hidden"
                              >
                                <Image
                                  src={feature.image}
                                  alt={feature.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                  <h3 className="text-lg font-light mb-2">{feature.name}</h3>
                                  <p className="text-sm opacity-80">{feature.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Categories */}
                          <div className="bg-secondary p-8">
                            <h3 className="text-xs font-medium tracking-wider text-gray-700 uppercase mb-6">
                              Kategoriler
                            </h3>
                            <ul className="space-y-4">
                              {item.categories.map((category) => (
                                <li key={category.name}>
                                  <Link
                                    href={category.href}
                                    className="text-sm text-gray-800 hover:text-gray-900 hover:font-medium transition-all"
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-60 transition-opacity text-gray-900 p-2 -m-2 md:p-0 md:m-0"
              >
                <Search className="h-5 w-5 md:h-5 md:w-5 stroke-[1.5]" />
              </button>

              {/* Account */}
              <Link href="/account" className="hover:opacity-60 transition-opacity hidden sm:block text-gray-900 p-2 -m-2 md:p-0 md:m-0">
                <User className="h-5 w-5 md:h-5 md:w-5 stroke-[1.5]" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="hover:opacity-60 transition-opacity relative text-gray-900 p-2 -m-2 md:p-0 md:m-0">
                <ShoppingBag className="h-5 w-5 md:h-5 md:w-5 stroke-[1.5]" />
                <CartCount />
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden hover:opacity-60 transition-opacity text-gray-900 p-2 -m-2 md:p-0 md:m-0"
              >
                <Menu className="h-5 w-5 md:h-5 md:w-5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay - Luxury Premium */}
        <AnimatePresence>
          {isSearchOpen && (
            <>
              {/* Background Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[90]"
                onClick={() => setIsSearchOpen(false)}
              />
              
              {/* Search Modal */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="fixed top-0 left-0 right-0 bg-white z-[100] shadow-2xl"
              >
                <div className="container mx-auto px-4 md:px-6">
                  {/* Search Input Area */}
                  <div className="py-8 md:py-12">
                    <div className="flex items-center gap-4 md:gap-6">
                      <Search className="w-6 h-6 md:w-7 md:h-7 text-neutral-400 flex-shrink-0" strokeWidth={1} />
                      <input
                        type="search"
                        placeholder="Ürün, kategori veya marka arayın..."
                        className="flex-1 text-xl md:text-3xl font-extralight text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                        autoFocus
                      />
                      <button
                        onClick={() => setIsSearchOpen(false)}
                        className="p-2 md:p-3 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 md:w-6 md:h-6 text-neutral-600" strokeWidth={1} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Quick Links */}
                  <div className="border-t border-neutral-100 py-6 md:py-8">
                    <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">Hızlı Erişim</p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {['Tahin Helvası', 'Organik', 'Hediye Seti', 'Lokum', 'Pekmez'].map((term) => (
                        <button
                          key={term}
                          className="px-4 md:px-5 py-2 md:py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm md:text-base font-light text-neutral-700 transition-colors"
                          onClick={() => {
                            // Handle search
                            setIsSearchOpen(false)
                          }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Searches */}
                  <div className="border-t border-neutral-100 py-6 md:py-8">
                    <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">Son Aramalar</p>
                    <div className="space-y-3">
                      {['Antep Fıstıklı Helva', 'Tahin 500g', 'Gül Lokumu'].map((term, index) => (
                        <button
                          key={term}
                          className="flex items-center gap-3 w-full text-left group"
                          onClick={() => {
                            // Handle search
                            setIsSearchOpen(false)
                          }}
                        >
                          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                            <Search className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1} />
                          </div>
                          <span className="text-sm md:text-base font-light text-neutral-600 group-hover:text-neutral-900 transition-colors">{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

       

      </nav>

      {/* Mobile Menu - Luxury Premium Design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed inset-0 bg-white z-[110] lg:hidden overflow-hidden"
            >
              <div className="relative h-full flex flex-col bg-gradient-to-b from-white via-neutral-50/30 to-white">
                {/* Premium Header */}
                <div className="flex items-center justify-between px-4 py-6 border-b border-neutral-100">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase">Menu</p>
                    <h2 className="text-xl font-extralight text-neutral-900 mt-1">Keşfet</h2>
                  </motion.div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group active:bg-neutral-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-600" strokeWidth={1} />
                  </button>
                </div>

                {/* Mobile Navigation - Luxury Premium */}
                <nav className="flex-1 overflow-y-auto overscroll-contain">
                  <div className="px-4 py-8 space-y-0">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="border-b border-neutral-100"
                      >
                        {item.categories ? (
                          <>
                            <button
                              onClick={() => setExpandedCategory(expandedCategory === item.name ? null : item.name)}
                              className="group w-full py-6 relative overflow-hidden"
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-left">
                                  <span className="text-2xl font-extralight text-neutral-900 tracking-tight transition-all duration-300 group-active:text-neutral-600">
                                    {item.name}
                                  </span>
                                  {item.featured && (
                                    <p className="text-xs text-neutral-400 mt-1 tracking-wider uppercase">Koleksiyon</p>
                                  )}
                                </div>
                                <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center group-active:border-neutral-900 transition-all">
                                  <ChevronDown className={`w-4 h-4 text-neutral-400 group-active:text-neutral-900 transition-all ${expandedCategory === item.name ? 'rotate-180' : ''}`} strokeWidth={1} />
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-neutral-50 opacity-0 group-active:opacity-100 transition-opacity duration-200" style={{ zIndex: -1 }} />
                            </button>
                            <AnimatePresence>
                              {expandedCategory === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-4">
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                      {item.categories.map((category) => (
                                        <Link
                                          key={category.name}
                                          href={category.href}
                                          className="text-sm text-neutral-500 active:text-neutral-900 active:bg-neutral-100 transition-all font-light tracking-wide py-2.5 px-4 rounded-full border border-neutral-200"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          {category.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className="group block py-6 relative overflow-hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-2xl font-extralight text-neutral-900 tracking-tight transition-all duration-300 group-active:text-neutral-600">
                                  {item.name}
                                </span>
                              </div>
                              <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center group-active:border-neutral-900 transition-colors">
                                <ArrowRight className="w-4 h-4 text-neutral-400 group-active:text-neutral-900 transition-all" strokeWidth={1} />
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-neutral-50 opacity-0 group-active:opacity-100 transition-opacity duration-200" style={{ zIndex: -1 }} />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                    
                    {/* Premium Actions */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="mt-8 space-y-3"
                    >
                      <Link
                        href="/account"
                        className="group flex items-center justify-between p-5 bg-neutral-900 text-white rounded-lg active:bg-neutral-800 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5" strokeWidth={1} />
                          <span className="text-base font-light tracking-wide">Hesabım</span>
                        </div>
                        <ArrowRight className="w-4 h-4" strokeWidth={1} />
                      </Link>
                    </motion.div>
                  </div>
                </nav>

                {/* Bottom Info - Luxury */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="px-4 py-6 bg-neutral-50 border-t border-neutral-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-1">Müşteri Hizmetleri</p>
                      <a href="tel:02621234567" className="text-sm text-neutral-600 active:text-neutral-900">0262 123 45 67</a>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-1">Çalışma Saatleri</p>
                      <p className="text-xs text-neutral-600">09:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span className="tracking-wide">© 2024</span>
                      <span className="tracking-wide font-light">KOCAELI ŞEKERLEME</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}