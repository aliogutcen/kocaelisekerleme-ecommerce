"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Luxury Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neutral-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-100/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/50 to-white" />
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl"
        >
          {/* Success Icon */}
          <motion.div 
            className="w-32 h-32 mx-auto mb-12 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-emerald-100/20 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-4 bg-white/80 backdrop-blur rounded-full shadow-2xl shadow-emerald-200/50 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 stroke-[1]" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-extralight text-neutral-900 mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Siparişiniz Alındı
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-sm mx-auto mb-8"
          >
            <div className="h-[0.5px] bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent" />
          </motion.div>
          
          <motion.p 
            className="text-neutral-600 font-extralight mb-4 text-lg leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Siparişiniz başarıyla oluşturuldu. En kısa sürede hazırlanıp kargoya verilecektir.
          </motion.p>
          
          <motion.p 
            className="text-neutral-500 font-extralight mb-12 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Sipariş detaylarınız e-posta adresinize gönderilmiştir.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-[12px] font-light tracking-[0.3em] uppercase transition-all duration-700 px-12 py-7 shadow-2xl shadow-neutral-900/20 hover:shadow-2xl hover:shadow-neutral-900/30 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Alışverişe Devam Et
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Button>
              </motion.div>
            </Link>
            
            <Link href="/orders">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 text-[12px] font-light tracking-[0.3em] uppercase transition-all duration-500 px-12 py-7"
                >
                  <Package className="w-4 h-4 mr-3" />
                  Siparişlerim
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Order Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20 inline-flex items-center gap-2 text-xs text-neutral-400 font-light"
          >
            <span>Sipariş No:</span>
            <span className="font-mono">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}