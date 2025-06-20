"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Download, FileText, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const pressReleases = [
  {
    id: 1,
    title: "Kocaeli Şekerleme, Sürdürülebilir Ambalaj Projesini Başlattı",
    date: "15 Haziran 2025",
    category: "Sürdürülebilirlik",
    excerpt: "77 yıllık köklü marka, 2025 sonuna kadar tüm ürünlerinde biyobozunur ambalaj kullanmayı hedefliyor."
  },
  {
    id: 2,
    title: "Uluslararası Lezzet Ödülü'nde Altın Madalya",
    date: "3 Haziran 2025",
    category: "Ödüller",
    excerpt: "Geleneksel Tahin Helvamız, Paris'te düzenlenen Uluslararası Lezzet Yarışması'nda altın madalya kazandı."
  },
  {
    id: 3,
    title: "Yeni Üretim Tesisi Yatırımı Açıklandı",
    date: "20 Mayıs 2025",
    category: "Yatırım",
    excerpt: "50 milyon TL'lik yatırımla kurulacak yeni tesis, 200 kişiye istihdam sağlayacak."
  },
  {
    id: 4,
    title: "E-Ticaret Platformu Yenilendi",
    date: "10 Mayıs 2025",
    category: "Dijital",
    excerpt: "Müşteri deneyimini ön planda tutan yeni e-ticaret sitemiz, modern altyapısıyla hizmete girdi."
  }
]

const mediaAssets = [
  {
    title: "Yüksek Çözünürlüklü Logo Paketi",
    format: "ZIP",
    size: "15 MB",
    description: "PNG, SVG, EPS formatlarında logo dosyaları"
  },
  {
    title: "Ürün Görselleri",
    format: "ZIP",
    size: "125 MB",
    description: "Tüm ürünlerimizin profesyonel fotoğrafları"
  },
  {
    title: "Kurumsal Tanıtım Videosu",
    format: "MP4",
    size: "250 MB",
    description: "3 dakikalık kurumsal tanıtım filmi"
  },
  {
    title: "Basın Kiti",
    format: "PDF",
    size: "8 MB",
    description: "Şirket bilgileri, tarihçe ve önemli veriler"
  }
]

export default function PressPage() {
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
            <p className="text-xs tracking-[0.4em] text-neutral-400 mb-4">BASIN</p>
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4">
              Basın Odası
            </h1>
            <p className="text-lg text-neutral-600 font-light">
              Basın bültenleri, görsel materyaller ve kurumsal bilgiler
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">HABERLER</p>
              <h2 className="text-3xl font-extralight text-neutral-900">Basın Bültenleri</h2>
            </motion.div>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-neutral-200 p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs tracking-wider text-neutral-500">{release.date}</span>
                        <span className="w-px h-4 bg-neutral-300" />
                        <span className="text-xs tracking-wider text-neutral-900">{release.category.toUpperCase()}</span>
                      </div>
                      <h3 className="text-xl font-light text-neutral-900 mb-3">{release.title}</h3>
                      <p className="text-sm text-neutral-600 font-light">{release.excerpt}</p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="h-10 px-4">
                        <FileText className="w-4 h-4 mr-2" />
                        Detaylar
                      </Button>
                      <Button variant="outline" size="sm" className="h-10 px-4">
                        <Download className="w-4 h-4 mr-2" />
                        PDF İndir
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button variant="outline" className="h-12 px-8 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                TÜM BASIN BÜLTENLERİ
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media Assets */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">MATERYALLER</p>
              <h2 className="text-3xl font-extralight text-neutral-900">Basın Görselleri ve Materyalleri</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaAssets.map((asset, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-light text-neutral-900">{asset.title}</h3>
                    <span className="text-xs tracking-wider text-neutral-500 bg-neutral-100 px-3 py-1">
                      {asset.format}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 font-light mb-4">{asset.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">{asset.size}</span>
                    <Button variant="outline" size="sm" className="h-9 px-4">
                      <Download className="w-4 h-4 mr-2" />
                      İndir
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">KURUMSAL</p>
                <h2 className="text-3xl font-extralight text-neutral-900 mb-8">
                  Marka Hikayemiz
                </h2>
                <div className="space-y-6 text-neutral-600 font-light">
                  <p>
                    1948 yılında Kocaeli'de küçük bir atölyede başlayan yolculuğumuz, bugün 
                    Türkiye'nin en köklü geleneksel gıda markalarından biri haline geldi.
                  </p>
                  <p>
                    Üç nesildir aynı özen ve kalite anlayışıyla üretim yapan firmamız, 
                    geleneksel lezzetleri modern standartlarda üreterek, hem yurt içinde 
                    hem de yurt dışında binlerce aileye ulaşıyor.
                  </p>
                  <p>
                    Sürdürülebilir üretim, yerel ekonomiye katkı ve doğal içerikler 
                    konusundaki kararlılığımızla, sadece bir gıda üreticisi değil, 
                    aynı zamanda sosyal sorumluluk sahibi bir marka olarak faaliyet gösteriyoruz.
                  </p>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button variant="outline" className="h-10 px-6">
                    <Download className="w-4 h-4 mr-2" />
                    Kurumsal Broşür
                  </Button>
                  <Button variant="outline" className="h-10 px-6">
                    <FileText className="w-4 h-4 mr-2" />
                    Bilgi Notu
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/hero.jpg"
                    alt="Kocaeli Şekerleme Fabrikası"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-neutral-900 text-white p-8 max-w-xs">
                  <p className="text-4xl font-extralight mb-2">77</p>
                  <p className="text-sm tracking-wider">YILLIK TECRÜBE</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-[0.3em] opacity-60 mb-4">RAKAMLARLA</p>
              <h2 className="text-3xl font-extralight">Kocaeli Şekerleme</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "1948", label: "Kuruluş Yılı" },
                { number: "500+", label: "Çalışan" },
                { number: "50+", label: "Ürün Çeşidi" },
                { number: "15", label: "İhracat Yapılan Ülke" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-4xl font-extralight mb-3">{stat.number}</p>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-12 text-center"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">İLETİŞİM</p>
              <h2 className="text-3xl font-extralight text-neutral-900 mb-8">
                Basın İletişimi
              </h2>
              <p className="text-lg text-neutral-600 font-light mb-12 max-w-2xl mx-auto">
                Basın mensuplarının sorularını yanıtlamak ve ihtiyaç duyulan tüm materyalleri 
                sağlamak için buradayız.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <User className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-1">Basın Sözcüsü</h3>
                  <p className="text-sm text-neutral-600 font-light">Ayşe Yılmaz</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <Mail className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-1">E-posta</h3>
                  <p className="text-sm text-neutral-600 font-light">press@kocaelisekerleme.com</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <Phone className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-1">Telefon</h3>
                  <p className="text-sm text-neutral-600 font-light">+90 262 123 45 99</p>
                </div>
              </div>

              <Link href="/contact" className="inline-block mt-12">
                <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                  İLETİŞİM FORMU
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}