"use client"

import { motion } from "framer-motion"
import { Truck, Package, Clock, MapPin, Shield, Phone, Mail, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ShippingPage() {
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
            <p className="text-xs tracking-[0.4em] text-neutral-400 mb-4">KARGO</p>
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4">
              Kargo ve Teslimat
            </h1>
            <p className="text-lg text-neutral-600 font-light">
              Siparişlerinizi özenle paketliyor, hızlı ve güvenli şekilde teslim ediyoruz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: Truck,
                  title: "Hızlı Teslimat",
                  description: "Siparişleriniz 1-3 iş günü içinde kapınızda"
                },
                {
                  icon: Shield,
                  title: "Güvenli Paketleme",
                  description: "Özel ambalajlarla ürünlerinizi koruyoruz"
                },
                {
                  icon: Package,
                  title: "Kargo Takibi",
                  description: "SMS ve e-posta ile kargo takip bilgileri"
                },
                {
                  icon: Clock,
                  title: "Aynı Gün Kargo",
                  description: "Saat 14:00'a kadar verilen siparişler aynı gün kargoda"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                    <feature.icon className="w-8 h-8 text-neutral-400" strokeWidth={1} />
                  </div>
                  <h3 className="text-lg font-light text-neutral-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-neutral-600 font-light">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Rates */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">KARGO ÜCRETLERİ</p>
              <h2 className="text-3xl font-extralight text-neutral-900">Teslimat Koşulları</h2>
            </motion.div>

            <div className="bg-white p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Standard Shipping */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="border border-neutral-200 p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-neutral-900 text-white text-xs px-4 py-2">
                    STANDART
                  </div>
                  <h3 className="text-2xl font-extralight text-neutral-900 mb-4">
                    150 TL Altı Siparişler
                  </h3>
                  <div className="space-y-4 text-neutral-600 font-light">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">29,90 TL</p>
                        <p className="text-sm">Sabit kargo ücreti</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">1-3 İş Günü</p>
                        <p className="text-sm">Teslimat süresi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">Tüm Türkiye</p>
                        <p className="text-sm">Teslimat kapsamı</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Free Shipping */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="border-2 border-neutral-900 p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-neutral-900 text-white text-xs px-4 py-2">
                    ÜCRETSİZ
                  </div>
                  <h3 className="text-2xl font-extralight text-neutral-900 mb-4">
                    150 TL ve Üzeri Siparişler
                  </h3>
                  <div className="space-y-4 text-neutral-600 font-light">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-neutral-900 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">ÜCRETSİZ</p>
                        <p className="text-sm">Kargo bedeli alınmaz</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-neutral-900 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">1-3 İş Günü</p>
                        <p className="text-sm">Teslimat süresi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-neutral-900 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">Tüm Türkiye</p>
                        <p className="text-sm">Teslimat kapsamı</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Special Offer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 bg-neutral-900 text-white p-8 text-center"
              >
                <p className="text-xs tracking-[0.3em] opacity-60 mb-3">ÖZEL TEKLİF</p>
                <h4 className="text-2xl font-extralight mb-2">İlk Siparişinizde Ücretsiz Kargo!</h4>
                <p className="text-sm opacity-80 max-w-md mx-auto">
                  Yeni üyelerimize özel, ilk alışverişinizde kargo bedeli bizden.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">SÜREÇ</p>
              <h2 className="text-3xl font-extralight text-neutral-900">Sipariş Teslimat Süreci</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Sipariş Onayı",
                  description: "Siparişiniz alındıktan sonra onay e-postası gönderilir"
                },
                {
                  step: "02",
                  title: "Hazırlık",
                  description: "Ürünleriniz özenle paketlenir ve kargoya hazırlanır"
                },
                {
                  step: "03",
                  title: "Kargo Teslimi",
                  description: "Paketiniz anlaşmalı kargo firmamıza teslim edilir"
                },
                {
                  step: "04",
                  title: "Teslimat",
                  description: "Kargo takip numarası ile siparişinizi takip edebilirsiniz"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-extralight text-neutral-200 mb-4">{item.step}</div>
                  <h3 className="text-lg font-light text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-neutral-600 font-light">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Regions */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">TESLİMAT BÖLGELERİ</p>
                <h2 className="text-3xl font-extralight text-neutral-900 mb-8">
                  Türkiye'nin Her Yerine
                  <span className="block text-xl text-neutral-600 mt-2">Güvenli Teslimat</span>
                </h2>
                <div className="space-y-6 text-neutral-600 font-light">
                  <p>
                    81 il ve tüm ilçelere kesintisiz teslimat yapıyoruz. Anlaşmalı kargo 
                    firmalarımız ile siparişlerinizi en hızlı ve güvenli şekilde adresinize 
                    ulaştırıyoruz.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">Büyükşehirler</p>
                        <p className="text-sm">1-2 iş günü teslimat</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">İl ve İlçe Merkezleri</p>
                        <p className="text-sm">2-3 iş günü teslimat</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900">Köy ve Mahalleler</p>
                        <p className="text-sm">3-5 iş günü teslimat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8">
                  <h3 className="text-xl font-light text-neutral-900 mb-6">Anlaşmalı Kargo Firmalarımız</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="font-light text-neutral-700">Yurtiçi Kargo</span>
                      <span className="text-sm text-neutral-500">Tüm Türkiye</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="font-light text-neutral-700">MNG Kargo</span>
                      <span className="text-sm text-neutral-500">Tüm Türkiye</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="font-light text-neutral-700">Aras Kargo</span>
                      <span className="text-sm text-neutral-500">Tüm Türkiye</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="font-light text-neutral-700">PTT Kargo</span>
                      <span className="text-sm text-neutral-500">Köy Teslimatları</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">ÖNEMLİ BİLGİLER</p>
              <h2 className="text-3xl font-extralight text-neutral-900">Kargo ile İlgili Bilinmesi Gerekenler</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-8 md:p-12"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Sipariş Hazırlama Süresi</h3>
                  <p className="text-neutral-600 font-light">
                    Siparişleriniz, ödeme onayından sonra 1 iş günü içerisinde kargoya teslim edilir. 
                    Hafta sonu verilen siparişler pazartesi günü işleme alınır.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Teslimat Adresi</h3>
                  <p className="text-neutral-600 font-light">
                    Teslimat adresinizi eksiksiz ve doğru girdiğinizden emin olun. Yanlış adres 
                    bilgisi nedeniyle oluşacak gecikmelerden firmamız sorumlu değildir.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Hasarlı Ürünler</h3>
                  <p className="text-neutral-600 font-light">
                    Kargo teslimi sırasında paketinizde hasar tespit ederseniz, tutanak tutturarak 
                    ürünü teslim almayın. Durumu 24 saat içinde bize bildirin.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Kargo Takibi</h3>
                  <p className="text-neutral-600 font-light">
                    Siparişiniz kargoya verildiğinde, SMS ve e-posta ile kargo takip numaranız 
                    tarafınıza iletilir. Bu numara ile kargonuzun durumunu takip edebilirsiniz.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-extralight mb-6">
              Kargo ile İlgili Sorularınız mı Var?
            </h2>
            <p className="text-lg font-light opacity-80 mb-12">
              Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 opacity-60" />
                <div className="text-left">
                  <p className="text-sm opacity-60">Telefon</p>
                  <p className="font-light">+90 262 123 45 67</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 opacity-60" />
                <div className="text-left">
                  <p className="text-sm opacity-60">E-posta</p>
                  <p className="font-light">destek@kocaelisekerleme.com</p>
                </div>
              </div>
            </div>

            <Link href="/contact">
              <Button className="h-12 px-8 bg-white hover:bg-neutral-100 text-neutral-900 font-light tracking-wider">
                İLETİŞİM FORMU
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}