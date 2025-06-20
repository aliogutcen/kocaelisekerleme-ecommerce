"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Package, ChevronRight, Loader2, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import { formatDate, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: string
  total: number
  items: {
    id: string
    name: string
    quantity: number
    price: number
  }[]
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Beklemede", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Hazırlanıyor", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Kargoda", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Teslim Edildi", color: "bg-green-100 text-green-800" },
  cancelled: { label: "İptal Edildi", color: "bg-red-100 text-red-800" },
}

export default function OrderHistory() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Get filter values from URL
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const status = searchParams.get('status') || 'all'

  useEffect(() => {
    fetchOrders()
  }, [startDate, endDate, status])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      if (status && status !== 'all') params.append('status', status)
      
      const response = await fetch(`/api/account/orders?${params.toString()}`)
      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Siparişler yüklenirken bir hata oluştu')
        return
      }

      setOrders(data.orders || [])
    } catch (error) {
      setError('Siparişler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set('section', 'orders')
    router.push(`/account?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    params.set('section', 'orders')
    router.push(`/account?${params.toString()}`)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Siparişlerim
            </h2>
            <p className="text-gray-500 font-light text-sm">
              Tüm siparişlerinizi görüntüleyin ve takip edin
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-50 rounded-lg p-4 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-xs font-medium text-gray-700 mb-2 block">
                  Başlangıç Tarihi
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-xs font-medium text-gray-700 mb-2 block">
                  Bitiş Tarihi
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-xs font-medium text-gray-700 mb-2 block">
                  Sipariş Durumu
                </Label>
                <Select value={status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Tümü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="pending">Beklemede</SelectItem>
                    <SelectItem value="processing">Hazırlanıyor</SelectItem>
                    <SelectItem value="shipped">Kargoda</SelectItem>
                    <SelectItem value="delivered">Teslim Edildi</SelectItem>
                    <SelectItem value="cancelled">İptal Edildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Filtreleri Temizle
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-light text-gray-900 mb-2">Henüz siparişiniz yok</h3>
          <p className="text-gray-500 font-light text-sm mb-6">
            İlk siparişinizi vermek için alışverişe başlayın
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider rounded-md transition-all duration-300 hover:shadow-lg">
              Alışverişe Başla
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Sipariş #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusMap[order.status]?.color || 'bg-gray-100 text-gray-800'
                }`}>
                  {statusMap[order.status]?.label || order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-sm text-gray-400">
                    +{order.items.length - 2} ürün daha
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Toplam</p>
                  <p className="text-lg font-medium text-gray-900">{formatPrice(order.total)}</p>
                </div>
                <button 
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set('section', 'orders')
                    params.set('orderId', order.id)
                    router.push(`/account?${params.toString()}`)
                  }}
                  className="flex items-center gap-2 text-sm text-gray-900 hover:text-black transition-colors"
                >
                  Detayları Gör
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}