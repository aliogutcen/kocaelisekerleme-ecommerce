import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Giriş Yap | Kocaeli Şekerleme',
  description: 'Kocaeli Şekerleme hesabınıza giriş yapın veya yeni hesap oluşturun',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center group">
            <span className="text-2xl font-light tracking-wider text-gray-900 transition-opacity group-hover:opacity-70" style={{ fontFamily: 'var(--font-playfair)' }}>
              Kocaeli <span className="font-normal">Şekerleme</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Image (Desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50/30"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center p-16">
            <div className="max-w-xl">
              <h1 className="text-7xl font-light text-gray-900 mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Geleneksel<br />
                <span className="font-normal italic">Lezzetler</span>
              </h1>
              <p className="text-lg text-gray-500 mb-16 leading-relaxed font-light">
                1948'den beri süregelen tahin ve helva ustalığımızla, 
                sofranıza sağlık ve lezzet getiriyoruz.
              </p>
              
              {/* Minimal Stats */}
              <div className="grid grid-cols-3 gap-12">
                <div>
                  <div className="text-4xl font-light text-gray-900 mb-2">75+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-light">Yıllık Deneyim</div>
                </div>
                
                <div>
                  <div className="text-4xl font-light text-gray-900 mb-2">100%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-light">Doğal</div>
                </div>
                
                <div>
                  <div className="text-4xl font-light text-gray-900 mb-2">50K+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-light">Mutlu Müşteri</div>
                </div>
              </div>
              
              {/* Quote */}
              <div className="mt-24">
                <div className="w-16 h-px bg-gray-300 mb-6"></div>
                <p className="text-base text-gray-500 italic font-light leading-relaxed">
                  "Babadan oğula, nesilden nesile aktarılan<br />bir lezzet hikayesi..."
                </p>
                <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">— Since 1948</p>
              </div>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gray-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-gray-100/40 rounded-full blur-3xl"></div>
          
          {/* Decorative Lines */}
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gray-200/50 to-transparent"></div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}