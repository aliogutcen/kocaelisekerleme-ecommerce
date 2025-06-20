"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Filter,
  Download,
  ChevronDown,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  X,
  Eye,
  Printer,
  Mail,
  Calendar,
  Plus
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data
const orders = [
  {
    id: "KS2025061234",
    customer: {
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      phone: "+90 532 123 45 67"
    },
    date: "20 Haziran 2025, 14:35",
    items: 3,
    total: "249.90",
    payment: "Kredi Kartı",
    status: "processing",
    shipping: {
      method: "Yurtiçi Kargo",
      trackingNumber: "YK123456789TR",
      address: "Merkez Mah. Atatürk Cad. No:45/3 İzmit/Kocaeli"
    }
  },
  {
    id: "KS2025061233",
    customer: {
      name: "Ayşe Demir",
      email: "ayse@example.com",
      phone: "+90 544 987 65 43"
    },
    date: "20 Haziran 2025, 12:20",
    items: 2,
    total: "189.90",
    payment: "Havale/EFT",
    status: "shipped",
    shipping: {
      method: "MNG Kargo",
      trackingNumber: "MNG987654321",
      address: "Yeni Mah. İstasyon Cad. No:12 Gebze/Kocaeli"
    }
  },
  {
    id: "KS2025061232",
    customer: {
      name: "Mehmet Kaya",
      email: "mehmet@example.com",
      phone: "+90 555 111 22 33"
    },
    date: "19 Haziran 2025, 18:45",
    items: 5,
    total: "345.00",
    payment: "Kredi Kartı",
    status: "delivered",
    shipping: {
      method: "Aras Kargo",
      trackingNumber: "ARAS456789123",
      address: "Cumhuriyet Mah. Demokrasi Bulvarı No:78 İstanbul"
    }
  },
  {
    id: "KS2025061231",
    customer: {
      name: "Zeynep Öz",
      email: "zeynep@example.com",
      phone: "+90 533 444 55 66"
    },
    date: "19 Haziran 2025, 16:30",
    items: 1,
    total: "128.50",
    payment: "Kredi Kartı",
    status: "pending",
    shipping: {
      method: "PTT Kargo",
      trackingNumber: "",
      address: "Bahçelievler Mah. Okul Sok. No:5 Ankara"
    }
  },
  {
    id: "KS2025061230",
    customer: {
      name: "Ali Vural",
      email: "ali@example.com",
      phone: "+90 542 333 44 55"
    },
    date: "19 Haziran 2025, 11:15",
    items: 4,
    total: "567.80",
    payment: "Kredi Kartı",
    status: "cancelled",
    shipping: {
      method: "Yurtiçi Kargo",
      trackingNumber: "",
      address: "Karşıyaka Mah. Sahil Cad. No:90 İzmir"
    }
  }
]

const statusOptions = [
  { value: "all", label: "Tümü", icon: null },
  { value: "pending", label: "Beklemede", icon: Clock, color: "text-orange-600" },
  { value: "processing", label: "İşleniyor", icon: Package, color: "text-yellow-600" },
  { value: "shipped", label: "Kargoda", icon: Truck, color: "text-blue-600" },
  { value: "delivered", label: "Teslim Edildi", icon: CheckCircle2, color: "text-green-600" },
  { value: "cancelled", label: "İptal", icon: X, color: "text-red-600" }
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status)
    if (!option) return null

    const colorMap = {
      pending: "bg-orange-100 text-orange-800",
      processing: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    }

    return {
      text: option.label,
      className: colorMap[status as keyof typeof colorMap] || "bg-neutral-100 text-neutral-800",
      icon: option.icon
    }
  }

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders(prev =>
      prev.includes(id)
        ? prev.filter(o => o !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extralight text-neutral-900">Siparişler</h1>
          <p className="text-sm text-neutral-500 mt-1">Toplam {orders.length} sipariş</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button className="bg-neutral-900 hover:bg-neutral-800">
            <Plus className="h-4 w-4 mr-2" />
            Manuel Sipariş
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-4 pb-6 border-b border-neutral-200">
        {statusOptions.map((option) => {
          const count = option.value === "all" 
            ? orders.length 
            : orders.filter(o => o.status === option.value).length

          return (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                selectedStatus === option.value
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              {option.icon && <option.icon className="h-4 w-4" />}
              <span className="text-sm font-light">{option.label}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filters Bar */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Sipariş no, müşteri adı veya e-posta ile ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          {/* Date Range */}
          <Button variant="outline" className="h-10">
            <Calendar className="h-4 w-4 mr-2" />
            Son 30 Gün
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>

          {/* More Filters */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtreler
            <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", showFilters && "rotate-180")} />
          </Button>
        </div>
      </Card>

      {/* Selected Actions */}
      {selectedOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 text-white p-4 rounded-lg flex items-center justify-between"
        >
          <span className="text-sm">{selectedOrders.length} sipariş seçildi</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Yazdır
            </Button>
            <Button variant="secondary" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              E-posta Gönder
            </Button>
            <Button variant="secondary" size="sm">
              Durumu Güncelle
            </Button>
          </div>
        </motion.div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const status = getStatusBadge(order.status)
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                      className="mt-1 rounded border-neutral-300"
                    />
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-neutral-900">#{order.id}</h3>
                        {status && (
                          <span className={cn("text-xs px-2 py-1 rounded-full flex items-center gap-1", status.className)}>
                            {status.icon && <status.icon className="h-3 w-3" />}
                            {status.text}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Detay
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">MÜŞTERİ</p>
                    <p className="text-sm font-medium text-neutral-900">{order.customer.name}</p>
                    <p className="text-sm text-neutral-600">{order.customer.email}</p>
                    <p className="text-sm text-neutral-600">{order.customer.phone}</p>
                  </div>

                  {/* Order Info */}
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">SİPARİŞ BİLGİSİ</p>
                    <p className="text-sm text-neutral-600">{order.items} ürün</p>
                    <p className="text-sm text-neutral-600">{order.payment}</p>
                    <p className="text-lg font-light text-neutral-900 mt-1">{order.total} TL</p>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">KARGO BİLGİSİ</p>
                    <p className="text-sm text-neutral-600">{order.shipping.method}</p>
                    {order.shipping.trackingNumber && (
                      <p className="text-sm font-medium text-neutral-900">{order.shipping.trackingNumber}</p>
                    )}
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{order.shipping.address}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">Sipariş bulunamadı</p>
        </Card>
      )}

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            Toplam {filteredOrders.length} sipariş gösteriliyor
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Önceki
            </Button>
            <Button variant="outline" size="sm">
              Sonraki
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}