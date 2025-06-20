# 🚀 Hızlı Başlangıç Rehberi

## 1️⃣ Docker Desktop Kurulumu

### macOS için:
1. [Docker Desktop İndir](https://www.docker.com/products/docker-desktop/)
2. `.dmg` dosyasını aç ve Docker'ı Applications'a sürükle
3. Docker'ı başlat (menü barda balina ikonu görünmeli)

## 2️⃣ Projeyi Hazırla

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Development environment dosyasını kopyala
cp .env.development .env

# 3. Tüm servisleri başlat (PostgreSQL, Redis, RabbitMQ, MinIO)
npm run setup:local
```

## 3️⃣ Projeyi Çalıştır

```bash
# Development server'ı başlat
npm run dev
```

Proje şu adreste çalışacak: http://localhost:3000

## 📊 Servisler ve Erişim Bilgileri

### PostgreSQL (Database)
- **Bağlantı**: `postgresql://kocaeli_user:secure_password@localhost:5432/kocaeli_sekerleme`
- **pgAdmin ile bağlanmak için**:
  ```bash
  docker run -p 5050:80 \
    -e PGADMIN_DEFAULT_EMAIL=admin@admin.com \
    -e PGADMIN_DEFAULT_PASSWORD=admin \
    dpage/pgadmin4
  ```
  Sonra http://localhost:5050 adresine gidin

### Redis (Cache)
- **Bağlantı**: `redis://:secure_redis_password@localhost:6379`
- **CLI ile bağlanmak için**:
  ```bash
  docker exec -it kocaeli_redis_dev redis-cli -a secure_redis_password
  ```

### RabbitMQ (Message Queue)
- **Bağlantı**: `amqp://kocaeli_user:secure_rabbitmq_password@localhost:5672`
- **Management UI**: http://localhost:15672
  - User: `kocaeli_user`
  - Pass: `secure_rabbitmq_password`

### MinIO (S3 Compatible Storage)
- **Console**: http://localhost:9001
  - User: `minioadmin`
  - Pass: `minioadmin123`

### Mailhog (Email Testing)
- **Web UI**: http://localhost:8025
- **SMTP**: `localhost:1025`

## 🛠️ Faydalı Komutlar

```bash
# Container durumunu kontrol et
npm run docker:status

# Logları izle
npm run docker:logs

# Servisleri durdur
npm run docker:down

# Servisleri yeniden başlat
npm run docker:restart

# Database'e bağlan
docker exec -it kocaeli_postgres_dev psql -U kocaeli_user -d kocaeli_sekerleme

# Prisma Studio (Database GUI)
npm run db:studio

# Migration oluştur
npx prisma migrate dev --name migration_name

# Seed data yükle
npm run db:seed
```

## 🔍 Health Check

Servislerin durumunu kontrol etmek için:
```bash
curl http://localhost:3000/api/health
```

## ❓ Sorun Giderme

### "Docker daemon is not running" hatası
→ Docker Desktop'ı başlatın

### Port çakışması hatası
→ Başka bir uygulama aynı portu kullanıyor olabilir. Docker servisleri durdurun:
```bash
npm run docker:down
```

### Database bağlantı hatası
→ PostgreSQL container'ının çalıştığını kontrol edin:
```bash
docker ps | grep postgres
```

### Permission hatası
→ Script'lere çalıştırma izni verin:
```bash
chmod +x scripts/*.sh
chmod +x *.sh
```

## 📱 Test Kullanıcıları

Seed data yüklendikten sonra:

**Admin:**
- Email: `admin@kocaelisekerleme.com`
- Şifre: `Admin123!`

**Müşteri:**
- Email: `test@example.com`
- Şifre: `Test123!`

## 🎯 Sonraki Adımlar

1. http://localhost:3000 adresine gidin
2. Ürünlere göz atın
3. Test kullanıcısı ile giriş yapın
4. Alışveriş sepetine ürün ekleyin
5. Checkout flow'u test edin

İyi geliştirmeler! 🎉