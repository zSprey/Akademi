import { useState, useRef } from "react";
import Head from "next/head";

// ─── BIOLOGY KNOWLEDGE BASE (11. Sınıf Fen Lisesi) ───────────────────────────
const BIOLOGY_KB = {
  "Sinir Sistemi": {
    summary: `Sinir sistemi, vücudun iç ve dış ortamından gelen uyarıları alarak değerlendiren ve uygun tepkilerin oluşmasını sağlayan sistemdir. Merkezi sinir sistemi (beyin + omurilik) ve çevresel sinir sistemi olarak ikiye ayrılır. Temel birimi nörondur: duyu (afferent), ara (internöron) ve motor (efferent) çeşitleri vardır. Aksiyon potansiyeli: polarizasyon → depolarizasyon (Na⁺ girişi) → repolarizasyon (K⁺ çıkışı) aşamalarından oluşur. Miyelin kılıf iletim hızını artırır; Ranvier boğumlarında saltatorik iletim gerçekleşir.`,
    critical: "Hep ya hiç kuralı geçerlidir. Miyelin kılıf hasarı MS hastalığına yol açar. Sinaps: nörotransmitter kimyasal iletimi sağlar.",
    keywords: ["nöron", "aksiyon potansiyeli", "sinaps", "miyelin", "nörotransmitter", "refleks yayı"]
  },
  "Endokrin Sistem": {
    summary: `Endokrin sistem hormon salgılayan bezlerden oluşur. Hipotalamus-hipofiz ekseni ana kontrol merkezidir. Hipofiz ön lobu: GH, TSH, ACTH, FSH, LH salgılar. Arka lobu: ADH (vazopressin), oksitosin salgılar. Tiroid: T3, T4 (metabolizma), kalsitonin (Ca²⁺ düşürür). Adrenal korteks: kortizol, aldosteron. Adrenal medulla: adrenalin, noradrenalin. Pankreas: beta hücreleri insülin (şekeri düşürür), alfa hücreleri glukagon (şekeri artırır). Negatif geri bildirim mekanizması hormonal dengeyi korur.`,
    critical: "İnsülin: BETA hücrelerinden. Glukagon: ALFA hücrelerinden. Diyabet tip1=insülin üretilmez, tip2=insülin direnci. ADH eksikliği=diyabetes insipidus.",
    keywords: ["hormon", "hipofiz", "hipotalamus", "insülin", "glukagon", "negatif geri bildirim", "tiroid"]
  },
  "Duyu Organları": {
    summary: `Göz: kornea → iris → lens → retina (koni=renk, çubuk=karanlık). Sarı nokta (fovea): en net görme yeri. Kör nokta: optik sinir bağlantısı, reseptör yok. Kulak: dış kulak → zar → çekiç-örs-üzengi → oval pencere → koklea → Korti organı → işitme. Yarım daire kanalları denge sağlar. Deri: Meissner (dokunma), Pacini (basınç), serbest uçlar (ağrı/sıcaklık). Tat: tatlı, tuzlu, ekşi, acı, umami (5 temel). Koku: limbik sisteme bağlıdır.`,
    critical: "Fovea: maksimum görme keskinliği. Kör nokta: hiç reseptör yok. Ses: mekanik enerji → elektrik impulsuna dönüşür.",
    keywords: ["retina", "koni", "çubuk", "fovea", "kör nokta", "koklea", "Korti organı", "Meissner"]
  },
  "Destek ve Hareket": {
    summary: `İskelet: 206 kemik; destek, koruma, hareket, mineral deposu, kan yapımı. Kaslar: iskelet kası (çizgili, istemli), düz kas (istemsiz, iç organlar), kalp kası (çizgili, istemsiz). Kas kasılması: Ca²⁺ troponin-tropomiyozini serbest bırakır → aktin-miyozin köprüsü → ATP harcanır → sarkomer kısalır, Z çizgileri yaklaşır. Eklemler: sabit (kafatası), yarı hareketli (omurlar), hareketli/sinovyal (diz, dirsek). Kaldıraç sistemi: 3 türü vardır.`,
    critical: "Kasılmada aktin iplikleri miyozin üzerinde KAYAR (aktin veya miyozin uzunluğu değişmez!). ATP yoksa kasılma olmaz. Rigor mortis: ölümde ATP yokluğundan kaslar katılaşır.",
    keywords: ["sarkomer", "aktin", "miyozin", "Ca²⁺", "troponin", "ATP", "Z çizgisi", "sinovyal eklem"]
  },
  "Sindirim Sistemi": {
    summary: `Ağız: amilaz (nişasta→maltoz). Mide: pepsin (protein, pH2), HCl. İnce bağırsak: tripsin (proenzim olarak gelir, enterokinaz aktifleştirir), maltaz, laktaz, lipaz. Villus ve mikrovilli emilim yüzeyini ~600 kat artırır. Karaciğer: safra üretir (yağ emülsiyonu, enzim DEĞİL), glikojen depolar, üre sentezler, pıhtılaşma faktörleri. Pankreas: amilaz, lipaz, tripsinojen, bikarbonat (ortamı bazikleştirir). Emilim: yağlar→lakteal (lenf), diğerleri→kapiller (kan).`,
    critical: "Safra ENZİM DEĞİL, emülgatördür. Tripsinojen→tripsin (enterokinaz ile). Lakteal: yağ emilim damarı. Karaciğer ince bağırsağa safrayı SALGINAR.",
    keywords: ["amilaz", "pepsin", "tripsin", "villus", "lakteal", "safra", "enterokinaz", "emülsiyon"]
  },
  "Dolaşım Sistemi": {
    summary: `Çift dolaşım: pulmoner (küçük, akciğer) + sistemik (büyük, vücut). Kalp: 4 odacık. Sağ kalp: kirli kan→akciğer. Sol kalp: temiz kan→vücut. Kan hücreleri: eritrosit (hemoglobin, O₂ taşır, çekirdeksiz, 120 gün), lökosit (bağışıklık), trombosit (pıhtılaşma). ABO: A→β antikoru, B→α antikoru, AB→antikor yok (evrensel alıcı), O→her iki antijen yok (evrensel verici). Rh+: D antijeni var. Lenfatik: doku sıvısı toplar, bağışıklık.`,
    critical: "AB: evrensel ALICI (antikoru yok). O: evrensel VERİCİ (antijeni yok). Kan grubu uyumsuzluğu→aglütinasyon→ölümcül. Arterler: kalpten uzaklaşır. Venler: kalbe gelir (akciğer veni hariç temiz kan taşır).",
    keywords: ["hemoglobin", "eritrosit", "lökosit", "trombosit", "ABO", "Rh", "aglütinasyon", "lenfatik"]
  },
  "Solunum Sistemi": {
    summary: `Üst yol: burun→farinks→larinks (ses telleri). Alt yol: trakea→bronş→bronşiyoller→alveoller. Gaz değişimi difüzyonla: O₂ alveol→kan, CO₂ kan→alveol. Hemoglobin: 4 alt birim, toplam 4 O₂ bağlar. Karbaminohemoglobin: CO₂ taşır. İnspirasyon: diyafram kasılır, göğüs genişler, pasif ekspirasyon. Solunum merkezi: medulla oblongata (CO₂ duyarlı). Bohr etkisi: pH↓ veya CO₂↑ → O₂ salınımı↑.`,
    critical: "CO hemoglobine O₂'den 200x fazla bağlanır (karbon monoksit zehirlenmesi). Bohr etkisi: asidik ortamda O₂ daha kolay salınır (kasılarda faydalı). Surfaktan eksikliği→alveol kollapsı.",
    keywords: ["alveol", "hemoglobin", "difüzyon", "Bohr etkisi", "diyafram", "surfaktan", "medulla oblongata"]
  },
  "Boşaltım Sistemi": {
    summary: `Böbrek: korteks (nefron gövdeleri) + medulla (toplayıcı kanallar). Nefron: Bowman kapsülü→proksimal tübül→Henle kulpu→distal tübül→toplayıcı kanal. Filtrasyon (glomerulus, 125mL/dk) → geri emilim → tübüler salgı → idrar. ADH: su geri emilimini artırır, idrarı koyulaştırır. Aldosteron: Na⁺ geri emilimini artırır. İdrar: su, üre, tuz, kreatinin, ürik asit. Glukoz normalde idrarda BULUNMAZ.`,
    critical: "Glukozüri: diyabette renal eşik aşılınca. ADH eksikliği=diyabetes insipidus (çok su kaybı, şeker YOK). Diyaliz: nefron görevi yapay. Albumin idrarda BULUNMAZ (büyük protein, filtrelanamaz).",
    keywords: ["nefron", "glomerulus", "Bowman", "ADH", "aldosteron", "GFR", "renal eşik", "diyaliz"]
  },
  "Üreme Sistemi": {
    summary: `Erkek: testis (sperm+testosteron), epididimis, vas deferens, seminal vezikül, prostat. Kadın: over (yumurta+östrojen+progesteron), fallop tüpü, uterus, vajen. Oogenez: doğumdan önce başlar, her ay 1 yumurta. Spermatogenez: ergenlikten sonra sürekli. Menstrual döngü: folikül fazı(FSH)→ovulasyon(LH zirvesi)→luteal faz(progesteron). Fertilizasyon: fallop tüpünde. Zigot→morula→blastula→gastrula→organogenez. hCG: gebelik testi.`,
    critical: "LH zirvesi ovulasyonu tetikler. Korpus luteum: progesteron üretir, endometriumu korur. Gebelikte hCG testi pozitif. Mayoz: gametlerde. Mitoz: embriyonik gelişimde.",
    keywords: ["gametogenez", "oogenez", "spermatogenez", "FSH", "LH", "progesteron", "östrojen", "hCG", "fertilizasyon"]
  },
  "Popülasyon Ekolojisi": {
    summary: `Ekolojik organizasyon: birey→popülasyon→komünite→ekosistem→biyom→biyosfer. Popülasyon büyümesi: J tipi (üstel, sınırsız kaynak), S tipi (lojistik, taşıma kapasitesi=K). Komünite ilişkileri: mutualizm (+/+), kommensalizm (+/0), parazitizm (+/-), predasyon (+/-), rekabet (-/-). Besin zinciri: üretici→birincil tüketici→ikincil tüketici→ayrıştırıcı. %10 kuralı: her trofik basamakta enerji %10 aktarılır. Madde döngüsü geri dönüşümlü, enerji akışı tek yönlü.`,
    critical: "%10 kuralı: enerji piramidinin her basamağında %90 kaybedilir. Küresel ısınma: CO₂↑→sera etkisi. Biyomlar: tropikal yağmor ormanı en yüksek biyoçeşitlilik. Ototroflar: güneş enerjisini sabitler.",
    keywords: ["popülasyon", "taşıma kapasitesi", "lojistik büyüme", "mutualizm", "%10 kuralı", "biyom", "sera etkisi"]
  }
};

// ─── SUBJECTS ─────────────────────────────────────────────────────────────────
const SUBJECTS = [
  { id: "matematik",  label: "Matematik",        icon: "∑",  color: "#3b82f6" },
  { id: "edebiyat",   label: "Edebiyat",          icon: "✍",  color: "#8b5cf6" },
  { id: "biyoloji",   label: "Biyoloji",          icon: "🧬", color: "#10b981" },
  { id: "kimya",      label: "Kimya",             icon: "⚗",  color: "#f59e0b" },
  { id: "fizik",      label: "Fizik",             icon: "⚛",  color: "#ef4444" },
  { id: "din",        label: "Din Kültürü",       icon: "☪",  color: "#06b6d4" },
  { id: "felsefe",    label: "Felsefe",           icon: "🔮", color: "#ec4899" },
];

// ─── API CALL ──────────────────────────────────────────────────────────────────
async function callClaude(messages, system) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      system: system || "Sen Türkiye MEB müfredatına uygun, lise öğrencilerine yönelik çalışan bir eğitim asistanısın. Her zaman Türkçe yanıt ver. Akademik, açık ve öğrenci dostu bir dil kullan.",
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error || "API hatası");
  return data.content?.[0]?.text || "";
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Spinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>
    <path d="M12 3a9 9 0 019 9" strokeLinecap="round" />
  </svg>
);

const IconUpload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);

const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// ─── OUTPUT CARD ──────────────────────────────────────────────────────────────
function OutputCard({ title, content, isLoading, dark, color }) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(content || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([`${title}\n${"=".repeat(60)}\n\n${content}`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${title.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]/g, "")}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  const bg = dark ? "#0f172a" : "#ffffff";
  const border = dark ? "#1e293b" : "#e9ecef";
  const headerBg = dark ? "#1a2540" : "#f8fafc";
  const txt = dark ? "#e2e8f0" : "#1e293b";
  const muted = dark ? "#64748b" : "#94a3b8";

  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", cursor: "pointer", background: headerBg,
        borderBottom: open ? `1px solid ${border}` : "none"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: color || "#10b981" }} />
          <span style={{ fontWeight: 700, fontSize: 13, color: txt }}>{title}</span>
          {isLoading && <Spinner />}
          {content && !isLoading && (
            <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }}>✓ Hazır</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {content && !isLoading && (
            <>
              <button onClick={e => { e.stopPropagation(); handleCopy(); }} style={{
                fontSize: 11, padding: "3px 8px", borderRadius: 6, border: `1px solid ${border}`,
                background: "transparent", color: muted, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
              }}>
                <IconCopy /> {copied ? "Kopyalandı!" : "Kopyala"}
              </button>
              <button onClick={e => { e.stopPropagation(); handleDownload(); }} style={{
                fontSize: 11, padding: "3px 8px", borderRadius: 6, border: `1px solid ${border}`,
                background: "transparent", color: muted, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
              }}>
                <IconDownload /> İndir
              </button>
            </>
          )}
          <IconChevron open={open} />
        </div>
      </div>
      {open && (
        <div style={{ padding: "16px 18px" }}>
          {isLoading
            ? <div style={{ display: "flex", gap: 10, alignItems: "center", color: muted, fontSize: 13 }}>
                <Spinner /> <span>Yapay zeka içerik üretiyor, lütfen bekleyin...</span>
              </div>
            : content
              ? <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.9, color: txt, fontFamily: "'Outfit', sans-serif", margin: 0 }}>
                  {content}
                </pre>
              : <div style={{ color: muted, fontSize: 13, fontStyle: "italic" }}>Henüz içerik üretilmedi. Senaryo girin ve butona tıklayın.</div>
          }
        </div>
      )}
    </div>
  );
}

// ─── UPLOAD ZONE ──────────────────────────────────────────────────────────────
function UploadZone({ label, type, onUpload, uploaded, dark }) {
  const ref = useRef();
  const border = dark ? "#2d3748" : "#e2e8f0";
  const bg = dark ? "#1a2540" : "#f8fafc";
  const txt = dark ? "#cbd5e1" : "#475569";

  return (
    <div onClick={() => ref.current.click()} style={{
      border: `2px dashed ${uploaded ? "#10b981" : border}`,
      borderRadius: 12, padding: "18px 14px", background: uploaded ? (dark ? "#064e3b33" : "#ecfdf5") : bg,
      cursor: "pointer", textAlign: "center", transition: "all .2s"
    }}>
      <input ref={ref} type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: "none" }}
        onChange={e => e.target.files[0] && onUpload(e.target.files[0], type)} />
      {uploaded
        ? <div style={{ color: "#10b981", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <IconCheck /> {uploaded.name.length > 22 ? uploaded.name.slice(0, 22) + "…" : uploaded.name}
          </div>
        : <>
            <div style={{ color: txt, marginBottom: 6, display: "flex", justifyContent: "center" }}><IconUpload /></div>
            <div style={{ fontWeight: 600, fontSize: 13, color: txt }}>{label}</div>
            <div style={{ fontSize: 11, color: dark ? "#475569" : "#94a3b8", marginTop: 3 }}>PDF / DOC / TXT</div>
          </>
      }
    </div>
  );
}

// ─── SUBJECT PANEL ────────────────────────────────────────────────────────────
function SubjectPanel({ subject, dark }) {
  const [files, setFiles] = useState({ kitap: null, senaryo: null, notlar: null });
  const [scenario, setScenario] = useState("");
  const [section, setSection] = useState("upload");
  const [outputs, setOutputs] = useState({});
  const [loading, setLoading] = useState({});

  const bg = dark ? "#090e1a" : "#f0f4f8";
  const cardBg = dark ? "#1a2540" : "#ffffff";
  const border = dark ? "#1e293b" : "#e9ecef";
  const txt = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#64748b" : "#94a3b8";

  const isBio = subject.id === "biyoloji";

  const bioContext = isBio
    ? "\n\n=== 11. SINIF BİYOLOJİ KİTABI BİLGİ TABANI ===\n" +
      Object.entries(BIOLOGY_KB).map(([k, v]) =>
        `\n[${k}]\nÖzet: ${v.summary}\nKritik: ${v.critical}\nAnahtar Kavramlar: ${v.keywords.join(", ")}`
      ).join("\n")
    : "";

  const sys = `Sen Türkiye MEB müfredatına uygun, deneyimli bir ${subject.label} öğretmenisin. 11. sınıf düzeyinde, lise öğrencilerine yönelik, MEB ortak sınav formatına uygun içerik üretirsin. Her zaman Türkçe yaz. Açık uçlu sorular için detaylı model cevaplar ver.`;

  const run = async (type, prompt) => {
    setLoading(p => ({ ...p, [type]: true }));
    try {
      const text = await callClaude([{ role: "user", content: prompt }], sys);
      setOutputs(p => ({ ...p, [type]: text }));
    } catch (e) {
      setOutputs(p => ({ ...p, [type]: "Hata: " + e.message }));
    }
    setLoading(p => ({ ...p, [type]: false }));
  };

  const scenarioCtx = scenario || `${subject.label} dersi genel müfredat konuları`;

  const prompts = {
    analiz: `Aşağıdaki ${subject.label} sınav senaryosunu MEB ortak sınav mantığına göre analiz et:

SENARYO: ${scenarioCtx}${bioContext}

Şunları ver:
1. 📌 TESPİT EDİLEN KAZANIMLAR (numaralı, tam)
2. 📋 KONU SIRASI (öncelikten düşüğe)
3. 📊 TAHMÎN SORU DAĞILIMI (her konudan kaç soru)
4. ⭐ EN KRİTİK 5 KONU
5. 🎯 SINAV STRATEJİSİ (öğrenciye tavsiye)`,

    konu: `${subject.label} dersi için kapsamlı konu anlatımı oluştur:

KONU/SENARYO: ${scenarioCtx}${bioContext}

Her konu için:
1. 📖 TAM KONU ÖZETI (paragraf halinde, eksiksiz)
2. 🔑 ANAHTAR KAVRAMLAR ve TANIMLAR
3. 📊 KARŞILAŞTIRMA TABLOLARI (ilgili yerlerde)
4. ⚠️ SINAV İÇİN KRİTİK BİLGİLER (özel vurgula)
5. 💡 HATIRLATICI İPUÇLARI
6. 🔗 KONULAR ARASI BAĞLANTI`,

    kisa20: `${subject.label} için 20 kısa cevaplı soru yaz:

KONU: ${scenarioCtx}${bioContext}

FORMAT:
S1. [Soru metni]
[K=Kolay / O=Orta / Z=Zor] | Kazanım: [kazanım]
CEVAP: [Tam ve eksiksiz kısa cevap]

20 soruyu sırayla yaz. MEB soru diline uygun ol.`,

    acik20: `${subject.label} için 20 açık uçlu soru yaz:

KONU: ${scenarioCtx}${bioContext}

HER SORU İÇİN:
S1. [Soru metni - tam cümle]
Zorluk: [K/O/Z] | Kazanım: [kazanım] | Puan: [100 üzerinden]
MODEL CEVAP:
[3-6 cümle, eksiksiz, nedensellik içeren model cevap]
PUANLAMA ÖLÇÜTLERİ:
- [ölçüt 1] ... puan
- [ölçüt 2] ... puan

20 soruyu yaz.`,

    yorum10: `${subject.label} için 10 yorum sorusu yaz:

KONU: ${scenarioCtx}${bioContext}

Yorum soruları grafik, tablo, deney, günlük hayat bağlantısı içersin.
FORMAT: Soru → Model Cevap → Kazanım
10 soru yaz.`,

    yeniNesil10: `${subject.label} için 10 yeni nesil soru yaz:

KONU: ${scenarioCtx}${bioContext}

Yeni nesil: paragraf bağlamlı, çoklu bilgi kaynağı, transfer gerektiren, üst düzey düşünme.
Her soru için model cevap da ver.
MEB yeni nesil format. 10 soru.`,

    dogYan10: `${subject.label} için 10 doğru-yanlış sorusu yaz:

KONU: ${scenarioCtx}${bioContext}

FORMAT:
( ) [İfade]
CEVAP: DOĞRU / YANLIŞ
AÇIKLAMA: [Neden doğru/yanlış - özellikle yanlışlar için düzeltme]

10 soru yaz.`,

    bosluk10: `${subject.label} için 10 boşluk doldurma sorusu yaz:

KONU: ${scenarioCtx}${bioContext}

FORMAT:
S1: "[Cümle ______ içerir ve _______ işlevi görür.]"
Cevaplar: 1) ... 2) ...
Açıklama: [Kısa bilgi]

10 soru yaz.`,

    eslestir10: `${subject.label} için 10 eşleştirme sorusu yaz:

KONU: ${scenarioCtx}${bioContext}

Kavram-tanım, yapı-işlev, teori-bilim insanı gibi çiftler.
Sol kolon (A-J) ve sağ kolon (1-10) oluştur, karıştır.
Sonuna CEVAP ANAHTARI ekle.`,

    cevapAnahtari: `${subject.label} için kapsamlı cevap anahtarı oluştur:

KONU: ${scenarioCtx}${bioContext}

FORMAT (her soru için):
Soru [N]: 
✅ TAM CEVAP: [eksiksiz yanıt]
📊 PUAN DAĞILIMI: [100 üzerinden, kısmi puanlar]  
🎯 KAZANIM: [ilgili kazanım]
⚡ ZORLUK: [Kolay/Orta/Zor]
❌ SIK YAPILAN HATA: [öğrencilerin nerede yanılıyor]

30 soru için cevap anahtarı hazırla.`,

    calismaFoyu: `${subject.label} için kapsamlı öğrenci çalışma föyü hazırla:

KONU: ${scenarioCtx}${bioContext}

BÖLÜMLER:
1. 📚 KONU ÖZETİ (madde madde, net ve öz)
2. 🔑 KAVRAMLAR SÖZLÜĞÜ (alfabetik sıra)
3. 📊 ÖNEMLİ TABLOLAR VE KARŞILAŞTIRMALAR
4. ⚠️ YANLIŞ BİLİNEN 5 YANLIŞ
5. 💡 EZBER KARTELİ (hızlı hatırlatıcılar)
6. 🎯 TAHMİN SORULAR (5 adet + cevap)
7. 📝 SINAV STRATEJİSİ

Sınav öncesi 1 günde kullanılacak, öğrenci dostu format.`,
  };

  const sections = [
    { id: "upload", label: "📁 Dosya Yükle" },
    { id: "analiz", label: "🔍 Senaryo Analizi" },
    { id: "konu", label: "📖 Konu Anlatımı" },
    { id: "sorular", label: "❓ Soru Üretimi" },
    { id: "cevap", label: "✅ Cevap Anahtarı" },
    { id: "calisma", label: "📋 Çalışma Paketi" },
  ];

  const btn = (color, full) => ({
    padding: full ? "10px 0" : "9px 16px",
    width: full ? "100%" : "auto",
    borderRadius: 10, border: "none", cursor: "pointer",
    fontWeight: 700, fontSize: 13, color: "#fff",
    background: color, display: "flex", alignItems: "center",
    justifyContent: "center", gap: 8, transition: "opacity .15s"
  });

  const generateAll = async () => {
    const all = Object.keys(prompts);
    for (const k of all) await run(k, prompts[k]);
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* Section nav */}
      <div style={{ width: 190, flexShrink: 0 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={{
            width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 10,
            border: "none", cursor: "pointer", marginBottom: 4, fontSize: 13,
            fontWeight: section === s.id ? 700 : 500,
            background: section === s.id ? subject.color + "20" : "transparent",
            color: section === s.id ? subject.color : muted, transition: "all .15s"
          }}>{s.label}</button>
        ))}
        <div style={{ height: 1, background: border, margin: "12px 0" }} />
        <button onClick={generateAll} style={btn(subject.color, true)}>
          <IconStar /> Hepsini Üret
        </button>
        {isBio && (
          <div style={{ marginTop: 12, padding: 10, background: "#10b98115", border: "1px solid #10b98133", borderRadius: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#10b981", marginBottom: 6 }}>🧬 Kitap Yüklü</div>
            {Object.keys(BIOLOGY_KB).map(k => (
              <div key={k} style={{ fontSize: 10, color: muted, padding: "2px 0", display: "flex", gap: 5 }}>
                <span style={{ color: "#10b981" }}>•</span>{k}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* ── UPLOAD ── */}
        {section === "upload" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: txt, marginBottom: 16 }}>
              📁 {subject.label} — Kaynak Yükleme
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              <UploadZone label="Ders Kitabı" type="kitap" onUpload={(f, t) => setFiles(p => ({ ...p, [t]: f }))} uploaded={files.kitap} dark={dark} />
              <UploadZone label="Sınav Senaryosu" type="senaryo" onUpload={(f, t) => setFiles(p => ({ ...p, [t]: f }))} uploaded={files.senaryo} dark={dark} />
              <UploadZone label="Öğretmen Notları" type="notlar" onUpload={(f, t) => setFiles(p => ({ ...p, [t]: f }))} uploaded={files.notlar} dark={dark} />
            </div>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 14, padding: 18 }}>
              <label style={{ fontWeight: 700, fontSize: 13, color: txt, display: "block", marginBottom: 10 }}>
                ✏️ Senaryo / Konu Metni
              </label>
              <textarea
                value={scenario}
                onChange={e => setScenario(e.target.value)}
                placeholder={`${subject.label} sınav senaryosunu buraya yazın...\n\nÖrnek: "Sinir sistemi ve endokrin sistem - 1. ünite ağırlıklı. Toplam 40 soru, açık uçlu ağırlıklı, 90 dakika."`}
                style={{
                  width: "100%", minHeight: 150, padding: 14,
                  borderRadius: 10, border: `1px solid ${border}`,
                  background: dark ? "#0f172a" : "#f8fafc", color: txt,
                  fontSize: 13, lineHeight: 1.7, resize: "vertical",
                  fontFamily: "'Outfit', sans-serif", boxSizing: "border-box"
                }}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                <button onClick={() => run("analiz", prompts.analiz)} style={btn(subject.color)}>
                  {loading.analiz ? <Spinner /> : "🔍"} Senaryo Analiz Et
                </button>
                <button onClick={() => run("konu", prompts.konu)} style={btn("#6366f1")}>
                  {loading.konu ? <Spinner /> : "📖"} Konu Anlatımı Oluştur
                </button>
                <button onClick={generateAll} style={btn("#0f172a")}>
                  {Object.values(loading).some(Boolean) ? <Spinner /> : <IconStar />} Tüm İçeriği Üret
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ANALİZ ── */}
        {section === "analiz" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: txt }}>🔍 Senaryo Analiz Sistemi</div>
              <button onClick={() => run("analiz", prompts.analiz)} style={btn(subject.color)}>
                {loading.analiz ? <Spinner /> : <IconStar />} Analiz Et
              </button>
            </div>
            <OutputCard title="Senaryo Analizi — Kazanımlar, Öncelik Sırası, Soru Dağılımı" content={outputs.analiz} isLoading={loading.analiz} dark={dark} color={subject.color} />
          </div>
        )}

        {/* ── KONU ── */}
        {section === "konu" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: txt }}>📖 Akıllı Konu Anlatımı</div>
              <button onClick={() => run("konu", prompts.konu)} style={btn(subject.color)}>
                {loading.konu ? <Spinner /> : "📖"} Konu Oluştur
              </button>
            </div>
            <OutputCard title="Kapsamlı Konu Özeti — Kavramlar, Tablolar, Kritik Bilgiler" content={outputs.konu} isLoading={loading.konu} dark={dark} color={subject.color} />
          </div>
        )}

        {/* ── SORULAR ── */}
        {section === "sorular" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: txt, marginBottom: 14 }}>❓ Soru Üretim Merkezi</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[
                ["kisa20", "📝 20 Kısa Cevaplı"],
                ["acik20", "✏️ 20 Açık Uçlu"],
                ["yorum10", "🔭 10 Yorum"],
                ["yeniNesil10", "⚡ 10 Yeni Nesil"],
                ["dogYan10", "✓✗ 10 D/Y"],
                ["bosluk10", "__ 10 Boşluk"],
                ["eslestir10", "↔ 10 Eşleştirme"],
              ].map(([t, label]) => (
                <button key={t} onClick={() => run(t, prompts[t])} style={{
                  padding: "10px 8px", borderRadius: 10,
                  border: `1px solid ${outputs[t] ? subject.color + "44" : border}`,
                  background: outputs[t] ? subject.color + "15" : (dark ? "#1a2540" : "#f8fafc"),
                  color: outputs[t] ? subject.color : txt,
                  cursor: "pointer", fontSize: 12, fontWeight: 600,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4
                }}>
                  {loading[t] ? <Spinner /> : <span>{label.split(" ")[0]}</span>}
                  <span style={{ fontSize: 11 }}>{label.split(" ").slice(1).join(" ")}</span>
                  {outputs[t] && <span style={{ fontSize: 10, color: "#10b981" }}>✓ Hazır</span>}
                </button>
              ))}
            </div>
            {[
              ["kisa20", "20 Kısa Cevaplı Soru"],
              ["acik20", "20 Açık Uçlu Soru"],
              ["yorum10", "10 Yorum Sorusu"],
              ["yeniNesil10", "10 Yeni Nesil Soru"],
              ["dogYan10", "10 Doğru-Yanlış Sorusu"],
              ["bosluk10", "10 Boşluk Doldurma"],
              ["eslestir10", "10 Eşleştirme Sorusu"],
            ].map(([t, label]) =>
              (outputs[t] || loading[t]) ? (
                <OutputCard key={t} title={label} content={outputs[t]} isLoading={loading[t]} dark={dark} color={subject.color} />
              ) : null
            )}
          </div>
        )}

        {/* ── CEVAP ── */}
        {section === "cevap" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: txt }}>✅ Cevap Anahtarı Sistemi</div>
              <button onClick={() => run("cevapAnahtari", prompts.cevapAnahtari)} style={btn(subject.color)}>
                {loading.cevapAnahtari ? <Spinner /> : "✅"} Cevap Anahtarı Oluştur
              </button>
            </div>
            <OutputCard title="Tam Cevap Anahtarı — Puanlama Ölçütleri, Kazanım, Zorluk" content={outputs.cevapAnahtari} isLoading={loading.cevapAnahtari} dark={dark} color={subject.color} />
          </div>
        )}

        {/* ── ÇALIŞMA ── */}
        {section === "calisma" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: txt }}>📋 Öğrenci Çalışma Paketi</div>
              <button onClick={() => run("calismaFoyu", prompts.calismaFoyu)} style={btn(subject.color)}>
                {loading.calismaFoyu ? <Spinner /> : "📋"} Çalışma Föyü Oluştur
              </button>
            </div>
            <OutputCard title="Kişiselleştirilmiş Çalışma Föyü — Özet, Kavramlar, Tahmin Sorular" content={outputs.calismaFoyu} isLoading={loading.calismaFoyu} dark={dark} color={subject.color} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const [dark, setDark] = useState(true);
  const [activeSubject, setActiveSubject] = useState("biyoloji");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const subject = SUBJECTS.find(s => s.id === activeSubject);

  const bg = dark ? "#090e1a" : "#f0f4f8";
  const surface = dark ? "#0f172a" : "#ffffff";
  const sidebar = dark ? "#0b1120" : "#f8fafc";
  const border = dark ? "#1e293b" : "#e9ecef";
  const txt = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#64748b" : "#94a3b8";

  return (
    <>
      <Head>
        <title>Akıllı Senaryo Akademi</title>
      </Head>
      <div style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: bg, minHeight: "100vh", color: txt }}>

        {/* TOP NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 200,
          background: dark ? "rgba(9,14,26,.96)" : "rgba(240,244,248,.96)",
          backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}`,
          display: "flex", alignItems: "center", padding: "0 18px", gap: 14
        }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "transparent", border: "none", cursor: "pointer", color: muted, padding: 6, borderRadius: 8 }}>
            <IconMenu />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, fontSize: 16,
              background: `linear-gradient(135deg, ${subject.color}, ${subject.color}99)`,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>{subject.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.3px", background: `linear-gradient(90deg, ${subject.color}, ${dark ? "#fff" : "#333"})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Akıllı Senaryo Akademi
              </div>
              <div style={{ fontSize: 10, color: muted, marginTop: -1 }}>AI destekli lise sınav hazırlık</div>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ fontSize: 11, padding: "4px 12px", background: "#10b98115", border: "1px solid #10b98133", borderRadius: 8, color: "#10b981", fontWeight: 700 }}>
            🧬 11. Sınıf Fen Lisesi
          </div>

          <button onClick={() => setDark(d => !d)} style={{
            background: dark ? "#1e293b" : "#e2e8f0", border: "none", cursor: "pointer",
            borderRadius: 8, padding: "7px 10px", color: txt, display: "flex", alignItems: "center"
          }}>
            {dark ? <IconSun /> : <IconMoon />}
          </button>
        </nav>

        <div style={{ display: "flex", paddingTop: 56 }}>
          {/* SIDEBAR */}
          {sidebarOpen && (
            <aside style={{
              width: 220, flexShrink: 0, background: sidebar, borderRight: `1px solid ${border}`,
              position: "fixed", top: 56, bottom: 0, overflowY: "auto", padding: "18px 10px", zIndex: 100
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: muted, marginBottom: 8, paddingLeft: 8 }}>
                Dersler
              </div>
              {SUBJECTS.map(s => (
                <button key={s.id} onClick={() => setActiveSubject(s.id)} style={{
                  width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 10,
                  border: "none", cursor: "pointer", marginBottom: 3,
                  display: "flex", alignItems: "center", gap: 10,
                  background: activeSubject === s.id ? s.color + "1a" : "transparent",
                  fontWeight: activeSubject === s.id ? 700 : 500,
                  fontSize: 13.5, color: activeSubject === s.id ? s.color : txt,
                  transition: "all .15s"
                }}>
                  <span style={{ fontSize: 17 }}>{s.icon}</span>
                  {s.label}
                  {activeSubject === s.id && (
                    <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: s.color }} />
                  )}
                </button>
              ))}

              <div style={{ height: 1, background: border, margin: "14px 4px" }} />

              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: muted, marginBottom: 8, paddingLeft: 8 }}>
                Biyoloji Konuları
              </div>
              {Object.keys(BIOLOGY_KB).map(k => (
                <div key={k} style={{ padding: "4px 12px", fontSize: 11, color: muted, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                  {k}
                </div>
              ))}
            </aside>
          )}

          {/* CONTENT */}
          <main style={{ flex: 1, marginLeft: sidebarOpen ? 220 : 0, padding: 24, minWidth: 0, transition: "margin .2s" }} className="content-area">
            {/* Subject header */}
            <div style={{
              background: `linear-gradient(135deg, ${subject.color}18, transparent)`,
              border: `1px solid ${subject.color}30`,
              borderRadius: 16, padding: "18px 22px", marginBottom: 22,
              display: "flex", alignItems: "center", gap: 14
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, fontSize: 26,
                background: `linear-gradient(135deg, ${subject.color}, ${subject.color}88)`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>{subject.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: subject.color }}>{subject.label}</div>
                <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>
                  Senaryo analizi • Konu anlatımı • Soru üretimi • Cevap anahtarı • Çalışma paketi
                </div>
              </div>
              {activeSubject === "biyoloji" && (
                <div style={{ marginLeft: "auto", padding: "6px 14px", background: "#10b98118", border: "1px solid #10b98130", borderRadius: 10, fontSize: 12, color: "#10b981", fontWeight: 700 }}>
                  📚 11. Sınıf Kitabı Yüklü
                </div>
              )}
            </div>

            {/* Panel */}
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 22 }}>
              <SubjectPanel key={activeSubject} subject={subject} dark={dark} />
            </div>

            <div style={{ textAlign: "center", marginTop: 20, color: muted, fontSize: 11 }}>
              Akıllı Senaryo Akademi • MEB Müfredatına Uygun • 11. Sınıf Fen Lisesi • AI Destekli
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
