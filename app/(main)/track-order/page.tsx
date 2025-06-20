"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock tracking data
const mockTrackingData = {
  orderNumber: "KS2025061234",
  trackingNumber: "YK123456789TR",
  status: "in_transit",
  estimatedDelivery: "22 Haziran 2025",
  carrier: "Yurtiçi Kargo",
  recipient: "Ahmet Yılmaz",
  deliveryAddress: "Merkez Mah. Atatürk Cad. No:45/3 İzmit/Kocaeli",
  orderDate: "20 Haziran 2025",
  shipmentDate: "21 Haziran 2025",
  trackingHistory: [
    {
      date: "21 Haziran 2025",
      time: "14:30",
      status: "Kargoya Verildi",
      location: "İzmit Şube",
      description: "Kargo şubemize teslim edildi"
    },
    {
      date: "21 Haziran 2025",
      time: "16:45",
      status: "Transfer Merkezinde",
      location: "İzmit Transfer",
      description: "Kargo transfer merkezine ulaştı"
    },
    {
      date: "21 Haziran 2025",
      time: "22:00",
      status: "Yola Çıktı",
      location: "İzmit Transfer",
      description: "Teslimat şubesine doğru yola çıktı"
    },
    {
      date: "22 Haziran 2025",
      time: "08:00",
      status: "Dağıtımda",
      location: "İzmit Teslimat Şubesi",
      description: "Kurye ile dağıtıma çıktı"
    }
  ]
}

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber && !orderNumber) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setShowResults(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'in_transit':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-orange-600" />
      default:
        return <Package className="w-5 h-5 text-neutral-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Teslim Edildi'
      case 'in_transit':
        return 'Yolda'
      case 'processing':
        return 'Hazırlanıyor'
      default:
        return 'Beklemede'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-xs tracking-[0.4em] text-neutral-400 mb-4">KARGO TAKİP</p>
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4">
              Siparişinizi Takip Edin
            </h1>
            <p className="text-lg text-neutral-600 font-light">
              Kargo takip numaranız veya sipariş numaranız ile kargonuzun durumunu sorgulayın
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white border border-neutral-200 p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-neutral-700 mb-2">
                    Kargo Takip Numarası
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Örn: YK123456789TR"
                      className="w-full h-12 pl-12 pr-4 border border-neutral-300 focus:border-neutral-900 transition-colors bg-transparent placeholder:text-neutral-400 text-sm focus:outline-none"
                    />
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-neutral-500">veya</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-neutral-700 mb-2">
                    Sipariş Numarası
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="Örn: KS2025061234"
                      className="w-full h-12 pl-12 pr-4 border border-neutral-300 focus:border-neutral-900 transition-colors bg-transparent placeholder:text-neutral-400 text-sm focus:outline-none"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={(!trackingNumber && !orderNumber) || isLoading}
                  className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      SORGULANIYOR...
                    </div>
                  ) : (
                    'KARGO SORGULA'
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-neutral-100">
                <p className="text-sm text-neutral-600 font-light text-center">
                  Kargo takip numaranızı sipariş onay e-postanızda veya SMS'inizde bulabilirsiniz.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {showResults && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-20 bg-neutral-50"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs tracking-[0.3em] text-neutral-400 mb-2">SİPARİŞ DURUMU</p>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(mockTrackingData.status)}
                      <h2 className="text-2xl font-extralight text-neutral-900">
                        {getStatusText(mockTrackingData.status)}
                      </h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600 mb-1">Tahmini Teslimat</p>
                    <p className="text-lg font-light text-neutral-900">{mockTrackingData.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Sipariş No</p>
                    <p className="font-light text-neutral-900">{mockTrackingData.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Kargo Takip No</p>
                    <p className="font-light text-neutral-900">{mockTrackingData.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Kargo Firması</p>
                    <p className="font-light text-neutral-900">{mockTrackingData.carrier}</p>
                  </div>
                </div>
              </motion.div>

              {/* Tracking Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8"
              >
                <h3 className="text-xl font-light text-neutral-900 mb-8">Kargo Hareketleri</h3>
                
                <div className="space-y-6">
                  {mockTrackingData.trackingHistory.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="relative">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-neutral-900' : 'bg-neutral-300'
                        }`} />
                        {index < mockTrackingData.trackingHistory.length - 1 && (
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-neutral-200" />
                        )}
                      </div>
                      
                      <div className="flex-1 -mt-0.5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-neutral-900">{event.status}</h4>
                            <p className="text-sm text-neutral-600 font-light">{event.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-neutral-900">{event.date}</p>
                            <p className="text-xs text-neutral-500">{event.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Delivery Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
              >
                <div className="bg-white p-8">
                  <h3 className="text-lg font-light text-neutral-900 mb-6">Teslimat Bilgileri</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Alıcı</p>
                      <p className="font-light text-neutral-900">{mockTrackingData.recipient}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Teslimat Adresi</p>
                      <p className="font-light text-neutral-900">{mockTrackingData.deliveryAddress}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Sipariş Tarihi</p>
                        <p className="font-light text-neutral-900">{mockTrackingData.orderDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Kargo Tarihi</p>
                        <p className="font-light text-neutral-900">{mockTrackingData.shipmentDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-900 text-white p-8">
                  <h3 className="text-lg font-light mb-6">Yardıma mı İhtiyacınız Var?</h3>
                  <p className="text-sm opacity-80 mb-8 font-light">
                    Kargonuz hakkında sorularınız varsa müşteri hizmetlerimizle iletişime geçebilirsiniz.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 opacity-60" />
                      <div>
                        <p className="text-xs opacity-60">Telefon</p>
                        <p className="font-light">+90 262 123 45 67</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 opacity-60" />
                      <div>
                        <p className="text-xs opacity-60">E-posta</p>
                        <p className="font-light">destek@kocaelisekerleme.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Info Section */}
      <section className={`py-20 ${showResults ? '' : 'bg-neutral-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">BİLGİ</p>
              <h2 className="text-3xl font-extralight text-neutral-900">Sıkça Sorulan Sorular</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8"
              >
                <h3 className="text-lg font-light text-neutral-900 mb-4">
                  Kargo takip numaram nerede?
                </h3>
                <p className="text-sm text-neutral-600 font-light">
                  Siparişiniz kargoya verildiğinde, kayıtlı e-posta adresinize ve telefon 
                  numaranıza kargo takip bilgileri gönderilir. Ayrıca hesabınızdaki sipariş 
                  detaylarından da ulaşabilirsiniz.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8"
              >
                <h3 className="text-lg font-light text-neutral-900 mb-4">
                  Kargom ne zaman gelir?
                </h3>
                <p className="text-sm text-neutral-600 font-light">
                  Teslimat süresi bulunduğunuz bölgeye göre değişir. Büyükşehirler için 1-2, 
                  il ve ilçe merkezleri için 2-3, köy ve mahalleler için 3-5 iş günü içinde 
                  teslimat yapılır.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8"
              >
                <h3 className="text-lg font-light text-neutral-900 mb-4">
                  Kargom hasarlı geldi?
                </h3>
                <p className="text-sm text-neutral-600 font-light">
                  Kargo teslimi sırasında paketinizde hasar tespit ederseniz, kurye görevlisi 
                  ile tutanak tutturarak ürünü teslim almayın. Durumu 24 saat içinde müşteri 
                  hizmetlerimize bildirin.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-8"
              >
                <h3 className="text-lg font-light text-neutral-900 mb-4">
                  Farklı adrese gönderebilir miyim?
                </h3>
                <p className="text-sm text-neutral-600 font-light">
                  Evet, sipariş verirken teslimat adresi olarak istediğiniz adresi 
                  belirtebilirsiniz. Fatura adresi ile teslimat adresi farklı olabilir.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/shipping">
                <Button variant="outline" className="h-12 px-8 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                  KARGO BİLGİLERİ
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}