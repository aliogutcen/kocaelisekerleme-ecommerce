"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookiesPage() {
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
              Çerez Politikası
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
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">1. Çerez Nedir?</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Çerezler, web sitelerini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza 
                  kaydedilen küçük metin dosyalarıdır. Çerezler, web sitelerinin daha verimli çalışmasını 
                  sağlar ve kullanıcı deneyimini iyileştirmek için kullanılır.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">2. Çerezleri Nasıl Kullanıyoruz?</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Kocaeli Şekerleme olarak, web sitemizde aşağıdaki amaçlarla çerezler kullanmaktayız:
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Web sitesinin düzgün çalışmasını sağlamak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Güvenli alışveriş ortamı oluşturmak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Kullanıcı tercihlerini hatırlamak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Site trafiğini analiz etmek ve iyileştirmeler yapmak</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">3. Çerez Türleri</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Zorunlu Çerezler</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Web sitesinin temel işlevlerinin çalışması için gereklidir. Bu çerezler olmadan 
                      alışveriş sepeti, güvenli ödeme gibi özellikler çalışmaz. Bu çerezler kişisel 
                      bilgilerinizi tanımlamaz.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Performans Çerezleri</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Ziyaretçilerin web sitemizi nasıl kullandığı hakkında bilgi toplar. Hangi 
                      sayfaların en çok ziyaret edildiği, hata mesajları alınıp alınmadığı gibi 
                      bilgileri anonim olarak toplar.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">İşlevsellik Çerezleri</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Web sitesinin sizi hatırlamasını ve tercihlerinizi (dil seçimi, bölge, kullanıcı 
                      adı gibi) kaydetmesini sağlar. Bu sayede size daha kişiselleştirilmiş bir 
                      deneyim sunabiliriz.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Hedefleme/Reklam Çerezleri</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Size ve ilgi alanlarınıza uygun reklamlar sunmak için kullanılır. Ayrıca bir 
                      reklamı kaç kez gördüğünüzü sınırlamak ve reklam kampanyalarının etkinliğini 
                      ölçmek için de kullanılır.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">4. Üçüncü Taraf Çerezleri</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Web sitemizde, üçüncü taraf hizmet sağlayıcıların çerezleri de bulunabilir. 
                  Bunlar genellikle analiz (Google Analytics), sosyal medya entegrasyonu ve 
                  reklam hizmetleri için kullanılır. Bu çerezler, ilgili üçüncü tarafların 
                  gizlilik politikalarına tabidir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">5. Çerezleri Kontrol Etme</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Çerezleri kabul etmek zorunlu değildir. Tarayıcı ayarlarınızdan çerezleri 
                  yönetebilir, silebilir veya engelleyebilirsiniz:
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Firefox: Tercihler → Gizlilik ve Güvenlik → Çerezler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Safari: Tercihler → Gizlilik → Çerezler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Edge: Ayarlar → Gizlilik, arama ve hizmetler → Çerezler</span>
                  </li>
                </ul>
                <p className="text-neutral-600 leading-relaxed mt-4">
                  Ancak, çerezleri devre dışı bırakmanız durumunda web sitemizin bazı özellikleri 
                  düzgün çalışmayabilir.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">6. Çerez Listesi</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-4 font-medium text-neutral-900">Çerez Adı</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-900">Türü</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-900">Süresi</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-900">Açıklama</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-600">
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 px-4">session_id</td>
                        <td className="py-3 px-4">Zorunlu</td>
                        <td className="py-3 px-4">Oturum</td>
                        <td className="py-3 px-4">Kullanıcı oturumunu yönetir</td>
                      </tr>
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 px-4">cart_items</td>
                        <td className="py-3 px-4">Zorunlu</td>
                        <td className="py-3 px-4">7 gün</td>
                        <td className="py-3 px-4">Alışveriş sepeti bilgileri</td>
                      </tr>
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 px-4">_ga</td>
                        <td className="py-3 px-4">Analitik</td>
                        <td className="py-3 px-4">2 yıl</td>
                        <td className="py-3 px-4">Google Analytics</td>
                      </tr>
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 px-4">user_preferences</td>
                        <td className="py-3 px-4">İşlevsellik</td>
                        <td className="py-3 px-4">1 yıl</td>
                        <td className="py-3 px-4">Kullanıcı tercihleri</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">7. Güncellemeler</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Bu çerez politikasını zaman zaman güncelleme hakkımızı saklı tutarız. 
                  Değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer. Son güncelleme 
                  tarihini sayfanın üst kısmında bulabilirsiniz.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extralight text-neutral-900 mb-4">8. İletişim</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Çerez politikamız hakkında sorularınız varsa, lütfen bizimle iletişime geçin:
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

              <div className="mt-12 flex gap-4">
                <Link href="/privacy">
                  <Button variant="outline" className="h-12 px-6 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                    GİZLİLİK POLİTİKASI
                  </Button>
                </Link>
                <Link href="/terms">
                  <Button variant="outline" className="h-12 px-6 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-light tracking-wider">
                    KULLANIM KOŞULLARI
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}