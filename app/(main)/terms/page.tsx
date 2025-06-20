"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
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
            <p className="text-xs tracking-[0.4em] text-neutral-400 mb-4">YASAL</p>
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4">
              Kullanım Koşulları
            </h1>
            <p className="text-sm text-neutral-500">Son güncelleme: 20 Haziran 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto prose prose-neutral prose-lg font-light"
          >
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">1. Genel Koşullar</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Bu web sitesini (www.kocaelisekerleme.com) kullanarak, aşağıdaki kullanım 
                  koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen 
                  sitemizi kullanmayınız. Kocaeli Şekerleme, bu koşulları önceden haber vermeksizin 
                  değiştirme hakkını saklı tutar.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">2. Site Kullanımı</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Web sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Yanlış veya yanıltıcı bilgi vermemek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Başkalarının haklarını ihlal etmemek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Yasalara aykırı faaliyetlerde bulunmamak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Site güvenliğini tehdit edecek eylemlerden kaçınmak</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">3. Ürün Bilgileri ve Fiyatlar</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Web sitemizde yer alan ürün bilgileri ve fiyatları güncel tutmak için azami 
                  özen göstermekteyiz. Ancak, teknik hatalar veya güncellemeler nedeniyle 
                  oluşabilecek farklılıklardan sorumlu tutulamayız. Fiyatlarımız KDV dahil 
                  olarak gösterilmektedir ve önceden haber verilmeksizin değiştirilebilir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">4. Sipariş ve Teslimat</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Siparişleriniz aşağıdaki koşullara tabidir:
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Siparişler stok durumuna göre karşılanır</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Teslimat süreleri tahminidir ve garanti edilmez</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>200 TL üzeri siparişlerde kargo ücretsizdir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Hasarlı ürünler 7 gün içinde değiştirilir</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">5. İade ve Değişim</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Mesafeli satış sözleşmesi kapsamında, ürünlerimizi teslim aldığınız tarihten 
                  itibaren 14 gün içinde iade edebilirsiniz. İade edilecek ürünlerin kullanılmamış, 
                  orijinal ambalajında ve faturası ile birlikte gönderilmesi gerekmektedir. Gıda 
                  güvenliği nedeniyle açılmış ürünler iade alınmamaktadır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">6. Fikri Mülkiyet Hakları</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Bu web sitesinde yer alan tüm içerik (metin, görsel, logo, tasarım vb.) 
                  Kocaeli Şekerleme'nin mülkiyetindedir veya lisanslı kullanımındadır. İzinsiz 
                  kopyalanması, çoğaltılması veya dağıtılması yasaktır ve yasal işlem başlatılmasına 
                  neden olabilir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">7. Gizlilik</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Kişisel verilerinizin korunması bizim için önemlidir. Verilerinizin nasıl 
                  toplandığı, kullanıldığı ve korunduğu hakkında detaylı bilgi için lütfen 
                  Gizlilik Politikamızı inceleyiniz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">8. Sorumluluk Sınırlaması</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Kocaeli Şekerleme, web sitesinin kullanımından doğabilecek doğrudan veya dolaylı 
                  zararlardan sorumlu tutulamaz. Site içeriğinin doğruluğu, güvenilirliği veya 
                  güncelliği konusunda garanti vermemekteyiz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">9. Uygulanacak Hukuk</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Bu kullanım koşulları Türkiye Cumhuriyeti kanunlarına tabidir. Herhangi bir 
                  uyuşmazlık durumunda Kocaeli mahkemeleri ve icra daireleri yetkilidir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">10. İletişim</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="mt-6 p-6 bg-neutral-50">
                  <p className="text-sm text-neutral-700">
                    <strong className="font-medium">Kocaeli Şekerleme</strong><br />
                    E-posta: info@kocaelisekerleme.com<br />
                    Telefon: +90 262 123 45 67<br />
                    Adres: Merkez Mah. Atatürk Cad. No: 123 İzmit/Kocaeli
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