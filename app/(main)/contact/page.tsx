"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    toast({
      title: "Mesajınız Alındı",
      description: "En kısa sürede size dönüş yapacağız.",
    })
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="İletişim"
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
          className="relative z-10 text-center text-white"
        >
          <p className="text-xs tracking-[0.4em] mb-4 opacity-80">İLETİŞİM</p>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight">
            Bize Ulaşın
          </h1>
        </motion.div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Phone,
                  title: "Telefon",
                  info: "+90 262 123 45 67",
                  subInfo: "Pazartesi - Cumartesi"
                },
                {
                  icon: Mail,
                  title: "E-posta",
                  info: "info@kocaelisekerleme.com",
                  subInfo: "7/24 destek"
                },
                {
                  icon: MapPin,
                  title: "Adres",
                  info: "Merkez Mah. Atatürk Cad.",
                  subInfo: "No: 123 İzmit/Kocaeli"
                },
                {
                  icon: Clock,
                  title: "Çalışma Saatleri",
                  info: "09:00 - 18:00",
                  subInfo: "Pazar hariç her gün"
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
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <item.icon className="w-6 h-6 text-neutral-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm tracking-wider text-neutral-900 mb-2">{item.title.toUpperCase()}</h3>
                  <p className="text-base font-light text-neutral-700 mb-1">{item.info}</p>
                  <p className="text-sm text-neutral-500">{item.subInfo}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-12">
                  <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">MESAJ GÖNDERIN</p>
                  <h2 className="text-3xl font-extralight text-neutral-900 mb-4">
                    Sizden Haber Almak İsteriz
                  </h2>
                  <p className="text-neutral-600 font-light">
                    Sorularınız, önerileriniz veya siparişleriniz için bize ulaşabilirsiniz.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Adınız Soyadınız"
                        required
                        className="w-full h-12 px-0 border-0 border-b border-neutral-300 focus:border-neutral-900 bg-transparent placeholder:text-neutral-400 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-posta Adresiniz"
                        required
                        className="w-full h-12 px-0 border-0 border-b border-neutral-300 focus:border-neutral-900 bg-transparent placeholder:text-neutral-400 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Telefon Numaranız"
                      className="w-full h-12 px-0 border-0 border-b border-neutral-300 focus:border-neutral-900 bg-transparent placeholder:text-neutral-400 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-0 border-0 border-b border-neutral-300 focus:border-neutral-900 bg-transparent text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Konu Seçiniz</option>
                      <option value="siparis">Sipariş</option>
                      <option value="bilgi">Bilgi Alma</option>
                      <option value="oneri">Öneri</option>
                      <option value="sikayet">Şikayet</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mesajınız"
                      required
                      rows={4}
                      className="w-full px-0 border-0 border-b border-neutral-300 focus:border-neutral-900 bg-transparent placeholder:text-neutral-400 text-sm focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-light tracking-wider"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    GÖNDER
                  </Button>
                </form>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/5] lg:aspect-square relative overflow-hidden bg-neutral-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48472.20216827661!2d29.91969!3d40.765661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4f66644b6c55%3A0x8c76c5b4b0e4d2!2sİzmit%2C%20Kocaeli!5e0!3m2!1str!2str!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale"
                  />
                </div>
                <div className="absolute bottom-8 left-8 right-8 bg-white p-6">
                  <h3 className="text-lg font-light text-neutral-900 mb-2">Mağazamız</h3>
                  <p className="text-sm text-neutral-600 font-light">
                    Merkez Mah. Atatürk Cad. No: 123<br />
                    İzmit/Kocaeli
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Hours */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-xs tracking-[0.3em] text-neutral-400 mb-6">ÇALIŞMA SAATLERİ</p>
            <h2 className="text-3xl font-extralight text-neutral-900 mb-12">Mağaza Saatleri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Pazartesi - Cuma</span>
                  <span className="text-sm font-light text-neutral-900">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Cumartesi</span>
                  <span className="text-sm font-light text-neutral-900">09:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                  <span className="text-sm text-neutral-600">Pazar</span>
                  <span className="text-sm font-light text-neutral-900">Kapalı</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-neutral-50 p-6">
                  <h3 className="text-sm font-medium text-neutral-900 mb-2">Özel Günler</h3>
                  <p className="text-sm text-neutral-600 font-light">
                    Resmi tatillerde mağazamız kapalıdır. Özel günlerde çalışma saatlerimiz 
                    değişebilir.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}