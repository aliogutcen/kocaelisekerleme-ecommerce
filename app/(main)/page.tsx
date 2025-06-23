"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Shield, Package, Award } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide with premium timing
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Luxury Premium Mobile */}
      <section className="relative h-screen md:h-[90vh] flex items-center overflow-hidden bg-white">
        {/* All Images Preloaded */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.05
            }}
            transition={{ 
              duration: 2,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
          >
            <Image
              src={index === 0 ? "/hero.jpg" : index === 1 ? "/mobile-hero.jpg" : "/hero.jpg"}
              alt="Kocaeli Şekerleme"
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
          </motion.div>
        ))}
        
        {/* Premium Parallax Overlay */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
        />
        
        {/* Premium Gradient Overlay for Mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 md:from-white/20 md:via-transparent md:to-white/70 pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-8 md:px-4 h-full flex items-center">
          <div className="max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-6 md:space-y-8"
            >
              {/* Premium Badge */}
              <motion.p 
                initial={{ opacity: 0, letterSpacing: "0.1em", y: 20 }}
                animate={{ opacity: 1, letterSpacing: "0.3em", y: 0 }}
                transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[11px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-white/90 md:text-neutral-600 uppercase font-light"
              >
                KOCAELI ŞEKERLEME • EST. 1948
              </motion.p>
              
              {/* Luxury Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white md:text-neutral-900 leading-[1.15]">
                <motion.span 
                  initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="block"
                >
                  Geleneksel
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="block font-light mt-2"
                >
                  Lezzetler
                </motion.span>
              </h1>
              
              {/* Premium Description */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-lg md:text-xl text-white/85 md:text-neutral-700 font-light max-w-lg leading-relaxed"
              >
                77 yıldır aynı özenle ürettiğimiz tahini ve helvalarımızla sofralarınıza değer katıyoruz.
              </motion.p>
              
              {/* Premium Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col sm:flex-row gap-4 pt-6 md:pt-8"
              >
                <Link href="/products" className="group">
                  <Button className="h-14 md:h-12 px-10 md:px-8 bg-white/95 md:bg-neutral-900 backdrop-blur-sm text-neutral-900 md:text-white hover:bg-white md:hover:bg-neutral-800 font-light tracking-[0.15em] w-full sm:w-auto text-[15px] shadow-2xl md:shadow-none transition-all duration-500 group-hover:tracking-[0.2em]">
                    KOLEKSİYONU KEŞFET
                  </Button>
                </Link>
                <Link href="/about" className="group">
                  <Button variant="outline" className="h-14 md:h-12 px-10 md:px-8 border-white/80 md:border-neutral-900 text-white md:text-neutral-900 hover:bg-white/10 md:hover:bg-neutral-900 hover:text-white md:hover:text-white font-light tracking-[0.15em] w-full sm:w-auto text-[15px] backdrop-blur-sm transition-all duration-500 group-hover:tracking-[0.2em] bg-black md:bg-transparent">
                    HİKAYEMİZ
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Premium Slide Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20"
        >
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative overflow-hidden group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`h-[2px] transition-all duration-1000 ${
                currentSlide === index ? "w-12 md:w-16 bg-white/60 md:bg-neutral-400" : "w-6 md:w-8 bg-white/30 md:bg-neutral-300"
              }`} />
              {currentSlide === index && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute inset-0 h-[2px] bg-white md:bg-neutral-900"
                />
              )}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Featured Products - Minimal Grid */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-6 md:px-4">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-neutral-400 mb-4 uppercase">ÖNE ÇIKANLAR</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-neutral-900">En Sevilenler</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="aspect-square relative overflow-hidden bg-neutral-50 mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 text-xs tracking-wider bg-white px-3 py-1">
                        YENİ
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-light text-neutral-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-neutral-600 mb-3">{product.description}</p>
                  <div className="flex items-baseline gap-3">
                    {product.oldPrice && (
                      <span className="text-sm text-neutral-400 line-through">{product.oldPrice} TL</span>
                    )}
                    <span className="text-lg text-neutral-900">{product.price} TL</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products">
              <Button variant="outline" className="h-12 px-8 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                TÜM ÜRÜNLERİ GÖR
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section - Minimal */}
      <section className="py-16 md:py-32 bg-neutral-50">
        <div className="container mx-auto px-6 md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-neutral-400 mb-4 md:mb-6 uppercase">MİRASIMIZ</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-neutral-900 mb-6 md:mb-8">
                1948'den Bugüne
                <span className="block text-xl md:text-2xl mt-2 text-neutral-600">Aynı Tutku, Aynı Özen</span>
              </h2>
              <p className="text-base md:text-lg text-neutral-700 font-light mb-4 md:mb-6 leading-relaxed">
                Kocaeli'nin kalbinde başlayan hikayemiz, üç nesildir aynı tutkuyla devam ediyor.
              </p>
              <p className="text-sm md:text-base text-neutral-600 font-light mb-8 md:mb-12 leading-relaxed">
                Dedelerimizden öğrendiğimiz geleneksel yöntemlerle, en kaliteli hammaddeleri 
                kullanarak üretim yapıyoruz. Her ürünümüz, taş değirmenlerde özenle öğütülmüş 
                susamlardan, el emeğiyle hazırlanmış helvalara kadar, bir ustalık hikayesi taşır.
              </p>
              
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
                <div>
                  <p className="text-2xl md:text-3xl font-extralight text-neutral-900">77</p>
                  <p className="text-[10px] md:text-xs tracking-wider text-neutral-600">YIL</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-extralight text-neutral-900">3</p>
                  <p className="text-[10px] md:text-xs tracking-wider text-neutral-600">NESİL</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-extralight text-neutral-900">%100</p>
                  <p className="text-[10px] md:text-xs tracking-wider text-neutral-600">DOĞAL</p>
                </div>
              </div>

              <Link href="/about">
                <Button className="h-10 md:h-12 px-6 md:px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider text-sm md:text-base">
                  HİKAYEMİZİ OKUYUN
                </Button>
              </Link>
            </div>
            
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src="/hero.jpg"
                alt="Geleneksel Üretim"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Minimal */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-6 md:px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">KATEGORİLER</p>
            <h2 className="text-4xl font-extralight text-neutral-900">Ürün Koleksiyonları</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={category.href} className="group block">
                  <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100 mb-4">
                    <Image
                      src="/hero.jpg"
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-light mb-1">{category.name}</h3>
                      <p className="text-sm opacity-80">{category.count} Ürün</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
     

     

      {/* Trust Badges - Premium Minimal */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <Shield className="w-full h-full text-neutral-300" strokeWidth={0.5} />
                </div>
                <h3 className="text-sm tracking-wider text-neutral-900 mb-3">SERTİFİKALI ÜRETİM</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  ISO 22000 gıda güvenliği standartlarında, hijyenik koşullarda üretim
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <Package className="w-full h-full text-neutral-300" strokeWidth={0.5} />
                </div>
                <h3 className="text-sm tracking-wider text-neutral-900 mb-3">ÖZEL PAKETLEME</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Vakumlu ambalajlarda tazeliği korunmuş, el değmeden paketlenmiş
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <Award className="w-full h-full text-neutral-300" strokeWidth={0.5} />
                </div>
                <h3 className="text-sm tracking-wider text-neutral-900 mb-3">ÖDÜLLÜ LEZZETLER</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Uluslararası lezzet yarışmalarında ödül kazanmış geleneksel tarifler
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Edition - Premium */}
      <section className="py-16 md:py-32 bg-neutral-50">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">ÖZEL KOLEKSİYON</p>
                <h2 className="text-4xl font-extralight text-neutral-900 mb-8">
                  Sınırlı Üretim
                  <span className="block text-2xl mt-2 text-neutral-600">Mevsimlik Lezzetler</span>
                </h2>
                <p className="text-lg text-neutral-700 font-light mb-8 leading-relaxed">
                  Her mevsim, özenle seçilmiş doğal malzemelerle hazırlanan sınırlı sayıda üretim koleksiyonumuz.
                </p>
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-[1px] bg-neutral-900 mt-3" />
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900 mb-2">Kış Koleksiyonu</h3>
                      <p className="text-sm text-neutral-600 font-light">
                        Tarçınlı tahin helvası, zencefilli lokum, portakallı meyve kurusu
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-[1px] bg-neutral-900 mt-3" />
                    <div>
                      <h3 className="text-sm font-medium text-neutral-900 mb-2">Ramazan Özel</h3>
                      <p className="text-sm text-neutral-600 font-light">
                        Gül aromalı helva, safran lokumu, hurmalı tahin
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/products?collection=limited">
                  <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                    KOLEKSİYONU KEŞFET
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100">
                      <Image
                        src="/hero.jpg"
                        alt="Kış Koleksiyonu"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                        <p className="text-xs tracking-wider">KIŞ KOLEKSİYONU</p>
                      </div>
                    </div>
                    <div className="aspect-square relative overflow-hidden bg-neutral-100">
                      <Image
                        src="/mobile-hero.jpg"
                        alt="Özel Üretim"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-square relative overflow-hidden bg-neutral-100">
                      <Image
                        src="/hero.jpg"
                        alt="Ramazan Özel"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100">
                      <Image
                        src="/mobile-hero.jpg"
                        alt="Mevsimlik"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                        <p className="text-xs tracking-wider">RAMAZAN ÖZEL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Featured Bundle - Premium Offer */}
      <section className="py-16 md:py-32 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">ÖZEL TEKLİF</p>
              <h2 className="text-4xl font-extralight">Gurme Deneme Paketi</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-xl md:text-2xl font-extralight mb-4 md:mb-6">7 Farklı Lezzet Bir Arada</h3>
                <p className="text-neutral-300 font-light mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                  En sevilen ürünlerimizden oluşan özel deneme paketimizle tüm lezzetlerimizi keşfedin.
                </p>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
                  {[
                    "Tahin Helvası (250g)",
                    "Cevizli Helva (200g)",
                    "Susam Tahini (180g)",
                    "Gül Lokumu (150g)",
                    "Fıstıklı Helva (200g)",
                    "Kaymaklı Lokum (150g)",
                    "Yaz Helvası (200g)"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-white rounded-full" />
                      <p className="text-xs md:text-sm font-light">{item}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-baseline gap-4 md:gap-6 mb-6 md:mb-8">
                  <div>
                    <p className="text-xs md:text-sm text-neutral-400 line-through mb-1">449.90 TL</p>
                    <p className="text-2xl md:text-4xl font-extralight">349.90 TL</p>
                  </div>
                  <span className="text-[10px] md:text-xs tracking-wider text-green-400 border border-green-400 px-2 md:px-3 py-1">
                    %22 İNDİRİM
                  </span>
                </div>
                
                <Link href="/products/gurme-deneme-paketi">
                  <Button className="h-10 md:h-12 px-6 md:px-8 bg-white hover:bg-neutral-100 text-neutral-900 font-light tracking-wider text-sm md:text-base">
                    HEMEN SATIN AL
                  </Button>
                </Link>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="aspect-square relative overflow-hidden bg-neutral-800">
                  <Image
                    src="/hero.jpg"
                    alt="Gurme Deneme Paketi"
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white text-neutral-900 px-6 py-4">
                  <p className="text-xs tracking-wider mb-1">SINIRLI STOK</p>
                  <p className="text-2xl font-extralight">Son 24 Adet</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
  {/* Philosophy Section - Minimal */}
  <section className="py-16 md:py-32">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-8">FELSEFEMİZ</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-neutral-900 leading-tight mb-8 md:mb-12">
                "En iyi malzeme,
                <span className="block">en özenli el"</span>
              </h2>
              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-lg text-neutral-700 font-light leading-relaxed">
                  Üç nesildir aynı ilkeyle çalışıyoruz: En kaliteli hammaddeleri seçmek ve 
                  onları geleneksel yöntemlerle, modern hijyen standartlarında işlemek.
                </p>
                <p className="text-neutral-600 font-light leading-relaxed">
                  Her ürünümüzde dedemizin öğrettiği sabır ve özen var. Taş değirmenlerde 
                  öğüttüğümüz susamdan, el ile karıştırdığımız helvaya kadar her aşamada 
                  kaliteden ödün vermiyoruz.
                </p>
              </div>
              <div className="flex justify-center mt-12">
                <div className="w-24 h-[1px] bg-neutral-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


     
      {/* Process Excellence - Ultra Minimal */}
      <section className="py-20 md:py-40 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <p className="text-xs tracking-[0.4em] text-neutral-400 mb-8">ÜRETIM SÜRECİ</p>
                <h2 className="text-3xl md:text-5xl font-extralight mb-8 md:mb-12 leading-tight">
                  Mükemmellik
                  <span className="block text-xl md:text-3xl text-neutral-400 mt-2 md:mt-4">Her Aşamada</span>
                </h2>
                
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Seçim", desc: "En kaliteli susamlar özenle seçilir" },
                    { step: "02", title: "Öğütme", desc: "Taş değirmenlerde yavaşça öğütülür" },
                    { step: "03", title: "Karıştırma", desc: "Ustalar tarafından el ile karıştırılır" },
                    { step: "04", title: "Dinlendirme", desc: "Doğal ortamda dinlenmeye bırakılır" },
                    { step: "05", title: "Paketleme", desc: "Vakumlu ambalajda tazeliği korunur" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-6"
                    >
                      <span className="text-xs text-neutral-500">{item.step}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-sm tracking-wider">{item.title.toUpperCase()}</h3>
                          <div className="flex-1 h-px bg-neutral-800" />
                        </div>
                        <p className="text-sm text-neutral-400 font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src="/hero.jpg"
                    alt="Üretim Süreci"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/30" />
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-xs tracking-[0.3em] text-neutral-300 mb-3">KALİTE GARANTİSİ</p>
                  <p className="text-2xl font-extralight">ISO 22000</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

  


      {/* Sustainability - Premium Eco */}
      <section className="py-20 md:py-40 bg-neutral-50">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                      <Image
                        src="/hero.jpg"
                        alt="Sürdürülebilir Üretim"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-[3/4] bg-neutral-200 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-4xl font-extralight text-neutral-900">0</p>
                        <p className="text-xs tracking-wider text-neutral-600 mt-2">KARBON AYAK İZİ</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-[3/4] bg-neutral-200 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-4xl font-extralight text-neutral-900">%100</p>
                        <p className="text-xs tracking-wider text-neutral-600 mt-2">GERİ DÖNÜŞÜM</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                      <Image
                        src="/mobile-hero.jpg"
                        alt="Doğal Üretim"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <p className="text-xs tracking-[0.4em] text-neutral-400 mb-6">SÜRDÜRÜLEBİLİRLİK</p>
                <h2 className="text-4xl font-extralight text-neutral-900 mb-8">
                  Geleceğe Saygı
                  <span className="block text-2xl text-neutral-600 mt-2">Doğaya Özen</span>
                </h2>
                <p className="text-lg text-neutral-700 font-light mb-8 leading-relaxed">
                  Üretimde kullandığımız tüm malzemeleri sürdürülebilir kaynaklardan temin ediyoruz.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <p className="text-3xl font-extralight text-neutral-900 mb-2">%100</p>
                    <p className="text-xs tracking-wider text-neutral-600">DOĞAL İÇERİK</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extralight text-neutral-900 mb-2">0</p>
                    <p className="text-xs tracking-wider text-neutral-600">PLASTİK KULLANIMI</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extralight text-neutral-900 mb-2">%85</p>
                    <p className="text-xs tracking-wider text-neutral-600">ENERJİ TASARRUFU</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extralight text-neutral-900 mb-2">15</p>
                    <p className="text-xs tracking-wider text-neutral-600">YEREL TEDARİKÇİ</p>
                  </div>
                </div>
                
                <Link href="/sustainability">
                  <Button variant="outline" className="h-12 px-8 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                    DAHA FAZLA BİLGİ
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Reviews - Luxury Premium Concept */}
      <section className="py-24 md:py-48 lg:py-64 bg-gradient-to-b from-white via-neutral-50/30 to-white">
        <div className="container mx-auto px-6 md:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-7xl mx-auto"
          >
            {/* Luxury Header */}
            <div className="max-w-3xl mx-auto text-center mb-24 md:mb-40">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <p className="text-[10px] tracking-[0.6em] text-neutral-400 mb-12 uppercase font-extralight">TESTIMONIALS</p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-neutral-900 leading-[1.2]">
                  <span className="italic font-serif">Değerli</span> Yorumlar
                </h2>
              </motion.div>
            </div>

            {/* Luxury Reviews - Horizontal Layout */}
            <div className="space-y-20 md:space-y-32">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
                    {/* Review Number */}
                    <div className="hidden md:block md:col-span-1">
                      <span className="text-6xl font-extralight text-neutral-100">0{index + 1}</span>
                    </div>
                    
                    {/* Review Content */}
                    <div className="md:col-span-7 lg:col-span-8">
                      <blockquote className="relative">
                        <p className="text-lg md:text-2xl lg:text-3xl font-extralight leading-[1.6] text-neutral-700 italic">
                          "{review.comment}"
                        </p>
                      </blockquote>
                    </div>
                    
                    {/* Customer Info - Right Aligned */}
                    <div className="md:col-span-4 lg:col-span-3 md:text-right">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm md:text-base font-light text-neutral-900 tracking-[0.2em]">{review.name.toUpperCase()}</p>
                        <p className="text-[11px] md:text-xs text-neutral-400 font-extralight tracking-[0.3em] uppercase">{review.product}</p>
                        {/* Premium Star Rating */}
                        <div className="flex gap-1 mt-3 md:justify-end">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 fill-neutral-300" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Luxury Divider */}
                  {index < reviews.length - 1 && (
                    <div className="absolute -bottom-10 md:-bottom-16 left-0 right-0">
                      <div className="max-w-xl mx-auto h-[0.5px] bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Luxury Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mt-32 md:mt-48"
            >
              <div className="grid grid-cols-3 max-w-4xl mx-auto">
                <div className="text-center border-r border-neutral-200">
                  <p className="text-3xl md:text-5xl font-extralight text-neutral-900 mb-2">4.9</p>
                  <p className="text-[10px] md:text-xs text-neutral-400 font-extralight tracking-[0.3em] uppercase">Ortalama Puan</p>
                </div>
                <div className="text-center border-r border-neutral-200">
                  <p className="text-3xl md:text-5xl font-extralight text-neutral-900 mb-2">2.8K</p>
                  <p className="text-[10px] md:text-xs text-neutral-400 font-extralight tracking-[0.3em] uppercase">Değerlendirme</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-5xl font-extralight text-neutral-900 mb-2">98%</p>
                  <p className="text-[10px] md:text-xs text-neutral-400 font-extralight tracking-[0.3em] uppercase">Memnuniyet</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter - Ultra Premium Minimal */}
      <section className="py-32 md:py-48 bg-neutral-900 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 md:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Premium Content */}
            <div className="text-center">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] tracking-[0.5em] text-neutral-400 mb-12 uppercase font-light"
              >
                Ayrıcalıklı Üyelik
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.1] mb-8"
              >
                İlk Siz Haberdar Olun
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-neutral-400 font-light mb-16 max-w-2xl mx-auto leading-relaxed"
              >
                Özel koleksiyonlar, sınırlı üretimler ve size özel fırsatlar için bültenimize katılın.
              </motion.p>
              
              {/* Premium Form */}
              <motion.form 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="max-w-xl mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full h-16 md:h-20 px-8 md:px-10 bg-transparent border-b border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-all duration-700 text-base md:text-lg font-light tracking-wide group-hover:border-neutral-600"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-12 md:h-14 px-8 md:px-10 text-xs md:text-sm font-light tracking-[0.2em] text-white uppercase transition-all duration-700 hover:tracking-[0.3em] hover:text-neutral-200"
                  >
                    Abone Ol
                  </button>
                </div>
              </motion.form>
              
              {/* Privacy Note */}
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-xs text-neutral-500 mt-8 font-light"
              >
                Gizliliğinize saygı duyuyoruz. E-postanız asla paylaşılmaz.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Data
const featuredProducts = [
  {
    id: 1,
    name: "Geleneksel Tahin Helvası",
    slug: "geleneksel-tahin-helvasi",
    description: "500g vakumlu paket",
    price: "149.90",
    oldPrice: "179.90",
    image: "/hero.jpg",
    isNew: false
  },
  {
    id: 2,
    name: "Organik Susam Tahini",
    slug: "organik-susam-tahini",
    description: "350g cam kavanoz",
    price: "89.90",
    image: "/hero.jpg",
    isNew: true
  },
  {
    id: 3,
    name: "Antep Fıstıklı Helva",
    slug: "antep-fistikli-helva",
    description: "400g özel kutu",
    price: "189.90",
    oldPrice: "219.90",
    image: "/hero.jpg",
    isNew: false
  }
]

const categories = [
  { name: "Tahin Helvası", count: 12, href: "/products?category=helva" },
  { name: "Yaz Helvası", count: 8, href: "/products?category=yaz-helvasi" },
  { name: "Tahin", count: 6, href: "/products?category=tahin" },
  { name: "Lokum", count: 10, href: "/products?category=lokum" }
]

const reviews = [
  {
    name: "Ayşe Kaya",
    product: "Organik Susam Tahini",
    comment: "Yıllardır aradığım lezzet! Gerçekten taş değirmende öğütüldüğü her kaşıkta hissediliyor."
  },
  {
    name: "Mehmet Demir",
    product: "Antep Fıstıklı Helva",
    comment: "Annemin yaptığı helvayı aratmıyor. Fıstıklar çok taze ve bol."
  },
  {
    name: "Zeynep Öztürk",
    product: "Gül Lokumu",
    comment: "Bu kadar yumuşak ve aromalı lokum yemedim. Hediye paketi de çok şık."
  }
]