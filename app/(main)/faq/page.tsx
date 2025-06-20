"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search, Package, Truck, CreditCard, RotateCcw, User, Shield, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const faqCategories = [
  {
    id: "orders",
    name: "Sipariş ve Teslimat",
    icon: Package,
    questions: [
      {
        question: "Siparişimi nasıl takip edebilirim?",
        answer: "Siparişiniz kargoya verildiğinde, e-posta ve SMS ile kargo takip numaranız tarafınıza iletilir. Bu numara ile kargo firmasının web sitesinden veya bizim 'Kargo Takip' sayfamızdan siparişinizi takip edebilirsiniz. Ayrıca hesabınıza giriş yaparak 'Siparişlerim' bölümünden de takip edebilirsiniz."
      },
      {
        question: "Teslimat süresi ne kadardır?",
        answer: "Teslimat süresi bulunduğunuz bölgeye göre değişmektedir. Büyükşehirler için 1-2 iş günü, il ve ilçe merkezleri için 2-3 iş günü, köy ve mahalleler için 3-5 iş günü içinde teslimat yapılmaktadır. Saat 14:00'a kadar verilen siparişler aynı gün kargoya verilir."
      },
      {
        question: "Kargo ücreti ne kadar?",
        answer: "150 TL ve üzeri siparişlerinizde kargo ücretsizdir. 150 TL altındaki siparişler için sabit 29,90 TL kargo ücreti uygulanmaktadır. İlk siparişinizde kargo ücreti bizden!"
      },
      {
        question: "Siparişimi iptal edebilir miyim?",
        answer: "Siparişiniz kargoya verilmeden önce iptal edebilirsiniz. Bunun için müşteri hizmetlerimizle iletişime geçmeniz yeterlidir. Kargoya verilen siparişler için iade prosedürü uygulanır."
      }
    ]
  },
  {
    id: "payment",
    name: "Ödeme",
    icon: CreditCard,
    questions: [
      {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer: "Kredi kartı, banka kartı ve havale/EFT ile ödeme kabul ediyoruz. Tüm kredi kartlarına 6 aya kadar taksit imkanı sunuyoruz. Güvenliğiniz için 3D Secure ödeme sistemi kullanıyoruz."
      },
      {
        question: "Güvenli ödeme yapabilir miyim?",
        answer: "Evet, tüm ödemeleriniz SSL sertifikası ve 3D Secure sistemi ile korunmaktadır. Kart bilgileriniz hiçbir şekilde sistemimizde saklanmaz. İyzico altyapısı ile güvenli ödeme garantisi sunuyoruz."
      },
      {
        question: "Havale ile ödeme yapabilir miyim?",
        answer: "Evet, havale/EFT ile ödeme yapabilirsiniz. Sipariş sonrasında banka hesap bilgilerimiz e-posta ile gönderilir. Ödemeniz onaylandıktan sonra siparişiniz kargoya verilir."
      },
      {
        question: "Taksit seçenekleri nelerdir?",
        answer: "Tüm kredi kartlarına 2, 3, 4, 5 ve 6 taksit seçenekleri sunuyoruz. Taksit tablomuzu ödeme sayfasında görebilirsiniz. Bazı özel kampanyalarda 9 ve 12 taksit imkanı da sunulmaktadır."
      }
    ]
  },
  {
    id: "returns",
    name: "İade ve Değişim",
    icon: RotateCcw,
    questions: [
      {
        question: "İade süresi ne kadardır?",
        answer: "Mesafeli Satış Sözleşmesi kapsamında, ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade hakkınız bulunmaktadır. İade için ürünün kullanılmamış ve orijinal ambalajında olması gerekmektedir."
      },
      {
        question: "Açılmış ürünleri iade edebilir miyim?",
        answer: "Gıda güvenliği nedeniyle açılmış ürünler iade alınmamaktadır. Ancak ürün hatası, eksik ürün veya yanlış ürün gönderimi durumlarında açılmış ürünler de iade edilebilir."
      },
      {
        question: "İade kargo ücreti kim tarafından ödenir?",
        answer: "Ürün hatası, eksik ürün veya yanlış ürün gönderimi durumlarında iade kargo ücreti firmamız tarafından karşılanır. Cayma hakkı kullanımında ise kargo ücreti müşteriye aittir."
      },
      {
        question: "Para iadesi ne zaman yapılır?",
        answer: "İade edilen ürünler tarafımıza ulaştıktan ve kontrol edildikten sonra, ödeme tutarınız aynı ödeme yöntemi ile 7 iş günü içinde iade edilir. Banka işlem süreleri bu süreye dahil değildir."
      }
    ]
  },
  {
    id: "products",
    name: "Ürünler",
    icon: Package,
    questions: [
      {
        question: "Ürünleriniz doğal mı?",
        answer: "%100 doğal ve katkı maddesiz ürünler üretiyoruz. Tüm ürünlerimizde geleneksel yöntemler ve doğal hammaddeler kullanılır. Koruyucu, renklendirici veya yapay tatlandırıcı içermez."
      },
      {
        question: "Ürünlerin raf ömrü ne kadar?",
        answer: "Tahin ve tahin helvası için 12 ay, pekmez için 24 ay, lokum için 6 ay raf ömrü bulunmaktadır. Ürünlerimiz vakumlu ambalajlarda tazeliği korunarak gönderilir."
      },
      {
        question: "Allerjen bilgisi nerede bulabilirim?",
        answer: "Tüm ürünlerimizin allerjen bilgileri ürün sayfalarında ve ambalaj üzerinde belirtilmektedir. Susam, fındık, fıstık gibi allerjenler içeren ürünlerimiz açıkça işaretlenmiştir."
      },
      {
        question: "Özel üretim yapıyor musunuz?",
        answer: "Evet, kurumsal müşterilerimiz için özel üretim ve ambalajlama hizmeti sunuyoruz. Detaylı bilgi için kurumsal satış ekibimizle iletişime geçebilirsiniz."
      }
    ]
  },
  {
    id: "account",
    name: "Hesap ve Üyelik",
    icon: User,
    questions: [
      {
        question: "Üye olmadan alışveriş yapabilir miyim?",
        answer: "Evet, üye olmadan misafir olarak alışveriş yapabilirsiniz. Ancak üye olursanız sipariş takibi, hızlı ödeme, favori ürünler ve özel kampanyalardan yararlanma gibi avantajlara sahip olursunuz."
      },
      {
        question: "Şifremi unuttum, ne yapmalıyım?",
        answer: "Giriş sayfasındaki 'Şifremi Unuttum' linkine tıklayarak e-posta adresinizi girin. Size şifre sıfırlama bağlantısı göndereceğiz. Link 24 saat geçerlidir."
      },
      {
        question: "Adres bilgilerimi nasıl güncelleyebilirim?",
        answer: "Hesabınıza giriş yaptıktan sonra 'Hesabım' sayfasından 'Adreslerim' bölümüne giderek mevcut adreslerinizi düzenleyebilir veya yeni adres ekleyebilirsiniz."
      },
      {
        question: "E-posta bildirimlerini nasıl yönetebilirim?",
        answer: "Hesap ayarlarınızdan e-posta tercihlerinizi yönetebilirsiniz. Kampanya, yeni ürün ve sipariş bildirimleri için tercihleri ayrı ayrı ayarlayabilirsiniz."
      }
    ]
  },
  {
    id: "security",
    name: "Güvenlik ve Gizlilik",
    icon: Shield,
    questions: [
      {
        question: "Kişisel bilgilerim güvende mi?",
        answer: "Evet, tüm kişisel bilgileriniz SSL sertifikası ile şifrelenerek saklanır. KVKK kapsamında verileriniz korunur ve izniniz olmadan üçüncü taraflarla paylaşılmaz."
      },
      {
        question: "Kart bilgilerim saklanıyor mu?",
        answer: "Hayır, kart bilgileriniz hiçbir şekilde sistemimizde saklanmaz. Tüm ödeme işlemleri PCI-DSS sertifikalı İyzico altyapısı üzerinden güvenli şekilde gerçekleştirilir."
      },
      {
        question: "KVKK haklarım nelerdir?",
        answer: "Kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltme, silme, işlenmesine itiraz etme haklarına sahipsiniz. Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz."
      },
      {
        question: "Çerezleri nasıl yönetebilirim?",
        answer: "Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz. Ancak bazı çerezler site işlevselliği için gereklidir. Detaylar için Çerez Politikamızı inceleyebilirsiniz."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])

  const toggleQuestion = (question: string) => {
    setExpandedQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    )
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    !selectedCategory || category.id === selectedCategory || category.questions.length > 0
  )

  const totalFilteredQuestions = filteredCategories.reduce(
    (sum, cat) => sum + cat.questions.length, 
    0
  )

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
            <p className="text-xs tracking-[0.4em] text-neutral-400 mb-4">YARDIM MERKEZİ</p>
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4">
              Sıkça Sorulan Sorular
            </h1>
            <p className="text-lg text-neutral-600 font-light mb-12">
              Size nasıl yardımcı olabiliriz? Aradığınız cevapları burada bulabilirsiniz.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Soru veya konu arayın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-4 border border-neutral-300 rounded-full focus:border-neutral-900 transition-colors bg-white placeholder:text-neutral-400 text-sm focus:outline-none"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              {searchQuery && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                  {totalFilteredQuestions} sonuç bulundu
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-light transition-all",
                !selectedCategory
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              )}
            >
              Tümü
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-light transition-all flex items-center gap-2",
                  selectedCategory === category.id
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className={cn(
                  "mb-12",
                  category.questions.length === 0 && "hidden"
                )}
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="w-6 h-6 text-neutral-400" />
                  <h2 className="text-2xl font-extralight text-neutral-900">{category.name}</h2>
                  <span className="text-sm text-neutral-500">({category.questions.length})</span>
                </div>

                <div className="space-y-4">
                  {category.questions.map((qa, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-neutral-50 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(`${category.id}-${index}`)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-100 transition-colors"
                      >
                        <span className="font-light text-neutral-900 pr-4">{qa.question}</span>
                        <ChevronDown 
                          className={cn(
                            "w-5 h-5 text-neutral-400 transition-transform flex-shrink-0",
                            expandedQuestions.includes(`${category.id}-${index}`) && "rotate-180"
                          )}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedQuestions.includes(`${category.id}-${index}`) && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-sm text-neutral-600 font-light leading-relaxed">
                              {qa.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {totalFilteredQuestions === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-neutral-500 mb-4">Aramanızla eşleşen soru bulunamadı.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-extralight mb-6">
              Hala Yardıma mı İhtiyacınız Var?
            </h2>
            <p className="text-lg font-light opacity-80 mb-12 max-w-2xl mx-auto">
              Aradığınız cevabı bulamadıysanız, müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                  <Phone className="w-6 h-6 opacity-60" />
                </div>
                <p className="text-sm opacity-60 mb-2">Telefon</p>
                <p className="font-light">+90 262 123 45 67</p>
                <p className="text-xs opacity-60 mt-1">Hafta içi 09:00 - 18:00</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                  <Mail className="w-6 h-6 opacity-60" />
                </div>
                <p className="text-sm opacity-60 mb-2">E-posta</p>
                <p className="font-light">destek@kocaelisekerleme.com</p>
                <p className="text-xs opacity-60 mt-1">24 saat içinde yanıt</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                  <Package className="w-6 h-6 opacity-60" />
                </div>
                <p className="text-sm opacity-60 mb-2">Kargo Takip</p>
                <Link href="/track-order" className="font-light hover:underline">
                  Siparişimi Takip Et
                </Link>
                <p className="text-xs opacity-60 mt-1">Anlık kargo durumu</p>
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