"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, Check, ChevronDown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieConsent")
    if (!cookieChoice) {
      // Show cookie consent after a short delay
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted))
    localStorage.setItem("cookieConsentDate", new Date().toISOString())
    setIsVisible(false)
  }

  const handleAcceptSelected = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences))
    localStorage.setItem("cookieConsentDate", new Date().toISOString())
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    localStorage.setItem("cookieConsent", JSON.stringify(onlyNecessary))
    localStorage.setItem("cookieConsentDate", new Date().toISOString())
    setIsVisible(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const cookieTypes = [
    {
      key: "necessary" as const,
      title: "Zorunlu Çerezler",
      description: "Web sitesinin temel işlevleri için gereklidir. Bu çerezler olmadan site düzgün çalışmaz.",
      examples: "Oturum yönetimi, güvenlik, alışveriş sepeti",
      canDisable: false
    },
    {
      key: "analytics" as const,
      title: "Analitik Çerezler",
      description: "Web sitesi kullanımını analiz etmek ve iyileştirmeler yapmak için kullanılır.",
      examples: "Google Analytics, ziyaretçi istatistikleri",
      canDisable: true
    },
    {
      key: "marketing" as const,
      title: "Pazarlama Çerezleri",
      description: "Size özel reklamlar ve kampanyalar sunmak için kullanılır.",
      examples: "Reklam ağları, sosyal medya pikselleri",
      canDisable: true
    },
    {
      key: "preferences" as const,
      title: "Tercih Çerezleri",
      description: "Tercihlerinizi hatırlamak ve kişiselleştirilmiş deneyim sunmak için kullanılır.",
      examples: "Dil tercihi, tema ayarları",
      canDisable: true
    }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-8 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-neutral-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-neutral-900">Çerez Kullanımı</h3>
                      <p className="text-xs text-neutral-500 mt-1">Gizliliğiniz bizim için önemli</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">
                  Size daha iyi bir deneyim sunmak için çerezler kullanıyoruz. Çerezler, web sitesi 
                  işlevselliğini sağlamak, kullanım istatistiklerini toplamak ve size özel içerik 
                  sunmak için kullanılır. Tercihlerinizi aşağıdan yönetebilirsiniz.
                </p>

                {/* Quick Actions - Mobile */}
                <div className="grid grid-cols-1 sm:hidden gap-3 mb-4">
                  <Button
                    onClick={handleAcceptAll}
                    className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-light"
                  >
                    Tümünü Kabul Et
                  </Button>
                  <Button
                    onClick={() => setShowDetails(!showDetails)}
                    variant="outline"
                    className="w-full h-12 border-neutral-300 font-light"
                  >
                    Tercihlerimi Yönet
                    <ChevronDown className={cn("w-4 h-4 ml-2 transition-transform", showDetails && "rotate-180")} />
                  </Button>
                </div>
              </div>

              {/* Details Section */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 py-6 border-t border-neutral-100">
                      <div className="space-y-4">
                        {cookieTypes.map((type) => (
                          <div
                            key={type.key}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
                          >
                            <div className="mt-1">
                              <button
                                onClick={() => togglePreference(type.key)}
                                disabled={!type.canDisable}
                                className={cn(
                                  "w-12 h-6 rounded-full transition-all duration-300 relative",
                                  preferences[type.key] ? "bg-neutral-900" : "bg-neutral-300",
                                  !type.canDisable && "opacity-50 cursor-not-allowed"
                                )}
                              >
                                <span
                                  className={cn(
                                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                                    preferences[type.key] ? "left-7" : "left-1"
                                  )}
                                />
                              </button>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-sm font-medium text-neutral-900 mb-1">
                                    {type.title}
                                    {!type.canDisable && (
                                      <span className="ml-2 text-xs text-neutral-500">(Zorunlu)</span>
                                    )}
                                  </h4>
                                  <p className="text-xs text-neutral-600 font-light mb-2">
                                    {type.description}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    Örnekler: {type.examples}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-neutral-100">
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Shield className="w-4 h-4" />
                          <p>
                            Verileriniz KVKK kapsamında korunmaktadır. 
                            <Link href="/privacy" className="underline hover:text-neutral-700 ml-1">
                              Gizlilik Politikası
                            </Link>
                            {" ve "}
                            <Link href="/cookies" className="underline hover:text-neutral-700">
                              Çerez Politikası
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions - Desktop */}
              <div className="hidden sm:flex items-center justify-between p-6 md:p-8 pt-0">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-neutral-600 hover:text-neutral-900 font-light flex items-center gap-2"
                >
                  Tercihlerimi Yönet
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showDetails && "rotate-180")} />
                </button>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleRejectAll}
                    variant="ghost"
                    className="h-10 px-6 font-light text-neutral-600 hover:text-neutral-900"
                  >
                    Sadece Zorunlu
                  </Button>
                  {showDetails && (
                    <Button
                      onClick={handleAcceptSelected}
                      variant="outline"
                      className="h-10 px-6 font-light border-neutral-300"
                    >
                      Seçilenleri Kabul Et
                    </Button>
                  )}
                  <Button
                    onClick={handleAcceptAll}
                    className="h-10 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-light"
                  >
                    Tümünü Kabul Et
                  </Button>
                </div>
              </div>

              {/* Mobile Actions when Details Open */}
              {showDetails && (
                <div className="sm:hidden p-6 pt-0 grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="h-10 font-light border-neutral-300"
                  >
                    Sadece Zorunlu
                  </Button>
                  <Button
                    onClick={handleAcceptSelected}
                    className="h-10 bg-neutral-900 hover:bg-neutral-800 text-white font-light"
                  >
                    Seçilenleri Kabul Et
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Cookie Settings Button Component (for footer or settings page)
export function CookieSettingsButton() {
  const [showConsent, setShowConsent] = useState(false)

  const handleClick = () => {
    // Clear existing consent to show the banner again
    localStorage.removeItem("cookieConsent")
    localStorage.removeItem("cookieConsentDate")
    window.location.reload()
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <Cookie className="w-4 h-4" />
      Çerez Ayarları
    </button>
  )
}