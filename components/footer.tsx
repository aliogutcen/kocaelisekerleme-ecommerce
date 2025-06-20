import Link from "next/link"
import { Instagram, Twitter, Youtube } from "lucide-react"
import { CookieSettingsButton } from "@/components/cookie-consent"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">KOCAELİ ŞEKERLEME</h3>
            <p className="text-sm text-muted-foreground">
              Geleneksel yöntemlerle, doğal ve katkısız ürünler üretiyoruz. 
              Tahin, helva, pekmez ve lokumlarımızla sofralarınıza lezzet katıyoruz.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Ürünlerimiz</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=tahin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tahin Çeşitleri
                </Link>
              </li>
              <li>
                <Link href="/products?category=helva" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tahin Helvası
                </Link>
              </li>
              <li>
                <Link href="/products?category=pekmez" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Doğal Pekmez
                </Link>
              </li>
              <li>
                <Link href="/products?category=lokum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  El Yapımı Lokum
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Müşteri Hizmetleri</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Kargo Bilgileri
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Kargo Takip
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Kurumsal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sürdürülebilirlik
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Basın
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Bizi Takip Edin</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Kocaeli Şekerleme. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Çerez Politikası
              </Link>
              <CookieSettingsButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}