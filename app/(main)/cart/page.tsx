"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw, Sparkles, Diamond, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, loading, error, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600 font-light">Sepetiniz yükleniyor...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-light text-neutral-900 mb-4">Bir Hata Oluştu</h2>
          <p className="text-neutral-600 mb-8">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            Yeniden Dene
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-100/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/50 to-white" />
        </div>
        
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-2xl"
          >
            <motion.div 
              className="w-40 h-40 mx-auto mb-16 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neutral-200/40 to-neutral-100/20 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-4 bg-white/80 backdrop-blur rounded-full shadow-2xl shadow-neutral-200/50" />
              <ShoppingBag className="absolute inset-8 w-auto h-auto text-neutral-400 stroke-[0.3]" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-extralight text-neutral-900 mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Sepetiniz Henüz Boş
            </motion.h1>
            
            <motion.p 
              className="text-neutral-500 font-extralight mb-20 text-xl leading-relaxed max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Özenle hazırlanmış, geleneksel lezzetlerimizi keşfetmeye davet ediyoruz
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-[12px] font-light tracking-[0.3em] uppercase transition-all duration-700 px-20 py-8 shadow-2xl shadow-neutral-900/20 hover:shadow-2xl hover:shadow-neutral-900/30 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Koleksiyonu Keşfet</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Ultra Premium Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/30 to-white" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neutral-100/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-neutral-100/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Luxury Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm" />
        <div className="container mx-auto px-6 py-16 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="h-[0.5px] bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[10px] text-neutral-500 font-light tracking-[0.5em] uppercase mb-8"
            >
              Özel Seçimleriniz
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-6xl md:text-7xl font-extralight text-neutral-900 mb-6 tracking-tight leading-none"
            >
              Alışveriş Sepeti
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="inline-flex items-center gap-6"
            >
              <Diamond className="w-4 h-4 text-neutral-400 stroke-[0.5]" />
              <p className="text-neutral-600 font-extralight text-lg tracking-wide">
                {items.length} Adet Seçkin Ürün
              </p>
              <Diamond className="w-4 h-4 text-neutral-400 stroke-[0.5]" />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-md mx-auto mt-8"
            >
              <div className="h-[0.5px] bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-20">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ 
                    delay: index * 0.08, 
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="group relative"
                >
                  <div className="py-12 first:pt-0">
                    <div className="flex gap-8">
                      {/* Premium Product Image */}
                      <motion.div 
                        className="relative w-40 h-40 bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden flex-shrink-0"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                      >
                        {item.product.images && item.product.images.length > 0 ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-10 h-10 text-neutral-300 stroke-[0.5]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>

                      {/* Premium Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h3 className="text-xl font-extralight text-neutral-900 mb-2 tracking-wide">
                              {item.product.name}
                            </h3>
                            <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-light">
                              Ürün Kodu: {item.product_id}
                            </p>
                          </div>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="text-neutral-300 hover:text-neutral-900 transition-all duration-500 p-2 -mr-2"
                            whileHover={{ rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-4 h-4 stroke-[1]" />
                          </motion.button>
                        </div>

                        <div className="flex items-end justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-all duration-300 border-r border-neutral-200"
                            >
                              <Minus className="h-3 w-3 stroke-[1.5]" />
                            </button>
                            <span className="px-8 text-sm font-light tracking-wide">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-all duration-300 border-l border-neutral-200"
                            >
                              <Plus className="h-3 w-3 stroke-[1.5]" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-[9px] tracking-[0.35em] text-neutral-400 uppercase mb-2 font-light">
                              Ara Toplam
                            </p>
                            <p className="text-2xl font-extralight text-neutral-900 tracking-wide">
                              {formatPrice(parseFloat(item.total))}
                              <span className="text-[11px] ml-2 font-light text-neutral-500">₺</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Elegant Separator */}
                    {index < items.length - 1 && (
                      <div className="mt-12 relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-neutral-100"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-gradient-to-b from-neutral-50 via-white to-neutral-50 px-4">
                            <Sparkles className="w-3 h-3 text-neutral-300" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Ultra Premium Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="relative">
              {/* Luxury Multi-layer Background */}
              <div className="absolute -inset-6 bg-gradient-to-br from-neutral-100/40 via-transparent to-neutral-100/20 blur-3xl" />
              <div className="absolute -inset-3 bg-gradient-to-tl from-neutral-50/50 via-transparent to-white/50 blur-2xl" />
              
              <div className="relative bg-white/95 backdrop-blur-xl border border-neutral-200/30 p-12 shadow-2xl shadow-neutral-300/30">
                {/* Premium Header */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neutral-50 to-white rounded-full shadow-inner mb-6"
                  >
                    <Diamond className="w-6 h-6 text-neutral-400 stroke-[0.5]" />
                  </motion.div>
                  
                  <h2 className="text-[11px] font-light tracking-[0.5em] text-neutral-600 uppercase">
                    Sipariş Özeti
                  </h2>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-extralight text-neutral-600 tracking-wide">Ürün Toplamı</span>
                      <span className="text-[15px] font-light text-neutral-900 tracking-wide tabular-nums">
                        ₺{formatPrice(getTotalPrice())}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-extralight text-neutral-500">({items.length} Ürün)</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-extralight text-neutral-600 tracking-wide">Teslimat</span>
                    <span className="text-[13px] font-extralight text-emerald-600">Ücretsiz</span>
                  </div>
                  
                  <div className="relative py-10">
                    <div className="absolute inset-x-0 top-0 h-[0.5px] bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[0.5px] bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent" />
                    
                    <div className="text-center">
                      <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
                        Genel Toplam
                      </p>
                      <p className="text-4xl font-extralight text-neutral-900 tracking-tight">
                        ₺{formatPrice(getTotalPrice())}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout" className="block w-full">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="relative overflow-hidden rounded-sm"
                    >
                      <Button 
                        size="lg"
                        className="w-full h-16 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-light tracking-[0.35em] uppercase transition-all duration-700 shadow-2xl shadow-neutral-900/30 hover:shadow-2xl hover:shadow-neutral-900/40 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Ödemeyi Tamamla</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </Button>
                    </motion.div>
                  </Link>

                  <Link href="/products" className="block w-full">
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                    >
                      <Button 
                        variant="ghost" 
                        size="lg"
                        className="w-full h-14 text-neutral-500 hover:text-neutral-900 text-[10px] font-light tracking-[0.3em] uppercase transition-all duration-500 relative group"
                      >
                        <span>Alışverişe Devam Et</span>
                        <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-neutral-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>

                {/* Premium Benefits */}
                <motion.div 
                  className="mt-12 pt-10 border-t border-neutral-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4 text-neutral-400 stroke-[1]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-neutral-700 tracking-wide mb-1">Ücretsiz Teslimat</p>
                        <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                          500₺ ve üzeri alışverişlerde hızlı kargo
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-neutral-400 stroke-[1]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-neutral-700 tracking-wide mb-1">Güvenli Ödeme</p>
                        <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                          256-bit SSL şifreleme ile korunma
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center flex-shrink-0">
                        <RotateCcw className="w-4 h-4 text-neutral-400 stroke-[1]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-neutral-700 tracking-wide mb-1">Kolay İade</p>
                        <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                          30 gün içinde ücretsiz iade imkanı
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}