"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { User, Package, MapPin, Key, LogOut, ChevronRight } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import ProfileSection from "./profile-section"
import OrderHistory from "./order-history"
import OrderDetail from "./order-detail"
import AddressBook from "./address-book"
import PasswordChange from "./password-change"

interface AccountDashboardProps {
  user: any
}

const menuItems = [
  { id: 'profile', label: 'Profil Bilgileri', icon: User },
  { id: 'orders', label: 'Siparişlerim', icon: Package },
  { id: 'addresses', label: 'Adreslerim', icon: MapPin },
  { id: 'password', label: 'Şifre Değiştir', icon: Key },
]

export default function AccountDashboard({ user }: AccountDashboardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const section = searchParams.get('section') || 'profile'
  const orderId = searchParams.get('orderId')

  const handleSectionChange = (newSection: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('section', newSection)
    // Remove orderId when changing sections
    params.delete('orderId')
    router.push(`/account?${params.toString()}`)
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Hesabım
          </h1>
          <p className="text-gray-500 font-light">
            Hoş geldiniz, {user.name || user.email}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Menu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = section === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-light rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </button>
                )
              })}
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-light text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </nav>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              {section === 'profile' && <ProfileSection user={user} />}
              {section === 'orders' && !orderId && <OrderHistory />}
              {section === 'orders' && orderId && <OrderDetail orderId={orderId} />}
              {section === 'addresses' && <AddressBook />}
              {section === 'password' && <PasswordChange />}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}