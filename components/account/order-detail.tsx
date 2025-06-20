"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  MapPin,
  CreditCard,
  ChevronLeft,
  Download,
  Copy,
  Phone,
  Mail,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface OrderDetailProps {
  orderId: string
}

const statusConfig = {
  pending: {
    label: "Beklemede",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    description: "Siparişiniz onay bekliyor"
  },
  processing: {
    label: "Hazırlanıyor",
    color: "bg-blue-100 text-blue-800",
    icon: Package,
    description: "Siparişiniz hazırlanıyor"
  },
  shipped: {
    label: "Kargoda",
    color: "bg-purple-100 text-purple-800",
    icon: Truck,
    description: "Siparişiniz kargoya verildi"
  },
  delivered: {
    label: "Teslim Edildi",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    description: "Siparişiniz teslim edildi"
  },
  cancelled: {
    label: "İptal Edildi",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
    description: "Siparişiniz iptal edildi"
  }
}

const paymentMethodLabels = {
  credit_card: "Kredi Kartı",
  debit_card: "Banka Kartı",
  bank_transfer: "Havale/EFT",
  cash_on_delivery: "Kapıda Ödeme"
}

export default function OrderDetail({ orderId }: OrderDetailProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copying, setCopying] = useState(false)

  useEffect(() => {
    fetchOrderDetail()
  }, [orderId])

  const fetchOrderDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/account/orders/${orderId}`)
      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Sipariş detayları yüklenirken bir hata oluştu')
        return
      }

      setOrder(data.order)
    } catch (error) {
      setError('Sipariş detayları yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToOrders = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('section', 'orders')
    params.delete('orderId')
    router.push(`/account?${params.toString()}`)
  }

  const copyOrderNumber = async () => {
    if (!order) return
    setCopying(true)
    await navigator.clipboard.writeText(order.orderNumber)
    toast({
      title: "Kopyalandı",
      description: "Sipariş numarası panoya kopyalandı",
    })
    setTimeout(() => setCopying(false), 2000)
  }

  const downloadInvoice = () => {
    toast({
      title: "Fatura İndiriliyor",
      description: "Faturanız hazırlanıyor...",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Sipariş bulunamadı'}</p>
        <Button onClick={handleBackToOrders} variant="outline">
          Siparişlere Dön
        </Button>
      </div>
    )
  }

  const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = statusInfo.icon

  const subtotal = order.items.reduce((sum: number, item: any) => 
    sum + (parseFloat(item.price) * item.quantity), 0
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToOrders}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-light text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Sipariş Detayı
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-gray-600">Sipariş No:</p>
              <code className="text-sm font-mono bg-gray-100 px-2 py-0.5 rounded">
                {order.orderNumber}
              </code>
              <button
                onClick={copyOrderNumber}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {copying ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
        <Button
          onClick={downloadInvoice}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Faturayı İndir
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={cn("p-3 rounded-full", statusInfo.color)}>
                  <StatusIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{statusInfo.label}</h3>
                  <p className="text-sm text-gray-600">{statusInfo.description}</p>
                </div>
              </div>
              <Badge variant="secondary">
                {new Date(order.createdAt).toLocaleDateString('tr-TR')}
              </Badge>
            </div>

            {/* Order Timeline */}
            {order.status !== 'cancelled' && (
              <div className="relative">
                <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                    const isActive = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index
                    const config = statusConfig[status as keyof typeof statusConfig]
                    const Icon = config.icon
                    
                    return (
                      <div key={status} className="flex items-center gap-4">
                        <div className={cn(
                          "relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                          isActive ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400"
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={cn(
                            "font-medium",
                            isActive ? "text-gray-900" : "text-gray-400"
                          )}>
                            {config.label}
                          </p>
                          {isActive && order.status === status && (
                            <p className="text-sm text-gray-600 mt-0.5">
                              {new Date(order.updatedAt).toLocaleString('tr-TR')}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-medium mb-4">Sipariş Ürünleri</h3>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.product?.images?.[0]?.url || "/placeholder.png"}
                      alt={item.product?.name || 'Ürün'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product?.slug || item.productId}`}
                      className="font-medium hover:text-gray-600 transition-colors"
                    >
                      {item.product?.name || 'Ürün'}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.quantity} adet × {parseFloat(item.price).toFixed(2)} ₺
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {(parseFloat(item.price) * item.quantity).toFixed(2)} ₺
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Addresses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-medium mb-4">Adres Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <h4 className="font-medium">Teslimat Adresi</h4>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                  </p>
                  <p>{order.shippingAddress?.addressLine1}</p>
                  {order.shippingAddress?.addressLine2 && (
                    <p>{order.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.shippingAddress?.district}, {order.shippingAddress?.city}
                  </p>
                  <p>{order.shippingAddress?.postalCode}</p>
                  <p className="pt-2">{order.shippingAddress?.phone}</p>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <h4 className="font-medium">Fatura Adresi</h4>
                </div>
                {order.billingAddressId === order.shippingAddressId ? (
                  <p className="text-sm text-gray-600">Teslimat adresi ile aynı</p>
                ) : (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">
                      {order.billingAddress?.firstName} {order.billingAddress?.lastName}
                    </p>
                    <p>{order.billingAddress?.addressLine1}</p>
                    {order.billingAddress?.addressLine2 && (
                      <p>{order.billingAddress.addressLine2}</p>
                    )}
                    <p>
                      {order.billingAddress?.district}, {order.billingAddress?.city}
                    </p>
                    <p>{order.billingAddress?.postalCode}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h3 className="text-lg font-medium mb-4">Sipariş Özeti</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ara Toplam</span>
                <span>{subtotal.toFixed(2)} ₺</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kargo</span>
                <span>{parseFloat(order.shippingCost).toFixed(2)} ₺</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Toplam</span>
                <span className="text-lg">{parseFloat(order.totalAmount).toFixed(2)} ₺</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ödeme Yöntemi</p>
                <p className="font-medium">
                  {paymentMethodLabels[order.paymentMethod as keyof typeof paymentMethodLabels]}
                </p>
              </div>
              {order.notes && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sipariş Notu</p>
                  <p className="text-sm">{order.notes}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h3 className="text-lg font-medium mb-4">Yardıma mı ihtiyacınız var?</h3>
            <div className="space-y-3">
              <a
                href="tel:+902623214567"
                className="flex items-center gap-3 text-sm hover:text-gray-600 transition-colors"
              >
                <Phone className="h-4 w-4 text-gray-400" />
                <span>0262 321 45 67</span>
              </a>
              <a
                href="mailto:destek@kocaelisekerleme.com"
                className="flex items-center gap-3 text-sm hover:text-gray-600 transition-colors"
              >
                <Mail className="h-4 w-4 text-gray-400" />
                <span>destek@kocaelisekerleme.com</span>
              </a>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500">
                Çalışma Saatleri: Pazartesi - Cumartesi 09:00 - 18:00
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          {order.status === 'delivered' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button className="w-full" variant="outline">
                Ürünleri Değerlendir
              </Button>
              <Button className="w-full" variant="outline">
                Tekrar Sipariş Ver
              </Button>
            </motion.div>
          )}

          {order.status === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button className="w-full" variant="destructive">
                Siparişi İptal Et
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}