# Smyrne Vilayet (1894) - Vital Cuinet · Georeferanslı Leaflet Harita Sistemi

Bu proje, Fransız coğrafyacı ve istatistikçi **Vital Cuinet** tarafından 1894 yılında yayımlanan (*La Turquie d'Asie: géographie administrative, statistique, descriptive et raisonnée de chaque province de l'Asie-Mineure*, Tome III, s. 348) **İzmir (Aydın) Vilayeti** haritasının modern coğrafi koordinat sistemine (WGS84 / Web Mercator) bindirilmiş, açık kaynaklı **Leaflet.js** harita motoruyla çalışan interaktif web uygulamasıdır.

---

## 🌟 Temel Özellikler

### 1. Modern Dünya Haritası Üzerine Bindirme (Leaflet.js)
Tarihi 1894 Cuinet haritası (3445 × 3045 piksel yüksek çözünürlük), matematiksel ve kartografik olarak kalibre edilmiş coğrafi sınırlar (`[36.0389°K, 25.3224°D]` ile `[39.5228°K, 30.3516°D]`) ile modern dünya koordinatlarına oturtulmuştur.

### 2. Katman Değiştirici (`L.control.layers`)
Kullanıcı sağ üstteki katman menüsünden tek tıkla 5 farklı modern harita altlığı arasında geçiş yapabilir:
- **CartoDB Positron:** Açık renkli, minimalist altlık (eski harita çizgilerini ve kıyı hatlarını en berrak gösteren önerilen stil).
- **OpenStreetMap:** Klasik modern sokak ve yerleşim haritası.
- **CartoDB Dark Matter:** Koyu tema kontrastı.
- **Esri World Imagery (Satellite):** Yüksek çözünürlüklü modern uydu fotoğrafları ile 1894 yerleşimlerinin ve kıyı değişimlerinin birebir kıyaslanması.
- **OpenTopoMap:** Eşyükselti eğrili fiziki ve topografik kabartı haritası (dağ silsileleri ve nehir vadileri için ideal).

### 3. Canlı Şeffaflık (Opacity) ve Karşılaştırma Araçları
Harita üzerinde sol üstte yer alan kayan saydamlık paneli:
- **Canlı Kaydırıcı:** %0 (sadece modern altlık/uydu) ile %100 (yalnızca 1894 tarihi harita) arasında pürüzsüz geçiş.
- **Göz Düğmesi (👁️):** Tek tıkla tarihi harita katmanını gizleyip açma.
- **Hızlı Önayarlar:** `%0 (Modern)`, `%50`, `%85 (Varsayılan)`, `%100 (Tarihi)` butonları.
- **Haritaya Odaklan:** Tek tıkla tüm vilayet sınırlarını ekrana sığdırma.

### 4. 3 Katmanlı Tarihi Toponimi (60 Önemli Konum)
Her yerleşim ve coğrafi unsur için 3 dilli kimlik kartı:
1. **Orijinal Fransızca Yazılışı:** Cuinet'nin 1894 haritası üzerinde kazınan şekli (örn. *SMYRNE*, *SAROUKHAN*, *AÏDIN*, *DENISLI*, *MOUGLA*, *MAKRI*).
2. **Osmanlı Türkçesi:** Arap harfli orijinal imla + Latin harfli transkripsiyonu (örn. *ازمير / İzmir*, *صاروخان / Saruhan*, *مكری / Megri*).
3. **Modern Türkçe Karşılığı:** Günümüzdeki adı ve idari durumu (örn. *İzmir*, *Manisa*, *Fethiye*).
- **Kapsam:** 5 Sancak (İzmir, Saruhan/Manisa, Aydın, Denizli, Menteşe/Muğla), tüm kaza merkezleri, antik kentler (Efes, Sardes, Tralleis, Milet, Priene, Pamukkale, Knidos), dağlar (Spil, Bozdağlar, Latmos, Honaz), akarsular (Gediz, Küçük Menderes, Büyük Menderes, Bafa Gölü) ve resmi vilayet lejantı/istatistiği.

### 5. Akıllı Arama & Filtreleme
- Türkçe harf duyarlılığını ortadan kaldıran harf katlama motoru (`ç/c`, `ğ/g`, `ı/i`, `ö/o`, `ş/s`, `ü/u`).
- Arap harfleriyle arama yapabilme desteği.
- Sancak bazında açılır menü filtresi.
- Tür bazında etiket hapları (Şehir, İlçe/Kaza, Antik Kent, Dağ, Su/Körfez, Diğer).

### 6. Üç Dilli Arayüz (TR / EN / FR)
Kullanıcı tek tıkla tüm arayüzü, etiket açıklamalarını, etimolojik ve istatistiki notları Türkçe, İngilizce veya Fransızca olarak görüntüleyebilir.

---

## 🚀 Yerel Olarak Çalıştırma

### Yöntem 1: Çift Tıklayarak Çalıştırma (Windows - Önerilen)
Klasör içindeki **`start-server.bat`** dosyasına çift tıklayın.
- Arka planda hafif yerel web sunucusu başlar (`http://localhost:8082`).
- Varsayılan tarayıcınızda harita otomatik açılır.

### Yöntem 2: Python ile Çalıştırma
```bash
python -m http.server 8082
```
Tarayıcınızda `http://localhost:8082` adresine gidin.

### Yöntem 3: Node.js ile Çalıştırma
```bash
npx serve -l 8082
```

---

## 🌐 Web Sitenizde veya GitHub Pages'ta Yayınlama

Proje tamamen bağımsız statik dosyalardan (HTML, CSS, JS, JPG) oluşur; hiçbir veritabanı veya karmaşık sunucu kurulumu gerektirmez.

1. **GitHub Pages:**
   - Dosyaları GitHub deponuzun ana dizinine veya `docs/` klasörüne yükleyin.
   - Depo Ayarları -> *Pages* sekmesinden yayına alın.
2. **Kendi Web Siteniz:**
   - `Smyrne_Vilayet` klasörünün içindeki tüm dosyaları FTP/cPanel üzerinden sitenizin bir alt dizinine (örn. `siteniz.com/haritalar/izmir1894/`) yükleyin.

---

## 📁 Proje Dosya Yapısı

```
Smyrne_Vilayet/
├── index.html                           # Ana Leaflet arayüzü
├── start-server.bat                     # Tek tıkla yerel sunucu başlatıcı (Port 8082)
├── start-server.ps1                     # Sıfır bağımlı PowerShell HTTP sunucusu
├── CUINET(1894)_3.348_Smyrne_Vilayet.jpg# Yüksek çözünürlüklü tarihi raster harita
├── css/
│   └── style.css                        # Tarihi parşömen teması ve responsive UI
├── js/
│   ├── app.js                           # UI koordinatörü, arama, filtre ve kart kontrolü
│   ├── map.js                           # Leaflet motoru, 5 altlık, bindirme & markerlar
│   ├── search.js                        # Harf katlamalı hızlı toponimi arama motoru
│   └── i18n.js                          # Türkçe, İngilizce ve Fransızca sözlük
├── data/
│   ├── labels.js                        # 60 konumlu toponimi veri kümesi (JS global)
│   └── labels.json                      # 60 konumlu toponimi veri kümesi (JSON formatı)
└── lib/
    ├── leaflet.js                       # Leaflet v1.9.4 harita motoru
    ├── leaflet.css                      # Leaflet stilleri
    └── images/                          # Leaflet varsayılan işaretçi grafikleri
```

---

## 📜 Tarihi ve Kaynak Bilgisi
- **Harita Başlığı:** *Vilayet de Smyrne (Aïdin) - 1894*
- **Müellif:** Vital Cuinet (*La Turquie d'Asie*, Tome III, s. 348, Ernest Leroux, Paris, 1894).
- **Vilayet İstatistiği (1894):** Nüfus: 1.396.477 kişi; Yüzölçümü: 53.000 km²; 5 Sancak, 39 Kaza, 44 Nahiye, 2.822 Köy.
- **Haritacı / Matbaa:** Imp. Monrocq, Paris.
