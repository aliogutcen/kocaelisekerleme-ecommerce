"use client"

import { motion } from "framer-motion"
import { Package, RotateCcw, Clock, Shield, CheckCircle2, X, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReturnsPage() {
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
            <p className="text-xs tracking-[0.4em] text-neutral-400 mb-4">İADE VE DEĞİŞİM</p>
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4">
              Kolay İade Süreci
            </h1>
            <p className="text-lg text-neutral-600 font-light">
              Müşteri memnuniyetiniz bizim için önceliklidir. 14 gün içinde kolay iade imkanı sunuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: Clock,
                  title: "14 Gün İade Hakkı",
                  description: "Teslim tarihinden itibaren 14 gün içinde iade edebilirsiniz"
                },
                {
                  icon: RotateCcw,
                  title: "Kolay İade",
                  description: "Online başvuru ile hızlı ve kolay iade süreci"
                },
                {
                  icon: Shield,
                  title: "Güvenli İşlem",
                  description: "İade tutarınız 7 iş günü içinde hesabınıza yansır"
                },
                {
                  icon: Package,
                  title: "Ücretsiz İade",
                  description: "İade kargo ücreti tarafımızdan karşılanır"
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

      {/* Return Process */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">İADE SÜRECİ</p>
              <h2 className="text-3xl font-extralight text-neutral-900">Nasıl İade Edebilirim?</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Başvuru",
                  description: "Hesabınızdan veya müşteri hizmetleri üzerinden iade başvurusu yapın"
                },
                {
                  step: "02",
                  title: "Onay",
                  description: "İade talebiniz incelenir ve onaylanır, iade kodu gönderilir"
                },
                {
                  step: "03",
                  title: "Kargo",
                  description: "Ürünü orijinal ambalajında, iade kodu ile kargoya verin"
                },
                {
                  step: "04",
                  title: "İade",
                  description: "Ürün kontrolünden sonra iadesi 7 iş günü içinde tamamlanır"
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

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/account/orders">
                <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                  İADE BAŞVURUSU YAP
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4 text-center">KOŞULLAR</p>
              <h2 className="text-3xl font-extralight text-neutral-900 text-center">İade Koşulları</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Acceptable Returns */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-green-50 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-light text-neutral-900">İade Edilebilir Ürünler</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Orijinal ambalajında, açılmamış ürünler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Faturası ve tüm aksesuarları ile birlikte
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      14 gün içinde başvurusu yapılmış ürünler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Hasarlı veya eksik gönderilen ürünler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Yanlış gönderilen siparişler
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Non-returnable Items */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-red-50 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-light text-neutral-900">İade Edilemez Ürünler</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Açılmış gıda ürünleri (hijyen nedeniyle)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Özel üretim veya kişiye özel ürünler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Kampanyalı ürünlerin bir kısmı
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Son kullanma tarihi yakın ürünler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 font-light">
                      Kullanılmış veya hasarlı ürünler
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <AlertCircle className="w-6 h-6 text-neutral-400" />
                <h3 className="text-2xl font-extralight text-neutral-900">Önemli Bilgiler</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-3">İade Süresi</h4>
                  <p className="text-neutral-600 font-light">
                    Mesafeli Satış Sözleşmesi kapsamında, ürünü teslim aldığınız tarihten itibaren 
                    14 gün içinde iade hakkınız bulunmaktadır. Bu süre içinde iade başvurusunda 
                    bulunmanız gerekmektedir.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-3">İade Kargo Ücreti</h4>
                  <p className="text-neutral-600 font-light">
                    Ürün hatası, eksik ürün veya yanlış ürün gönderimi durumlarında iade kargo 
                    ücreti firmamız tarafından karşılanır. Cayma hakkı kullanımında ise kargo 
                    ücreti müşteriye aittir.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-3">Para İadesi</h4>
                  <p className="text-neutral-600 font-light">
                    İade edilen ürünler tarafımıza ulaştıktan ve kontrol edildikten sonra, ödeme 
                    tutarınız aynı ödeme yöntemi ile 7 iş günü içinde iade edilir. Banka işlem 
                    süreleri bu süreye dahil değildir.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-3">Değişim İşlemleri</h4>
                  <p className="text-neutral-600 font-light">
                    Ürün değişimi için önce mevcut ürünün iadesi yapılır, ardından yeni sipariş 
                    oluşturulur. Stok durumuna göre aynı ürünün farklı bedeni veya rengi talep 
                    edilebilir.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Return Form Download */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-6" />
            <h2 className="text-3xl font-extralight text-neutral-900 mb-4">
              İade Formu
            </h2>
            <p className="text-lg text-neutral-600 font-light mb-8">
              İade işlemlerinizde kullanabileceğiniz formu indirebilir veya online başvuru yapabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                <FileText className="w-4 h-4 mr-2" />
                İADE FORMU İNDİR
              </Button>
              <Link href="/account/orders">
                <Button variant="outline" className="h-12 px-8 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                  ONLİNE BAŞVURU
                </Button>
              </Link>
            </div>
          </motion.div>
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
              Yardıma mı İhtiyacınız Var?
            </h2>
            <p className="text-lg font-light opacity-80 mb-8">
              İade ve değişim işlemleriniz için müşteri hizmetlerimizden destek alabilirsiniz.
            </p>
            <Link href="/contact">
              <Button className="h-12 px-8 bg-white hover:bg-neutral-100 text-neutral-900 font-light tracking-wider">
                İLETİŞİME GEÇ
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}