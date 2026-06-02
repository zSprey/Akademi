# 🎓 Akıllı Senaryo Akademi

Lise öğrencileri için yapay zeka destekli sınav hazırlık platformu.  
**Google Gemini AI** • Tamamen Ücretsiz • MEB Uyumlu • 11. Sınıf Fen Lisesi

## ✨ Özellikler

- 7 ders sekmesi (Matematik, Edebiyat, Biyoloji, Kimya, Fizik, Din, Felsefe)
- 🧬 Biyoloji kitabı bilgi tabanı dahili yüklü
- Senaryo analizi (kazanımlar, konu sırası, soru dağılımı)
- Kapsamlı konu anlatımı
- 90+ soru üretimi (7 farklı tip)
- Otomatik cevap anahtarı + Çalışma föyü
- Koyu / Açık tema

## 🔑 Ücretsiz API Key Alma (Gemini)

1. 👉 [aistudio.google.com](https://aistudio.google.com) → Google hesabıyla giriş
2. Sol menü → **"Get API Key"**
3. **"Create API Key"** → kopyala
4. Key şu formatta: `AIzaSy_xxxxxxxxxxxxx`
5. **Kredi kartı gerekmez, tamamen ücretsiz!**

## 🚀 Kurulum

### 1. Bağımlılıkları yükle
```bash
npm install
```

### 2. API key ayarla
```bash
cp .env.example .env.local
```
`.env.local` dosyasını aç:
```
GEMINI_API_KEY=AIzaSy_BURAYA_KEY_YAPISTIR
```

### 3. Çalıştır
```bash
npm run dev
```
→ http://localhost:3000

## 🌐 Vercel Deploy

1. GitHub'a push et
2. [vercel.com](https://vercel.com) → New Project → repo seç
3. **Environment Variables** ekle:
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSy_xxxxxxxxxxxxx`
4. **Deploy** → 2 dakikada canlı!

## 📁 Dosya Yapısı

```
akilli-senaryo-akademi/
├── pages/
│   ├── index.js          ← Ana uygulama
│   ├── _app.js
│   ├── _document.js
│   └── api/
│       └── chat.js       ← Gemini API proxy (key güvende)
├── styles/globals.css
├── .env.example          ← Key şablonu
├── .gitignore
├── package.json
└── README.md
```

## ⚠️ Önemli

- `.env.local` dosyasını **asla GitHub'a yükleme** (.gitignore zaten engelliyor)
- Vercel'deki Environment Variables'a gizlice gir
- Gemini 1.5 Flash: günde **1500 istek ücretsiz**

---
Akıllı Senaryo Akademi © 2025 • Google Gemini AI ile çalışır
