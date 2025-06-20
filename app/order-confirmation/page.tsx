"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')

  if (!orderId) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Siparişiniz Alındı!
          </h1>
          <p className="text-gray-600 mb-8">
            Siparişinizi başarıyla aldık. En kısa sürede hazırlayıp kargoya vereceğiz.
          </p>

          {/* Order Number */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Sipariş Numaranız</p>
            <p className="text-xl font-mono font-semibold text-gray-900">{orderId}</p>
          </div>

          {/* What's Next */}
          <div className="text-left mb-8">
            <h2 className="text-lg font-semibold mb-4">Bundan Sonra Ne Olacak?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">E-posta Onayı</h3>
                  <p className="text-sm text-gray-600">
                    Sipariş detaylarınızı içeren bir e-posta gönderdik.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">Hazırlık</h3>
                  <p className="text-sm text-gray-600">
                    Siparişiniz özenle hazırlanacak ve paketlenecek.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Kargo</h3>
                  <p className="text-sm text-gray-600">
                    1-3 iş günü içinde kargoya teslim edilecek.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/account/orders">Siparişlerimi Görüntüle</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Alışverişe Devam Et</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600">
              Sorularınız mı var? Bize{" "}
              <a href="mailto:destek@kocaelisekerleme.com" className="text-blue-600 hover:underline">
                destek@kocaelisekerleme.com
              </a>{" "}
              adresinden ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}