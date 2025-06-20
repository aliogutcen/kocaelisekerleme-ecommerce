"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Shield, Award, Check } from "lucide-react"

interface TabContent {
  overview: {
    description: string
    features: string[]
    ingredients: string
    storage: string
  }
  details?: {
    sku: string
  }
  nutrition: {
    serving: string
    calories: string
    protein: string
    fat: string
    carbs: string
  }
  usage?: string
}

interface ProductTabsProps {
  content: TabContent
}

export function ProductTabs({ content }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "OVERVIEW" },
    { id: "details", label: "DETAILS" },
    { id: "nutrition", label: "NUTRITION" },
    { id: "usage", label: "USAGE" }
  ]

  return (
    <section className="mt-20 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Tab Navigation - Fixed */}
        <div className="relative">
          <div className="flex justify-center overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="inline-flex gap-6 sm:gap-8 md:gap-16 border-b border-neutral-200 min-w-max md:min-w-min">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative py-6 px-3 md:px-2 text-[11px] tracking-[0.2em] transition-all whitespace-nowrap flex-shrink-0",
                    activeTab === tab.id
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-400 hover:text-neutral-600 font-light"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content - Centered */}
        <div className="py-16 max-w-4xl mx-auto px-4">
          {activeTab === "overview" && (
            <div className="space-y-16">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">Product Description</h3>
                <p className="text-neutral-700 leading-loose font-light">
                  {content.overview.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">Key Features</h4>
                  <ul className="space-y-3">
                    {content.overview.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-neutral-600 font-light">
                        <span className="text-neutral-400 mt-1.5">—</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">Ingredients</h4>
                    <p className="text-sm text-neutral-600 font-light">{content.overview.ingredients}</p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">Storage Instructions</h4>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">{content.overview.storage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">Product Details</h4>
                  <dl className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-neutral-100">
                      <dt className="text-sm text-neutral-500 font-light">SKU</dt>
                      <dd className="text-sm text-neutral-700">{content.details?.sku || 'TAH-ORG-350'}</dd>
                    </div>
                    <div className="flex justify-between py-3 border-b border-neutral-100">
                      <dt className="text-sm text-neutral-500 font-light">Weight</dt>
                      <dd className="text-sm text-neutral-700">350g / 600g / 1kg</dd>
                    </div>
                    <div className="flex justify-between py-3 border-b border-neutral-100">
                      <dt className="text-sm text-neutral-500 font-light">Origin</dt>
                      <dd className="text-sm text-neutral-700">Turkey</dd>
                    </div>
                    <div className="flex justify-between py-3 border-b border-neutral-100">
                      <dt className="text-sm text-neutral-500 font-light">Shelf Life</dt>
                      <dd className="text-sm text-neutral-700">12 months</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">Certifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-neutral-700">Organic Certified</p>
                        <p className="text-xs text-neutral-500 mt-1">EU Organic Regulation (EC) No 834/2007</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-neutral-700">ISO 22000:2018</p>
                        <p className="text-xs text-neutral-500 mt-1">Food Safety Management System</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-neutral-700">Halal Certified</p>
                        <p className="text-xs text-neutral-500 mt-1">Turkish Standards Institution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="text-center">
              <h3 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-10">
                Nutrition Facts per {content.nutrition.serving}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-3xl mx-auto">
                <div className="text-center">
                  <p className="text-3xl font-extralight text-neutral-900 mb-2">{content.nutrition.calories}</p>
                  <p className="text-xs tracking-wider text-neutral-500 uppercase">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extralight text-neutral-900 mb-2">{content.nutrition.protein}</p>
                  <p className="text-xs tracking-wider text-neutral-500 uppercase">Protein (g)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extralight text-neutral-900 mb-2">{content.nutrition.fat}</p>
                  <p className="text-xs tracking-wider text-neutral-500 uppercase">Fat (g)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extralight text-neutral-900 mb-2">{content.nutrition.carbs}</p>
                  <p className="text-xs tracking-wider text-neutral-500 uppercase">Carbs (g)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-12 max-w-3xl mx-auto">
              <div>
                <h4 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">How to Use</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-thin text-neutral-300">01</span>
                    <div>
                      <h5 className="text-sm font-medium text-neutral-700 mb-2">For Breakfast</h5>
                      <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        Spread on fresh bread or toast. Mix with honey for a sweet treat, or enjoy plain for the authentic taste.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-thin text-neutral-300">02</span>
                    <div>
                      <h5 className="text-sm font-medium text-neutral-700 mb-2">In Cooking</h5>
                      <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        Perfect for hummus, salad dressings, and Middle Eastern dishes. Add to smoothies for extra nutrition.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-thin text-neutral-300">03</span>
                    <div>
                      <h5 className="text-sm font-medium text-neutral-700 mb-2">For Desserts</h5>
                      <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        Essential ingredient for halva, cookies, and energy balls. Drizzle over ice cream or yogurt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-neutral-100 pt-12">
                <h4 className="text-[11px] font-extralight tracking-[0.3em] text-neutral-400 uppercase mb-6">Recipe Ideas</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🥗</span>
                    </div>
                    <h5 className="text-sm font-light mb-2">Tahini Dressing</h5>
                    <p className="text-xs text-neutral-500 font-light">Mix with lemon juice, garlic, and water</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🍪</span>
                    </div>
                    <h5 className="text-sm font-light mb-2">Tahini Cookies</h5>
                    <p className="text-xs text-neutral-500 font-light">Combine with flour, sugar, and bake</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🥤</span>
                    </div>
                    <h5 className="text-sm font-light mb-2">Power Smoothie</h5>
                    <p className="text-xs text-neutral-500 font-light">Blend with banana and dates</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}