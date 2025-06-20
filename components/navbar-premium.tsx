"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, Menu, User, Globe, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CartCount } from "@/components/cart-count"

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
      <div className="bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-2 text-xs">
            <button className="hover:opacity-60 transition-opacity flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" />
              <span className="font-light">Türkiye (TRY)</span>
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
          ? "bg-background/98 backdrop-blur-md shadow-sm border-gray-200" 
          : "bg-background/95 backdrop-blur-sm border-gray-100"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="relative group">
              <div className="text-xl font-light tracking-[0.3em] uppercase text-gray-900">
                Kocaeli
              </div>
              <div className="text-[10px] tracking-[0.4em] text-gray-600 uppercase -mt-1 font-medium">
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
            <div className="flex items-center gap-6">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-60 transition-opacity text-gray-900"
              >
                <Search className="h-5 w-5 stroke-[1.5]" />
              </button>

              {/* Account */}
              <Link href="/account" className="hover:opacity-60 transition-opacity hidden md:block text-gray-900">
                <User className="h-5 w-5 stroke-[1.5]" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="hover:opacity-60 transition-opacity relative text-gray-900">
                <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
                <CartCount />
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden hover:opacity-60 transition-opacity text-gray-900"
              >
                <Menu className="h-5 w-5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-background z-50">
            <div className="container mx-auto px-6 py-20">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-gray-900 transition-colors"
              >
                ×
              </button>
              
              <div className="max-w-2xl mx-auto">
                <input
                  type="search"
                  placeholder="Arama yapın..."
                  className="w-full text-3xl font-light border-b border-gray-200 pb-4 focus:outline-none focus:border-black transition-colors"
                  autoFocus
                />
                
                <div className="mt-12">
                  <h3 className="text-xs font-medium tracking-wider text-gray-700 uppercase mb-6">
                    Popüler Aramalar
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Tahin', 'Helva', 'Organik', 'Hediye Seti'].map((term) => (
                      <button
                        key={term}
                        className="text-left text-sm text-gray-800 hover:text-gray-900 hover:font-medium transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

       

        {/* Mobile Menu */}
        
      </nav>
    </>
  )
}