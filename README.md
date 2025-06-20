# Kocaeli Şekerleme E-Commerce Platform

Modern ve yüksek performanslı e-ticaret platformu. Next.js 15, TypeScript, Tailwind CSS v4 ve Prisma ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern UI/UX**: 2025 tasarım trendleri ve minimal tasarım anlayışı
- **Yüksek Performans**: Next.js 15 App Router ve React Server Components
- **Güvenli Ödeme**: Iyzico entegrasyonu ile 3D Secure ödeme desteği
- **Stok Yönetimi**: Gerçek zamanlı stok rezervasyon sistemi
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **SEO Optimizasyonu**: Meta tag yönetimi ve yapılandırılmış veri
- **Performans İzleme**: Sentry entegrasyonu

## 🛠️ Teknoloji Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Radix UI

### Backend
- Prisma ORM
- PostgreSQL
- Redis (Cache & Session)
- RabbitMQ (Message Queue)

### Altyapı
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Vercel (Deployment)
- Sentry (Monitoring)

## 📦 Kurulum

### Gereksinimler

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Adımlar

1. **Repoyu klonlayın**
   ```bash
   git clone https://github.com/your-org/minimal-ecommerce.git
   cd minimal-ecommerce
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   pnpm install
   ```

3. **Environment değişkenlerini ayarlayın**
   ```bash
   cp .env.example .env
   # .env dosyasını düzenleyin
   ```

4. **Docker servislerini başlatın**
   ```bash
   pnpm docker:up
   ```

5. **Veritabanını hazırlayın**
   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

6. **Geliştirme sunucusunu başlatın**
   ```bash
   pnpm dev
   ```

7. **Worker'ları başlatın** (ayrı terminal)
   ```bash
   pnpm workers:dev
   ```

## 📝 Kullanılabilir Scriptler

```bash
# Geliştirme
pnpm dev              # Geliştirme sunucusunu başlat
pnpm build            # Production build
pnpm start            # Production sunucusu

# Veritabanı
pnpm db:generate      # Prisma client oluştur
pnpm db:migrate       # Migration'ları çalıştır
pnpm db:seed          # Test verisi ekle
pnpm db:studio        # Prisma Studio'yu aç

# Test
pnpm test             # Unit testleri çalıştır
pnpm test:e2e         # E2E testleri çalıştır
pnpm lint             # Linting
pnpm type-check       # TypeScript kontrol

# Docker
pnpm docker:up        # Servisleri başlat
pnpm docker:down      # Servisleri durdur
pnpm docker:logs      # Logları göster

# Workers
pnpm workers:start    # Production worker'ları
pnpm workers:dev      # Development worker'ları
```

## 🏗️ Proje Yapısı

```
minimal-ecommerce/
├── app/                    # Next.js App Router
│   ├── (shop)/            # Public routes
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions
│   ├── services/          # Business logic
│   ├── workers/           # Background jobs
│   └── middleware/        # Express middleware
├── prisma/                # Database schema
├── public/                # Static files
├── email-templates/       # Email templates
└── scripts/               # Utility scripts
```

## 🔒 Güvenlik

- CSRF koruması
- Rate limiting
- SQL injection koruması (Prisma)
- XSS koruması
- Güvenli HTTP başlıkları
- Input validation
- Şifrelenmiş oturumlar

## 🚀 Deployment

### Vercel Deployment

1. Vercel'de yeni proje oluşturun
2. Environment değişkenlerini ayarlayın
3. Deploy edin:
   ```bash
   vercel --prod
   ```

### Docker Deployment

1. Docker image oluşturun:
   ```bash
   docker build -t kocaeli-sekerleme .
   ```

2. Container'ı çalıştırın:
   ```bash
   docker run -p 3000:3000 --env-file .env kocaeli-sekerleme
   ```

## 📊 Monitoring

- **Sentry**: Hata takibi ve performans izleme
- **Google Analytics**: Kullanıcı davranışları
- **Custom Metrics**: Redis üzerinden özel metrikler

## 🧪 Test

```bash
# Unit testler
pnpm test

# E2E testler
pnpm test:e2e

# Coverage raporu
pnpm test -- --coverage
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'e push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

- Website: [kocaelisekerleme.com](https://kocaelisekerleme.com)
- Email: destek@kocaelisekerleme.com
- Tel: 0262 123 45 67

---

1948'den beri aynı lezzet. 🍯
