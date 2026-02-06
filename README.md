# My New Blog

Kişisel blog sitesi - Node.js ve Express ile geliştirilmiş.

## Özellikler

- 📝 Blog yazıları
- 📧 İletişim formu (Email gönderimi)
- 🎨 Responsive tasarım
- 🌙 Koyu tema desteği

## Kurulum

### 1. Gerekli Paketleri Yükleyin

```bash
npm install
```

### 2. Environment Değişkenlerini Ayarlayın

`.env.example` dosyasından `.env` dosyasını oluşturun:

```bash
cp .env.example .env
```

Ardından `.env` dosyasını düzenleyin ve kendi değerlerinizi girin:

```env
EMAIL_USER=sizin@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=3000
```

#### Gmail App Password Alma Adımları:

1. [Google Account Security](https://myaccount.google.com/security) sayfasına gidin
2. 2 aşamalı doğrulamayı etkinleştirin (varsa)
3. "App passwords" bölümüne gidin
4. Mail ve Windows seçin
5. Oluşturulan şifreyi kopyalayın ve `.env` dosyasına yapıştırın

### 3. Sunucuyu Başlatın

```bash
npm start
```

Server `http://localhost:3000` adresinde çalışacaktır.

## API Endpoints

### Contact Form
- **POST** `/api/contact`
- Body:
  ```json
  {
    "name": "İsim",
    "email": "email@example.com",
    "subject": "Konu",
    "message": "Mesaj"
  }
  ```

## Klasör Yapısı

```
myNewBlog/
├── html/              # HTML sayfaları
├── css/               # Stil dosyaları
├── js/                # JavaScript dosyaları
├── img/               # Görüntü dosyaları
├── server.js          # Express sunucusu
├── package.json       # Bağımlılıklar
├── .env              # Environment değişkenleri (GIT'e eklemeyin!)
├── .env.example      # Example dosyası
└── README.md         # Bu dosya
```

## Gereklilikler

- Node.js v12 veya üzeri
- npm veya yarn
- Gmail hesabı (email gönderimi için)

## Güvenlik

- `.env` dosyasını asla Git'e commit etmeyin
- `.gitignore` dosyası zaten `.env` ve `node_modules/` içeriyor

## Lisans

Bu proje kişisel kullanım içindir.
