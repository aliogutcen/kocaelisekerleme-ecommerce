"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  FileText,
  Image,
  Tag,
  Truck,
  MessageSquare,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true
  },
  {
    title: "Ürünler",
    icon: Package,
    subItems: [
      { title: "Tüm Ürünler", href: "/admin/products" },
      { title: "Yeni Ürün Ekle", href: "/admin/products/new" },
      { title: "Kategoriler", href: "/admin/categories" },
      { title: "Stok Yönetimi", href: "/admin/inventory" }
    ]
  },
  {
    title: "Siparişler",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "12"
  },
  {
    title: "Müşteriler",
    href: "/admin/customers",
    icon: Users
  },
  {
    title: "İçerik",
    icon: FileText,
    subItems: [
      { title: "Blog Yazıları", href: "/admin/blog" },
      { title: "Sayfalar", href: "/admin/pages" },
      { title: "Medya", href: "/admin/media" }
    ]
  },
  {
    title: "Pazarlama",
    icon: Tag,
    subItems: [
      { title: "Kampanyalar", href: "/admin/campaigns" },
      { title: "İndirim Kodları", href: "/admin/discounts" },
      { title: "E-posta Listesi", href: "/admin/newsletter" }
    ]
  },
  {
    title: "Raporlar",
    href: "/admin/analytics",
    icon: BarChart3
  },
  {
    title: "Ayarlar",
    icon: Settings,
    subItems: [
      { title: "Genel Ayarlar", href: "/admin/settings" },
      { title: "Kargo Ayarları", href: "/admin/settings/shipping" },
      { title: "Ödeme Ayarları", href: "/admin/settings/payment" },
      { title: "Kullanıcılar", href: "/admin/settings/users" }
    ]
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-neutral-200 z-40">
        <div className="h-full px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="search"
                placeholder="Ara..."
                className="w-80 h-10 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-neutral-100">
                      <h3 className="font-medium text-neutral-900">Bildirimler</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 hover:bg-neutral-50 cursor-pointer">
                        <p className="text-sm font-medium text-neutral-900">Yeni sipariş!</p>
                        <p className="text-xs text-neutral-500 mt-1">3 dakika önce</p>
                      </div>
                      <div className="p-4 hover:bg-neutral-50 cursor-pointer">
                        <p className="text-sm font-medium text-neutral-900">Stok uyarısı</p>
                        <p className="text-xs text-neutral-500 mt-1">1 saat önce</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                <span className="hidden md:block text-sm">Yönetici</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden"
                  >
                    <Link href="/admin/profile" className="block px-4 py-3 hover:bg-neutral-50 text-sm">
                      Profil
                    </Link>
                    <Link href="/admin/settings" className="block px-4 py-3 hover:bg-neutral-50 text-sm">
                      Ayarlar
                    </Link>
                    <hr className="border-neutral-100" />
                    <button className="w-full text-left px-4 py-3 hover:bg-neutral-50 text-sm text-red-600 flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral-200 z-50 lg:z-30 transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-16 px-6 flex items-center border-b border-neutral-200">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-neutral-900">Kocaeli Admin</h1>
              <p className="text-xs text-neutral-500">Yönetim Paneli</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-light transition-all",
                    isActive(item.href, item.exact)
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-light transition-all",
                      "text-neutral-700 hover:bg-neutral-100"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItems.includes(item.title) && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedItems.includes(item.title) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-11 pr-3 py-1 space-y-1">
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block px-3 py-2 rounded-lg text-sm font-light transition-all",
                                isActive(subItem.href)
                                  ? "bg-neutral-100 text-neutral-900"
                                  : "text-neutral-600 hover:bg-neutral-50"
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <Link href="/" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
            <Truck className="h-4 w-4" />
            Siteye Git
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      <Toaster />

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}