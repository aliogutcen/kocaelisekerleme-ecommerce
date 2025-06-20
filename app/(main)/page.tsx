"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Shield, Package, Award } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Minimal */}
      <section className="relative h-[90vh] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide === 0 ? "/hero.jpg" : currentSlide === 1 ? "/mobile-hero.jpg" : "/hero.jpg"}
              alt="Kocaeli Şekerleme"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/60" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] text-neutral-600 mb-6">KOCAELI ŞEKERLEME • EST. 1948</p>
              <h1 className="text-6xl lg:text-8xl font-extralight text-neutral-900 leading-[0.9] mb-8">
                Geleneksel
                <span className="block font-light">Lezzetler</span>
              </h1>
              <p className="text-lg text-neutral-700 font-light mb-12 max-w-md">
                77 yıldır aynı özenle ürettiğimiz tahini ve helvalarımızla sofralarınıza değer katıyoruz.
              </p>
              
              <div className="flex gap-4">
                <Link href="/products">
                  <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                    KOLEKSİYONU KEŞFET
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="h-12 px-8 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                    HİKAYEMİZ
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-300 ${
                currentSlide === index ? "w-12 bg-neutral-900" : "w-4 bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products - Minimal Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">ÖNE ÇIKANLAR</p>
            <h2 className="text-4xl font-extralight text-neutral-900">En Sevilenler</h2>
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
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">MİRASIMIZ</p>
              <h2 className="text-4xl font-extralight text-neutral-900 mb-8">
                1948'den Bugüne
                <span className="block text-2xl mt-2 text-neutral-600">Aynı Tutku, Aynı Özen</span>
              </h2>
              <p className="text-lg text-neutral-700 font-light mb-6 leading-relaxed">
                Kocaeli'nin kalbinde başlayan hikayemiz, üç nesildir aynı tutkuyla devam ediyor.
              </p>
              <p className="text-neutral-600 font-light mb-12 leading-relaxed">
                Dedelerimizden öğrendiğimiz geleneksel yöntemlerle, en kaliteli hammaddeleri 
                kullanarak üretim yapıyoruz. Her ürünümüz, taş değirmenlerde özenle öğütülmüş 
                susamlardan, el emeğiyle hazırlanmış helvalara kadar, bir ustalık hikayesi taşır.
              </p>
              
              <div className="grid grid-cols-3 gap-8 mb-12">
                <div>
                  <p className="text-3xl font-extralight text-neutral-900">77</p>
                  <p className="text-xs tracking-wider text-neutral-600">YIL</p>
                </div>
                <div>
                  <p className="text-3xl font-extralight text-neutral-900">3</p>
                  <p className="text-xs tracking-wider text-neutral-600">NESİL</p>
                </div>
                <div>
                  <p className="text-3xl font-extralight text-neutral-900">%100</p>
                  <p className="text-xs tracking-wider text-neutral-600">DOĞAL</p>
                </div>
              </div>

              <Link href="/about">
                <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                  HİKAYEMİZİ OKUYUN
                </Button>
              </Link>
            </div>
            
            <div className="relative h-[600px]">
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
      <section className="py-32">
        <div className="container mx-auto px-4">
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

      {/* Reviews - Ultra Premium */}
      <section className="py-40 bg-gradient-to-b from-white via-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-20">
              <p className="text-xs tracking-[0.4em] text-neutral-400 mb-6">DEĞERLI YORUMLAR</p>
              <h2 className="text-5xl lg:text-6xl font-extralight text-neutral-900 leading-tight">
                Müşterilerimizin
                <span className="block text-3xl text-neutral-600 mt-2">Gözünden</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative"
                >
                  {/* Background accent */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-neutral-100/50 rounded-full blur-2xl" />
                  
                  <div className="relative bg-white p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-500">
                    {/* Quote mark */}
                    <div className="absolute -top-6 left-10 text-8xl text-neutral-100 font-serif leading-none">"</div>
                    
                    {/* Stars with custom styling */}
                    <div className="flex gap-2 mb-8 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-neutral-900 text-neutral-900" strokeWidth={0} />
                      ))}
                    </div>
                    
                    {/* Review text */}
                    <p className="text-neutral-700 font-light leading-relaxed mb-10 relative z-10 text-lg">
                      {review.comment}
                    </p>
                    
                    {/* Divider */}
                    <div className="w-12 h-px bg-neutral-200 mb-8" />
                    
                    {/* Customer info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900 tracking-wide">{review.name}</p>
                        <p className="text-xs text-neutral-500 mt-1">{review.product}</p>
                      </div>
                      <div className="text-xs text-neutral-400">
                        <span className="tracking-wider">VERİFİED</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-20 text-center"
            >
              <div className="inline-flex items-center gap-8 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="font-light">4.9</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-neutral-400 text-neutral-400" strokeWidth={0} />
                    ))}
                  </div>
                </div>
                <div className="w-px h-4 bg-neutral-300" />
                <span className="font-light">2,847 Değerlendirme</span>
                <div className="w-px h-4 bg-neutral-300" />
                <span className="font-light">%98 Memnuniyet</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

     

      {/* Trust Badges - Premium Minimal */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-4">
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

      {/* Philosophy Section - Minimal */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-8">FELSEFEMİZ</p>
              <h2 className="text-5xl lg:text-6xl font-extralight text-neutral-900 leading-tight mb-12">
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

      {/* Featured Bundle - Premium Offer */}
      <section className="py-32 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
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
                <h3 className="text-2xl font-extralight mb-6">7 Farklı Lezzet Bir Arada</h3>
                <p className="text-neutral-300 font-light mb-8 leading-relaxed">
                  En sevilen ürünlerimizden oluşan özel deneme paketimizle tüm lezzetlerimizi keşfedin.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-12">
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
                      <p className="text-sm font-light">{item}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-baseline gap-6 mb-8">
                  <div>
                    <p className="text-sm text-neutral-400 line-through mb-1">449.90 TL</p>
                    <p className="text-4xl font-extralight">349.90 TL</p>
                  </div>
                  <span className="text-xs tracking-wider text-green-400 border border-green-400 px-3 py-1">
                    %22 İNDİRİM
                  </span>
                </div>
                
                <Link href="/products/gurme-deneme-paketi">
                  <Button className="h-12 px-8 bg-white hover:bg-neutral-100 text-neutral-900 font-light tracking-wider">
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

      {/* Master Craftsmen - Ultra Premium */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-20">
              <p className="text-xs tracking-[0.4em] text-neutral-400 mb-6">USTALARIMIZ</p>
              <h2 className="text-5xl lg:text-6xl font-extralight text-neutral-900">
                Ellerin Sanatı
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  name: "Mehmet Usta",
                  title: "Baş Helvacı",
                  experience: "42 Yıl",
                  specialty: "Tahin Helvası",
                  quote: "Her helva bir hikaye, her karıştırma bir dua."
                },
                {
                  name: "Ali Usta",
                  title: "Tahin Uzmanı",
                  experience: "38 Yıl",
                  specialty: "Taş Değirmen",
                  quote: "Susamın ruhunu ancak taş değirmen anlar."
                },
                {
                  name: "Ayşe Usta",
                  title: "Lokum Ustası",
                  experience: "35 Yıl",
                  specialty: "El Yapımı Lokum",
                  quote: "Şeker ve sabır, lezzetin iki yarısıdır."
                }
              ].map((master, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-neutral-200 rounded-full" />
                    <div className="absolute inset-2 bg-white rounded-full" />
                    <div className="absolute inset-4 bg-neutral-100 rounded-full overflow-hidden">
                      <Image
                        src="/hero.jpg"
                        alt={master.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-light text-neutral-900 mb-1">{master.name}</h3>
                  <p className="text-xs tracking-wider text-neutral-500 mb-3">{master.title.toUpperCase()}</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-neutral-400 mb-6">
                    <span>{master.experience}</span>
                    <span className="w-px h-3 bg-neutral-300" />
                    <span>{master.specialty}</span>
                  </div>
                  <p className="text-sm text-neutral-600 font-light italic max-w-xs mx-auto">
                    "{master.quote}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Excellence - Ultra Minimal */}
      <section className="py-40 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
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
                <h2 className="text-5xl font-extralight mb-12 leading-tight">
                  Mükemmellik
                  <span className="block text-3xl text-neutral-400 mt-4">Her Aşamada</span>
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

      {/* Heritage Timeline - Desktop Only */}
      <section className="hidden md:block py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-xs tracking-[0.4em] text-neutral-400 mb-6">TARİHİMİZ</p>
              <h2 className="text-5xl font-extralight text-neutral-900">77 Yıllık Yolculuk</h2>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-1/2 h-px bg-neutral-200" />
              
              {/* Timeline Items */}
              <div className="grid grid-cols-5 relative">
                {[
                  { year: "1948", event: "Kuruluş", detail: "İlk dükkân Kocaeli'de açıldı" },
                  { year: "1965", event: "Büyüme", detail: "İlk fabrika kuruldu" },
                  { year: "1987", event: "Yenilik", detail: "Modern üretim teknikleri" },
                  { year: "2010", event: "Kalite", detail: "ISO sertifikaları alındı" },
                  { year: "2025", event: "Dijital", detail: "Online satış başladı" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-neutral-900 rounded-full" />
                    <div className={`${index % 2 === 0 ? 'pb-24' : 'pt-24'}`}>
                      <p className="text-3xl font-extralight text-neutral-900 mb-2">{item.year}</p>
                      <p className="text-sm font-medium text-neutral-900 mb-1">{item.event}</p>
                      <p className="text-xs text-neutral-500">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Sustainability - Premium Eco */}
      <section className="py-40 bg-neutral-50">
        <div className="container mx-auto px-4">
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

 {/* Newsletter - Minimal */}
 <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">BÜLTEN</p>
            <h2 className="text-4xl font-extralight text-neutral-900 mb-8">
              Yeniliklerden Haberdar Olun
            </h2>
            <p className="text-lg text-neutral-600 font-light mb-12">
              Özel koleksiyonlar ve yeni ürünlerden ilk siz haberdar olun.
            </p>
            
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 h-12 px-6 border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors"
              />
              <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                ABONE OL
              </Button>
            </form>
          </div>
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