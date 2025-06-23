"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Diamond, 
  Lock, 
  CreditCard, 
  Truck,
  ChevronLeft,
  Shield,
  Package,
  Clock
} from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Lütfen satış sözleşmesini kabul edin.");
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    router.push("/order-success");
  };

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
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
            <Link href="/cart" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-colors mb-8">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-light">Sepete Dön</span>
            </Link>
            
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
              Güvenli Ödeme
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-6xl md:text-7xl font-extralight text-neutral-900 mb-6 tracking-tight leading-none"
            >
              Ödeme
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="inline-flex items-center gap-6"
            >
              <Lock className="w-4 h-4 text-neutral-400 stroke-[0.5]" />
              <p className="text-neutral-600 font-extralight text-sm md:text-lg tracking-wide">
                256-bit SSL Şifreleme
              </p>
              <Lock className="w-4 h-4 text-neutral-400 stroke-[0.5]" />
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

      {/* Checkout Form */}
      <div className="container mx-auto px-6 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-20">
            {/* Customer & Shipping Information */}
            <div className="lg:col-span-2 space-y-12">
              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-[11px] font-light tracking-[0.5em] text-neutral-600 uppercase mb-8">
                  Müşteri Bilgileri
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-light text-neutral-600 tracking-wide">
                      Ad
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                      placeholder="Adınız"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-light text-neutral-600 tracking-wide">
                      Soyad
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                      placeholder="Soyadınız"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-light text-neutral-600 tracking-wide">
                      E-posta
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-light text-neutral-600 tracking-wide">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <h2 className="text-[11px] font-light tracking-[0.5em] text-neutral-600 uppercase mb-8">
                  Teslimat Adresi
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs font-light text-neutral-600 tracking-wide">
                      Adres
                    </Label>
                    <Input
                      id="address"
                      required
                      className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                      placeholder="Mahalle, Sokak, No"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-xs font-light text-neutral-600 tracking-wide">
                        Şehir
                      </Label>
                      <Input
                        id="city"
                        required
                        className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                        placeholder="İstanbul"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-xs font-light text-neutral-600 tracking-wide">
                        İlçe
                      </Label>
                      <Input
                        id="district"
                        required
                        className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                        placeholder="Kadıköy"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-xs font-light text-neutral-600 tracking-wide">
                        Posta Kodu
                      </Label>
                      <Input
                        id="zipCode"
                        required
                        className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                        placeholder="34700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-[11px] font-light tracking-[0.5em] text-neutral-600 uppercase mb-8">
                  Ödeme Yöntemi
                </h2>
                
                <RadioGroup defaultValue="card" className="space-y-4">
                  <div className="flex items-center space-x-3 p-6 bg-white/50 border border-neutral-200 hover:border-neutral-300 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-neutral-800">Kredi/Banka Kartı</p>
                          <p className="text-xs text-neutral-500 font-light mt-1">Güvenli 3D ödeme</p>
                        </div>
                        <CreditCard className="w-5 h-5 text-neutral-400" />
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-6 bg-white/50 border border-neutral-200 hover:border-neutral-300 transition-colors">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-neutral-800">Havale/EFT</p>
                          <p className="text-xs text-neutral-500 font-light mt-1">Banka havalesi ile ödeme</p>
                        </div>
                        <Package className="w-5 h-5 text-neutral-400" />
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                <div className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-xs font-light text-neutral-600 tracking-wide">
                      Kart Numarası
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-xs font-light text-neutral-600 tracking-wide">
                        Son Kullanma Tarihi
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="AA/YY"
                        className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvc" className="text-xs font-light text-neutral-600 tracking-wide">
                        CVC
                      </Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        className="h-12 bg-white/50 border-neutral-200 focus:border-neutral-400 font-light"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Terms & Conditions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-start space-x-3"
              >
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-xs text-neutral-600 font-light leading-relaxed cursor-pointer">
                  <Link href="/terms" className="underline hover:text-neutral-800">Satış sözleşmesi</Link> ve{" "}
                  <Link href="/privacy" className="underline hover:text-neutral-800">gizlilik politikasını</Link>{" "}
                  okudum ve kabul ediyorum.
                </Label>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                      <ShoppingBag className="w-6 h-6 text-neutral-400 stroke-[0.5]" />
                    </motion.div>
                    
                    <h2 className="text-[11px] font-light tracking-[0.5em] text-neutral-600 uppercase">
                      Sipariş Özeti
                    </h2>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-6 mb-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="relative w-16 h-16 bg-neutral-50 overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-6 h-6 text-neutral-300 stroke-[0.5]" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-light text-neutral-800 mb-1">{item.name}</p>
                          <p className="text-xs text-neutral-500 font-extralight">Adet: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-light text-neutral-900 tabular-nums">
                          ₺{formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 mb-12">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-extralight text-neutral-600 tracking-wide">Ürün Toplamı</span>
                        <span className="text-[15px] font-light text-neutral-900 tracking-wide tabular-nums">
                          ₺{formatPrice(getTotalPrice())}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-extralight text-neutral-600 tracking-wide">Kargo</span>
                        <span className="text-[13px] font-extralight text-emerald-600">Ücretsiz</span>
                      </div>
                    </div>
                    
                    <div className="relative py-10">
                      <div className="absolute inset-x-0 top-0 h-[0.5px] bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-[0.5px] bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent" />
                      
                      <div className="text-center">
                        <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
                          Toplam Tutar
                        </p>
                        <p className="text-4xl font-extralight text-neutral-900 tracking-tight">
                          ₺{formatPrice(getTotalPrice())}
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isProcessing || !acceptTerms}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full h-16 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-[11px] font-light tracking-[0.35em] uppercase transition-all duration-700 shadow-2xl shadow-neutral-900/30 hover:shadow-2xl hover:shadow-neutral-900/40 relative overflow-hidden group disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {isProcessing ? (
                        <span className="flex items-center justify-center gap-3">
                          <Clock className="w-4 h-4 animate-spin" />
                          İşleniyor...
                        </span>
                      ) : (
                        "Siparişi Tamamla"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </motion.button>

                  {/* Security Badge */}
                  <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-light">
                    <Shield className="w-4 h-4 stroke-[1]" />
                    <span>Güvenli 256-bit SSL Şifreleme</span>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-10 pt-8 border-t border-neutral-100/50 space-y-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-neutral-400 stroke-[1]" />
                      <div>
                        <p className="text-[11px] font-medium text-neutral-700">Hızlı Teslimat</p>
                        <p className="text-[10px] text-neutral-500 font-light">1-3 iş günü içinde</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}