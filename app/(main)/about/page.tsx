"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, Users, Leaf, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hikayemiz.jpg"
            alt="Kocaeli Şekerleme Hakkında"
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
          <p className="text-xs tracking-[0.4em] mb-6 opacity-80">EST. 1948</p>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
            Hikayemiz
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
            Üç nesildir aynı tutkuyla, geleneksel lezzetleri modern standartlarda üretiyoruz
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">BAŞLANGIÇ</p>
                <h2 className="text-4xl font-extralight text-neutral-900 mb-8">
                  1948'de Başlayan
                  <span className="block text-2xl mt-2 text-neutral-600">Lezzet Yolculuğu</span>
                </h2>
                <div className="space-y-6 text-neutral-600 font-light leading-relaxed">
                  <p>
                    Kocaeli'nin tarihi sokaklarında, Öğütçen ailesi tarafından kurulan küçük bir 
                    imalathanede başlayan hikayemiz, bugün üç neslin birikimiyle devam ediyor. 
                    1948 yılında Hacı İbrahim Öğütçen'in attığı ilk adımlar, bugün binlerce 
                    sofrayı tatlandıran lezzetlere dönüştü.
                  </p>
                  <p>
                    Kocaeli'nin otantik tahin helvasını ilk üreten ustalardan olan Hacı İbrahim 
                    Öğütçen, susam tanesini özenle seçmekten, kavurma sıcaklığına kadar her detayı 
                    titizlikle belirlemiş ve bu geleneği oğullarına aktarmıştır. Öğütçen ailesinin 
                    bu mirası, bugün hala aynı özenle devam etmektedir.
                  </p>
                  <p>
                    Üçüncü nesil Öğütçen ustalar olarak, dedelerimizden aldığımız emaneti modern 
                    teknolojilerle harmanlıyoruz. Geleneksel taş değirmenlerimizde öğütülen susamlar, 
                    hijyenik tesislerimizde işlenerek sofralarınıza ulaşıyor. Her üründe Hacı İbrahim 
                    Usta'nın öğretileri ve Öğütçen ailesinin imzası bulunuyor.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src="/hero.jpg"
                    alt="Kocaeli Şekerleme Tarihi"
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

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">DEĞERLERİMİZ</p>
              <h2 className="text-4xl font-extralight text-neutral-900">İlkelerimiz</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Kalite",
                  description: "En kaliteli hammaddelerle, titiz üretim süreçleri"
                },
                {
                  icon: Users,
                  title: "Aile",
                  description: "Üç nesildir aynı özenle devam eden aile geleneği"
                },
                {
                  icon: Leaf,
                  title: "Doğallık",
                  description: "%100 doğal içerikler, katkısız lezzetler"
                },
                {
                  icon: Heart,
                  title: "Tutku",
                  description: "Her ürüne aynı sevgi ve özveriyle yaklaşım"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                    <value.icon className="w-8 h-8 text-neutral-400" strokeWidth={1} />
                  </div>
                  <h3 className="text-lg font-light text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-neutral-600 font-light">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-neutral-900 text-white p-12"
              >
                <p className="text-xs tracking-[0.3em] opacity-60 mb-6">MİSYONUMUZ</p>
                <h3 className="text-2xl font-extralight mb-6">Gelenekten Geleceğe</h3>
                <p className="font-light leading-relaxed opacity-90">
                  Geleneksel lezzetlerimizi, modern üretim teknikleriyle birleştirerek, 
                  sağlıklı ve kaliteli ürünlerle sofralarınıza değer katmak. Her ürünümüzde 
                  aynı özveri ve kaliteyi sunarak, müşterilerimizin güvenini kazanmaya devam etmek.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-neutral-50 p-12"
              >
                <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">VİZYONUMUZ</p>
                <h3 className="text-2xl font-extralight text-neutral-900 mb-6">Geleceğe Bakış</h3>
                <p className="font-light leading-relaxed text-neutral-700">
                  Türkiye'nin en güvenilir geleneksel gıda markası olarak, uluslararası 
                  standartlarda üretim yapan, çevreye duyarlı ve sürdürülebilir bir 
                  işletme olmak. Gelecek nesillere hem lezzetli hem de sağlıklı ürünler sunmak.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">ÜRETİM SÜRECİMİZ</p>
              <h2 className="text-4xl font-extralight text-neutral-900">Geleneksel Yöntemler</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Seçim",
                  description: "En kaliteli susamlar özenle seçilir ve temizlenir. Öğütçen ailesinin 77 yıllık tecrübesiyle sadece en iyi hammaddeler kullanılır."
                },
                {
                  number: "02",
                  title: "Kavurma",
                  description: "Geleneksel bakır kazanlarda, usta ellerde ideal sıcaklıkta kavrulur. Bu aşama, helvanın lezzetini belirleyen en kritik süreçtir."
                },
                {
                  number: "03",
                  title: "Öğütme",
                  description: "Taş değirmenlerde yavaş yavaş öğütülen susamlar, saf tahin haline gelir. Bu yöntem, besin değerlerini korur."
                },
                {
                  number: "04",
                  title: "Pişirme",
                  description: "Hacı İbrahim Usta'nın özel formülüyle, doğru kıvamda pişirilir. Her kazan, bir usta tarafından kontrol edilir."
                },
                {
                  number: "05",
                  title: "Dinlendirme",
                  description: "Özel dinlendirme odalarında bekletilir. Bu süreç, helvanın kendine özgü dokusunu kazanmasını sağlar."
                },
                {
                  number: "06",
                  title: "Paketleme",
                  description: "Hijyenik koşullarda, modern paketleme teknikleriyle hazırlanır ve sofralarınıza ulaştırılır."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-extralight text-neutral-300 mb-4">{step.number}</div>
                  <h3 className="text-lg font-light text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-extralight text-neutral-900 mb-6">
              77 Yıllık Tecrübemizle Sofralarınızdayız
            </h2>
            <p className="text-lg text-neutral-600 font-light mb-12">
              Geleneksel lezzetlerimizi keşfetmek için ürünlerimize göz atın
            </p>
            <Link href="/products">
              <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider">
                ÜRÜNLERİMİZİ KEŞFET
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}