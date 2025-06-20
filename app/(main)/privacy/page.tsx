"use client"

import { motion } from "framer-motion"

export default function PrivacyPage() {
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
              Gizlilik Politikası
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
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">1. Giriş</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Kocaeli Şekerleme olarak, müşterilerimizin gizliliğini korumayı taahhüt ediyoruz. 
                  Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını 
                  ve korunduğunu açıklamaktadır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">2. Toplanan Bilgiler</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Web sitemizi ziyaret ettiğinizde veya bizimle iletişime geçtiğinizde aşağıdaki 
                  bilgileri toplayabiliriz:
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Ad, soyad ve iletişim bilgileri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>E-posta adresi ve telefon numarası</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Teslimat ve fatura adresi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Sipariş geçmişi ve tercihler</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">3. Bilgilerin Kullanımı</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Siparişlerinizi işlemek ve teslimatını sağlamak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Müşteri hizmetleri desteği sağlamak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Ürün ve hizmetlerimizi geliştirmek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Yasal yükümlülüklerimizi yerine getirmek</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">4. Bilgi Güvenliği</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik 
                  önlemleri kullanıyoruz. Verileriniz şifreli bağlantılar üzerinden iletilir ve 
                  güvenli sunucularda saklanır. Yetkisiz erişime karşı koruma sağlamak için 
                  düzenli güvenlik denetimleri yapılmaktadır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">5. Çerezler</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. 
                  Çerezler, tarayıcınız tarafından bilgisayarınızda saklanan küçük metin dosyalarıdır. 
                  Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda 
                  web sitemizin bazı özelliklerini kullanamayabilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">6. Üçüncü Taraflarla Paylaşım</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Kişisel verilerinizi, açık izniniz olmadan üçüncü taraflarla paylaşmayız. 
                  Ancak, yasal zorunluluklar veya hizmet sağlayıcılarımızla (örneğin, kargo 
                  şirketleri) sipariş teslimatı için gerekli bilgileri paylaşabiliriz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">7. Haklarınız</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Kişisel verilerinizin düzeltilmesini veya silinmesini isteme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Kişisel verilerinizin işlenmesine itiraz etme</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">8. İletişim</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Gizlilik politikamız hakkında sorularınız varsa veya haklarınızı kullanmak 
                  istiyorsanız, lütfen bizimle iletişime geçin:
                </p>
                <div className="mt-6 p-6 bg-neutral-50">
                  <p className="text-sm text-neutral-700">
                    <strong className="font-medium">Kocaeli Şekerleme</strong><br />
                    E-posta: privacy@kocaelisekerleme.com<br />
                    Telefon: +90 262 123 45 67<br />
                    Adres: Merkez Mah. Atatürk Cad. No: 123 İzmit/Kocaeli
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">9. Değişiklikler</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler web 
                  sitemizde yayınlandığı anda yürürlüğe girer. Son güncelleme tarihini sayfanın 
                  üst kısmında bulabilirsiniz.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}