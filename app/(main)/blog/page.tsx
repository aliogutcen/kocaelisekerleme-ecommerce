"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Tahin Helvasının Tarihçesi: Osmanlı'dan Günümüze",
    slug: "tahin-helvasinin-tarihcesi",
    excerpt: "Yüzyıllardır sofralarımızın vazgeçilmezi olan tahin helvasının kökleri, Osmanlı saray mutfağına kadar uzanıyor. Bu lezzetin serüvenini keşfedin.",
    category: "Tarih",
    image: "/hero.jpg",
    author: "Ayşe Kocaeli",
    date: "15 Haziran 2025",
    readTime: "5 dk okuma"
  },
  {
    id: 2,
    title: "Evde Tahin Yapımı: Püf Noktaları",
    slug: "evde-tahin-yapimi",
    excerpt: "Taş değirmende öğütülen susamların sırrı nedir? Evde mükemmel tahin yapmanın inceliklerini ustalarımızdan öğrenin.",
    category: "Tarifler",
    image: "/hero.jpg",
    author: "Mehmet Usta",
    date: "10 Haziran 2025",
    readTime: "8 dk okuma"
  },
  {
    id: 3,
    title: "Sürdürülebilir Üretim: Doğaya Saygı",
    slug: "surdurulebilir-uretim",
    excerpt: "Kocaeli Şekerleme olarak sürdürülebilir üretim yöntemlerimizle hem lezzeti hem de doğayı koruyoruz. İşte detaylar...",
    category: "Sürdürülebilirlik",
    image: "/hero.jpg",
    author: "Ali Kocaeli",
    date: "5 Haziran 2025",
    readTime: "6 dk okuma"
  },
  {
    id: 4,
    title: "Ramazan Sofralarının Tatlı Geleneği",
    slug: "ramazan-sofralari",
    excerpt: "İftar sofralarının olmazsa olmazı helva, sadece bir tatlı değil, aynı zamanda bir gelenek. Ramazan'da helvanın özel yeri...",
    category: "Gelenek",
    image: "/hero.jpg",
    author: "Zeynep Demir",
    date: "1 Haziran 2025",
    readTime: "4 dk okuma"
  },
  {
    id: 5,
    title: "Tahinin Sağlığa Faydaları",
    slug: "tahinin-sagliga-faydalari",
    excerpt: "Protein, kalsiyum ve demir deposu tahin, sağlıklı beslenmenin vazgeçilmezi. Uzmanlar tahinin faydalarını anlatıyor.",
    category: "Sağlık",
    image: "/hero.jpg",
    author: "Dr. Fatma Yılmaz",
    date: "25 Mayıs 2025",
    readTime: "7 dk okuma"
  },
  {
    id: 6,
    title: "Lokum Sanatı: Ustadan Çırağa",
    slug: "lokum-sanati",
    excerpt: "El yapımı lokumun incelikleri nelerdir? 40 yıllık lokum ustamız, bu geleneksel sanatın sırlarını paylaşıyor.",
    category: "Ustalık",
    image: "/hero.jpg",
    author: "Hasan Usta",
    date: "20 Mayıs 2025",
    readTime: "6 dk okuma"
  }
]

const categories = [
  { name: "Tümü", count: blogPosts.length },
  { name: "Tarifler", count: 2 },
  { name: "Tarih", count: 1 },
  { name: "Sürdürülebilirlik", count: 1 },
  { name: "Gelenek", count: 1 },
  { name: "Sağlık", count: 1 }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-xs tracking-[0.4em] opacity-60 mb-4">BLOG</p>
            <h1 className="text-4xl md:text-5xl font-extralight mb-6">
              Lezzet Hikayeleri
            </h1>
            <p className="text-lg font-light opacity-80 max-w-2xl mx-auto">
              Geleneksel tarifler, üretim süreçleri ve lezzet kültürümüz hakkında yazılar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 border border-neutral-200 focus:border-neutral-900 transition-colors bg-transparent placeholder:text-neutral-400 text-sm tracking-wide focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 text-sm transition-all duration-300 ${
                      selectedCategory === category.name
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Featured Post */}
            {filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-20"
              >
                <Link href={`/blog/${filteredPosts[0].slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100">
                      <Image
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-white px-4 py-2 text-xs tracking-wider">
                          ÖNE ÇIKAN
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">
                        {filteredPosts[0].category.toUpperCase()}
                      </p>
                      <h2 className="text-3xl font-extralight text-neutral-900 mb-6 group-hover:text-neutral-600 transition-colors">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-lg text-neutral-600 font-light mb-8 leading-relaxed">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{filteredPosts[0].date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{filteredPosts[0].readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Other Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100 mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-neutral-900 mb-3 group-hover:text-neutral-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-600 font-light mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-neutral-500 mb-4">Aramanızla eşleşen blog yazısı bulunamadı.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("Tümü")
                    setSearchQuery("")
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-extralight text-neutral-900 mb-4">
              Yeni Yazılardan Haberdar Olun
            </h2>
            <p className="text-lg text-neutral-600 font-light mb-8">
              Lezzet hikayelerimizi ve yeni tariflerimizi kaçırmayın
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}