"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Info, Cookie, ChefHat, Truck } from "lucide-react"

interface TabContent {
  description: string
  ingredients: string[]
  nutritionInfo: {
    calories: string
    protein: string
    carbs: string
    fat: string
    fiber: string
    sodium: string
  }
  allergens: string[]
  preparation: string
}

interface ProductTabsProps {
  content: TabContent
}

export function ProductTabsFood({ content }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Açıklama", icon: <Info className="h-4 w-4" /> },
    { id: "ingredients", label: "İçindekiler", icon: <Cookie className="h-4 w-4" /> },
    { id: "nutrition", label: "Besin Değerleri", icon: <ChefHat className="h-4 w-4" /> },
    { id: "delivery", label: "Teslimat", icon: <Truck className="h-4 w-4" /> }
  ]

  return (
    <section className="mt-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex justify-center">
            <div className="flex gap-2 md:gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative py-4 px-4 md:px-6 text-sm font-medium transition-all flex items-center gap-2",
                    activeTab === tab.id
                      ? "text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.slice(0, 3)}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-12 max-w-4xl mx-auto">
          {activeTab === "description" && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ürün Açıklaması</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.description}
                </p>
              </div>
              
              {content.allergens.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-medium text-yellow-900 mb-3 flex items-center gap-2">
                    <span>⚠️</span> Alerjen Uyarısı
                  </h4>
                  <p className="text-sm text-yellow-800">
                    Bu ürün {content.allergens.join(", ")} içermektedir.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">İçindekiler</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-red-600 mt-1">•</span>
                      <span className="text-gray-700">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6 text-center">
                <p className="text-sm text-red-800">
                  <strong>Hazırlama:</strong> {content.preparation}
                </p>
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Besin Değerleri (100g)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-red-600">{content.nutritionInfo.calories}</p>
                  <p className="text-sm text-gray-600 mt-1">Kalori</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-gray-900">{content.nutritionInfo.protein}g</p>
                  <p className="text-sm text-gray-600 mt-1">Protein</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-gray-900">{content.nutritionInfo.carbs}g</p>
                  <p className="text-sm text-gray-600 mt-1">Karbonhidrat</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-gray-900">{content.nutritionInfo.fat}g</p>
                  <p className="text-sm text-gray-600 mt-1">Yağ</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-gray-900">{content.nutritionInfo.fiber}g</p>
                  <p className="text-sm text-gray-600 mt-1">Lif</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-gray-900">{content.nutritionInfo.sodium}mg</p>
                  <p className="text-sm text-gray-600 mt-1">Sodyum</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Teslimat Bilgileri</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Hızlı Teslimat</h4>
                  <p className="text-sm text-gray-600">2-3 saat içinde kapınızda</p>
                </div>
                
                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌡️</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Sıcak Teslimat</h4>
                  <p className="text-sm text-gray-600">Özel termal çantalarla</p>
                </div>
                
                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Güvenli Paketleme</h4>
                  <p className="text-sm text-gray-600">Hijyenik ve özenli</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Minimum Sipariş:</strong> ₺50 • <strong>Ücretsiz Teslimat:</strong> ₺150 ve üzeri siparişlerde
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}