"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Leaf, Recycle, Droplets, Sun, Wind, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Sürdürülebilirlik"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          <p className="text-xs tracking-[0.4em] mb-6 opacity-80">SÜRDÜRÜLEBİLİRLİK</p>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
            Geleceğe Saygı
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
            Doğaya özen göstererek, gelecek nesillere daha yaşanabilir bir dünya bırakmak için çalışıyoruz
          </p>
        </motion.div>
      </section>

      {/* Our Commitment */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-8">TAAHHÜDÜMÜZ</p>
              <h2 className="text-4xl lg:text-5xl font-extralight text-neutral-900 leading-tight mb-12">
                "Sürdürülebilirlik bizim için
                <span className="block">bir tercih değil, sorumluluk"</span>
              </h2>
              <p className="text-lg text-neutral-700 font-light max-w-3xl mx-auto leading-relaxed">
                1948'den bu yana doğal ve saf ürünler üretme geleneğimizi, modern sürdürülebilirlik 
                anlayışıyla birleştiriyoruz. Her aşamada çevreye duyarlı üretim yaparak, karbon ayak 
                izimizi minimize ediyoruz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">GİRİŞİMLERİMİZ</p>
              <h2 className="text-4xl font-extralight text-neutral-900">Sürdürülebilir Uygulamalar</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  icon: Leaf,
                  title: "Doğal Üretim",
                  description: "%100 doğal içerikler kullanarak, katkı maddesi içermeyen ürünler üretiyoruz"
                },
                {
                  icon: Recycle,
                  title: "Sıfır Atık",
                  description: "Üretim sürecinde oluşan tüm organik atıkları kompost olarak değerlendiriyoruz"
                },
                {
                  icon: Droplets,
                  title: "Su Yönetimi",
                  description: "Kapalı devre su sistemleriyle su tüketimimizi %60 azalttık"
                },
                {
                  icon: Sun,
                  title: "Yenilenebilir Enerji",
                  description: "Fabrikamızın çatısında kurulu güneş panelleriyle enerjimizin %40'ını üretiyoruz"
                },
                {
                  icon: Wind,
                  title: "Karbon Nötr",
                  description: "2030 yılına kadar tamamen karbon nötr üretim hedefimize doğru ilerliyoruz"
                },
                {
                  icon: TreePine,
                  title: "Ağaçlandırma",
                  description: "Her yıl 10.000 fidan dikerek ormanlarımızın geleceğine katkıda bulunuyoruz"
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
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6">
                    <item.icon className="w-10 h-10 text-neutral-300" strokeWidth={1} />
                  </div>
                  <h3 className="text-lg font-light text-neutral-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">SAYILARLA</p>
              <h2 className="text-4xl font-extralight text-neutral-900">Çevresel Etkimiz</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "%100", label: "Geri Dönüştürülebilir Ambalaj" },
                { number: "%60", label: "Daha Az Su Tüketimi" },
                { number: "%40", label: "Yenilenebilir Enerji" },
                { number: "0", label: "Plastik Kullanımı" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-5xl font-extralight text-neutral-900 mb-3">{stat.number}</p>
                  <p className="text-sm text-neutral-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Packaging */}
      <section className="py-32 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">YENİLİK</p>
                <h2 className="text-4xl font-extralight mb-8">
                  Sürdürülebilir Ambalaj
                  <span className="block text-2xl text-neutral-400 mt-2">Doğada Çözünür Malzemeler</span>
                </h2>
                <p className="text-lg text-neutral-300 font-light mb-8 leading-relaxed">
                  Tüm ürünlerimizde kullandığımız ambalajlar, doğada 6 ay içinde tamamen çözünebilen 
                  bitkisel kaynaklı malzemelerden üretiliyor.
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-[1px] bg-white mt-3" />
                    <div>
                      <p className="font-light">Mısır nişastası bazlı vakum ambalajlar</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-[1px] bg-white mt-3" />
                    <div>
                      <p className="font-light">Geri dönüştürülmüş kağıt etiketler</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-[1px] bg-white mt-3" />
                    <div>
                      <p className="font-light">Bitkisel mürekkep baskılar</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/hero.jpg"
                    alt="Sürdürülebilir Ambalaj"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white text-neutral-900 p-8 max-w-xs">
                  <p className="text-xs tracking-wider mb-2">2025 HEDEFİ</p>
                  <p className="text-2xl font-extralight">%100 Biyobozunur</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Sourcing */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-8">YEREL ÜRETİM</p>
              <h2 className="text-4xl font-extralight text-neutral-900 mb-12">
                Yerel Üreticilerle Çalışıyoruz
              </h2>
              <p className="text-lg text-neutral-700 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
                Hammaddelerimizin %85'ini 100 km yarıçapındaki yerel üreticilerden temin ederek, 
                hem bölge ekonomisine katkıda bulunuyor hem de karbon ayak izimizi azaltıyoruz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-4xl font-extralight text-neutral-900 mb-3">15</p>
                  <p className="text-sm text-neutral-600">Yerel Çiftçi Ortağımız</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extralight text-neutral-900 mb-3">300</p>
                  <p className="text-sm text-neutral-600">Desteklenen Aile</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-extralight text-neutral-900 mb-3">1200</p>
                  <p className="text-sm text-neutral-600">Hektar Organik Tarım Alanı</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-extralight text-neutral-900 mb-6">
              Sürdürülebilir Geleceğe Birlikte Yürüyelim
            </h2>
            <p className="text-lg text-neutral-600 font-light mb-12">
              Daha fazla bilgi almak ve sürdürülebilirlik raporumuzu incelemek için bizimle iletişime geçin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                  İLETİŞİME GEÇ
                </Button>
              </Link>
              <Button variant="outline" className="h-12 px-8 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                RAPORU İNDİR
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}