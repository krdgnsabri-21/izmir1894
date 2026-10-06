// i18n.js - Multilingual Dictionary and Localization for Smyrne Vilayet 1894
(function(window) {
  const translations = {
    tr: {
      appName: "İzmir Vilayeti 1894 (Vital Cuinet)",
      tagline: "Vital Cuinet'nin 1894 Tarihli İzmir (Aydın) Vilayeti Haritası",
      subTagline: "5 Sancak, 39 Kaza ve antik kentler modern dünya haritası üzerinde georeferanslanmış ve 3 dilde açıklanmıştır",
      searchPlaceholder: "Yer adı, Osmanlıca veya Fransızca ara (örn. Efes, Bergama, Çeşme, Bodrum)...",
      allKinds: "Tüm Kategoriler",
      allSandjaks: "Tüm Sancaklar",
      sandjakFilterLabel: "Sancak Filtresi",
      kindFilterLabel: "Kategori Filtresi",
      opacityLabel: "1894 Harita Saydamlığı",
      toggleHistorical: "Eski Haritayı Göster / Gizle",
      showAllMarkers: "Tüm İşaretçileri Göster",
      hideMarkers: "İşaretçileri Gizle",
      zoomIn: "Yakınlaş",
      zoomOut: "Uzaklaş",
      home: "İlk Görünüm",
      fullscreen: "Tam Ekran",
      exitFullscreen: "Tam Ekrandan Çık",
      about: "Hakkında",
      results: (n, total) => `${n} / ${total} konum listeleniyor`,
      noResults: "Aramanıza uygun yer bulunamadı.",
      loading: "Harita yükleniyor...",
      loadFailed: "Harita verileri yüklenemedi.",
      rowFrench: "Haritadaki Orijinal İsim (Fransızca)",
      rowOttoman: "Osmanlıca İsim (Latin & Arap Harfli)",
      rowModern: "Günümüz Türkiye Karşılığı",
      etymology: "Etimoloji ve Anlam",
      historicalNote: "Tarihi ve Coğrafi Açıklama",
      uncertainReading: "Okunuş veya teşhis kesin değil (?)",
      flyToLocation: "Haritada Konuma Git",
      shareLocation: "Paylaşım Bağlantısını Kopyala",
      linkCopied: "Bağlantı panoya kopyalandı!",
      close: "Kapat",
      kinds: {
        city: "Vilayet / Sancak Merkezi",
        caza: "Kaza (İlçe) Merkezi",
        mountain: "Dağ / Zirve / Silsile",
        water: "Nehir / Göl / Körfez",
        ruin: "Antik Kent / Harabe",
        other: "Lejant / İstatistik Tablosu"
      },
      sandjaks: {
        "Smyrne": "İzmir Merkez Sancağı",
        "Saroukhan": "Saruhan (Manisa) Sancağı",
        "Aïdin": "Aydın Sancağı",
        "Denisli": "Denizli Sancağı",
        "Mentéché": "Menteşe (Muğla) Sancağı",
        "Special": "Özel Lejant & İstatistik"
      },
      layers: {
        positron: "CartoDB Positron (Açık Minimalist)",
        osm: "OpenStreetMap (Klasik)",
        dark: "CartoDB Dark Matter (Koyu)",
        satellite: "Esri Satellite (Modern Uydu)",
        topo: "OpenTopoMap (Fiziki / Eşyükselti)",
        historicalOverlay: "1894 Cuinet İzmir Haritası"
      },
      aboutTitle: "Vital Cuinet ve 1894 İzmir (Aydın) Vilayeti Haritası",
      aboutBody: [
        "Bu interaktif harita portalı, Fransız coğrafyacı Vital Cuinet (1833–1896) tarafından hazırlanan ve 1894 yılında Paris'te Ernest Leroux tarafından yayımlanan 'La Turquie d'Asie: géographie administrative, statistique, descriptive et raisonnée de chaque province de l'Asie-Mineure' adlı anıtsal eserin 3. cildinde (sayfa 348) yer alan 'Vilayet de Smyrne' haritasını temel alır.",
        "Haritanın hazırlandığı dönemde İzmir (resmi adıyla Aydın) Vilayeti; Sultan II. Abdülhamid devri mülki idare taksimatına göre 5 Sancak (İzmir Merkez, Saruhan/Manisa, Aydın, Denizli ve Menteşe/Muğla), 39 Kaza, 44 Nahiye ve 2822 Köyden oluşmakta olup 1.396.477 nüfusa ve 53.000 km² yüzölçümüne sahipti.",
        "Bu sistemde 1894 tarihli özgün taşbaskı harita, çağdaş WGS84 coğrafi koordinat sistemine georeferanslanarak Leaflet.js harita motoru üzerinde modern dünya altlıklarıyla (OpenStreetMap, CartoDB Positron, Dark Matter, Esri Uydu ve OpenTopoMap) birebir çakıştırılmıştır.",
        "Kullanıcılar sağ üstteki şeffaflık (opacity) kaydırıcısı ile 1894 haritasının geçirgenliğini %0 ile %100 arasında değiştirerek, Osmanlı devrindeki kıyı çizgileri, nehir yatakları (özellikle Gediz Nehri'nin 1886'da açılan yeni yatağı), eski tren hatları ve kaza sınırları ile günümüz uydu görüntülerini milimetrik olarak karşılaştırabilirler."
      ],
      statsTitle: "1894 Yılında İzmir (Aydın) Vilayeti İstatistiği",
      statsItems: [
        "Toplam Nüfus: 1.396.477 kişi",
        "Toplam Yüzölçümü: 53.000 km²",
        "İdari Bölünüş: 5 Sancak, 39 Kaza, 44 Nahiye, 2.822 Köy",
        "I. Sancak (Merkez İzmir): Smyrne, Pergame, Phocée, Ménemen, Tchesmé, Sivri-Hissar, Kouch-Adassi, Tireh, Baïndir, Eudémich, Ourla",
        "II. Sancak (Saruhan / Manisa): Manissa, Kirk-Aghadj, Ak-Hissar, Soma, Kassaba, Gheurdès, Démirdji, Salihli, Koula, Alachehr, Echmé",
        "III. Sancak (Aydın): Aïdin, Sévké, Tchina, Bozdoghan, Nazilli",
        "IV. Sancak (Denizli): Dénizli, Saraï-Keuï, Tchal, Davas, Bouladan, Kara-Aghadj",
        "V. Sancak (Menteşe / Muğla): Mougla, Bodroum, Milas, Marmaris, Keuïdjiès, Makri"
      ]
    },
    en: {
      appName: "Smyrne Vilayet 1894 (Vital Cuinet)",
      tagline: "Vital Cuinet's 1894 Map of the Smyrne (Aidin) Vilayet",
      subTagline: "5 Sandjaks, 39 Cazas, and ancient ruins georeferenced over modern basemaps and annotated in 3 languages",
      searchPlaceholder: "Search by place name, Ottoman or French (e.g. Ephesus, Pergamon, Chesme, Bodrum)...",
      allKinds: "All Categories",
      allSandjaks: "All Sandjaks",
      sandjakFilterLabel: "Filter by Sandjak",
      kindFilterLabel: "Filter by Category",
      opacityLabel: "1894 Map Opacity",
      toggleHistorical: "Show / Hide Historical Map",
      showAllMarkers: "Show All Markers",
      hideMarkers: "Hide Markers",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      home: "Reset View",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit Fullscreen",
      about: "About",
      results: (n, total) => `Showing ${n} of ${total} locations`,
      noResults: "No locations match your search.",
      loading: "Loading the map...",
      loadFailed: "Failed to load map data.",
      rowFrench: "Original French Name (as engraved)",
      rowOttoman: "Ottoman Turkish Name (Latin & Arabic script)",
      rowModern: "Modern Turkish Official Name",
      etymology: "Etymology & Meaning",
      historicalNote: "Historical & Geographical Note",
      uncertainReading: "Reading or modern identification uncertain (?)",
      flyToLocation: "Fly to Location on Map",
      shareLocation: "Copy Share Link",
      linkCopied: "Link copied to clipboard!",
      close: "Close",
      kinds: {
        city: "Vilayet / Sandjak Capital",
        caza: "Caza (District) Center",
        mountain: "Mountain / Peak / Range",
        water: "River / Lake / Gulf",
        ruin: "Ruins / Ancient City",
        other: "Legend / Statistics Table"
      },
      sandjaks: {
        "Smyrne": "Central Smyrne Sandjak",
        "Saroukhan": "Saroukhan (Manisa) Sandjak",
        "Aïdin": "Aidin Sandjak",
        "Denisli": "Denisli Sandjak",
        "Mentéché": "Mentéché (Mugla) Sandjak",
        "Special": "Special Legend & Statistics"
      },
      layers: {
        positron: "CartoDB Positron (Light Minimalist)",
        osm: "OpenStreetMap (Standard)",
        dark: "CartoDB Dark Matter (Dark)",
        satellite: "Esri Satellite (Modern Imagery)",
        topo: "OpenTopoMap (Topographic)",
        historicalOverlay: "1894 Cuinet Smyrne Map"
      },
      aboutTitle: "Vital Cuinet and the 1894 Smyrne (Aidin) Vilayet Map",
      aboutBody: [
        "This interactive georeferenced web portal is based on the 1894 map 'Vilayet de Smyrne' published in Tome III (p. 348) of 'La Turquie d'Asie: géographie administrative, statistique, descriptive et raisonnée de chaque province de l'Asie-Mineure' by renowned French geographer Vital Cuinet (1833–1896), published in Paris by Ernest Leroux.",
        "In 1894, the Vilayet of Smyrne (officially Aïdin) was one of the richest provinces of the Ottoman Empire, comprising 5 Sandjaks (Smyrne, Saroukhan, Aïdin, Denisli, Mentéché), 39 Cazas, 44 Nahies, and 2,822 Villages with a total population of 1,396,477.",
        "Using Leaflet.js, Cuinet's original lithograph has been accurately georeferenced to WGS84 coordinates and overlaid on modern world maps (OpenStreetMap, CartoDB Positron, Dark Matter, Esri Satellite, and OpenTopoMap).",
        "The opacity slider enables smooth cross-fading from 0% to 100%, allowing users to directly compare historical shorelines, the 1886 diversion of the Gediz River, early railway networks, and 19th-century administrative centers against modern high-resolution satellite imagery."
      ],
      statsTitle: "1894 Smyrne Vilayet Statistics",
      statsItems: [
        "Total Population: 1,396,477",
        "Total Area: 53,000 sq km",
        "Administrative Divisions: 5 Sandjaks, 39 Cazas, 44 Nahies, 2,822 Villages",
        "I. Sandjak (Smyrne): Smyrne, Pergame, Phocée, Ménemen, Tchesmé, Sivri-Hissar, Kouch-Adassi, Tireh, Baïndir, Eudémich, Ourla",
        "II. Sandjak (Saroukhan / Manisa): Manissa, Kirk-Aghadj, Ak-Hissar, Soma, Kassaba, Gheurdès, Démirdji, Salihli, Koula, Alachehr, Echmé",
        "III. Sandjak (Aïdin): Aïdin, Sévké, Tchina, Bozdoghan, Nazilli",
        "IV. Sandjak (Denisli): Dénizli, Saraï-Keuï, Tchal, Davas, Bouladan, Kara-Aghadj",
        "V. Sandjak (Mentéché / Muğla): Mougla, Bodroum, Milas, Marmaris, Keuïdjiès, Makri"
      ]
    },
    fr: {
      appName: "Vilayet de Smyrne 1894 (Vital Cuinet)",
      tagline: "Carte du Vilayet de Smyrne par Vital Cuinet (1894)",
      subTagline: "5 Sandjaks, 39 Cazas et cités antiques géoréférencés sur fond de carte moderne et annotés en 3 langues",
      searchPlaceholder: "Rechercher un toponyme, en ottoman ou français (ex. Éphèse, Pergame, Tchesmé, Bodroum)...",
      allKinds: "Toutes Catégories",
      allSandjaks: "Tous les Sandjaks",
      sandjakFilterLabel: "Filtrer par Sandjak",
      kindFilterLabel: "Filtrer par Catégorie",
      opacityLabel: "Opacité de la Carte 1894",
      toggleHistorical: "Afficher / Masquer la Carte Historique",
      showAllMarkers: "Afficher Tous les Repères",
      hideMarkers: "Masquer les Repères",
      zoomIn: "Zoomer",
      zoomOut: "Dézoomer",
      home: "Vue Initiale",
      fullscreen: "Plein Écran",
      exitFullscreen: "Quitter Plein Écran",
      about: "À Propos",
      results: (n, total) => `Affichage de ${n} sur ${total} lieux`,
      noResults: "Aucun lieu ne correspond à votre recherche.",
      loading: "Chargement de la carte...",
      loadFailed: "Échec du chargement des données.",
      rowFrench: "Nom Français Original (gravé)",
      rowOttoman: "Nom Turc Ottoman (lettres latines et arabes)",
      rowModern: "Équivalent Géographique Moderne (Turquie)",
      etymology: "Étymologie et Signification",
      historicalNote: "Notice Historique et Géographique",
      uncertainReading: "Lecture ou identification incertaine (?)",
      flyToLocation: "Centrer sur la Carte",
      shareLocation: "Copier le Lien",
      linkCopied: "Lien copié dans le presse-papiers !",
      close: "Fermer",
      kinds: {
        city: "Chef-lieu de Vilayet / Sandjak",
        caza: "Chef-lieu de Caza (District)",
        mountain: "Montagne / Pic / Chaîne",
        water: "Fleuve / Lac / Golfe",
        ruin: "Ruines / Cité Antique",
        other: "Légende / Tableau Statistique"
      },
      sandjaks: {
        "Smyrne": "Merkez-Sandjak de Smyrne",
        "Saroukhan": "Sandjak de Saroukhan (Manissa)",
        "Aïdin": "Sandjak d'Aïdin",
        "Denisli": "Sandjak de Denisli",
        "Mentéché": "Sandjak de Mentéché (Mougla)",
        "Special": "Légende & Statistique Spéciale"
      },
      layers: {
        positron: "CartoDB Positron (Clair Minimaliste)",
        osm: "OpenStreetMap (Standard)",
        dark: "CartoDB Dark Matter (Sombre)",
        satellite: "Esri Satellite (Imagerie Moderne)",
        topo: "OpenTopoMap (Topographique)",
        historicalOverlay: "Carte de Smyrne (Cuinet 1894)"
      },
      aboutTitle: "Vital Cuinet et la Carte du Vilayet de Smyrne (1894)",
      aboutBody: [
        "Ce portail cartographique interactif repose sur la carte gravée du 'Vilayet de Smyrne' publiée en 1894 dans le Tome III (page 348) de l'ouvrage monumental de Vital Cuinet 'La Turquie d'Asie: géographie administrative, statistique, descriptive et raisonnée de chaque province de l'Asie-Mineure' (Paris : Ernest Leroux).",
        "À cette époque, le Vilayet de Smyrne (officiellement Aïdin) constituait le joyau économique de l'Asie Mineure ottomane, comptant 5 Sandjaks (Smyrne, Saroukhan, Aïdin, Denisli, Mentéché), 39 Cazas, 44 Nahiès et 2822 Villages pour une population globale de 1 396 477 habitants.",
        "La carte lithographique a été calée avec précision sur les coordonnées WGS84 et superposée sur un moteur Leaflet.js permettant la comparaison instantanée avec les fonds cartographiques modernes.",
        "Le curseur d'opacité permet de doser la transparence de 0 à 100 % pour analyser l'évolution du littoral égéen, le tracé des chemins de fer pionniers et les cours d'eau historiques par rapport aux données satellitaires actuelles."
      ],
      statsTitle: "Statistiques du Vilayet de Smyrne en 1894",
      statsItems: [
        "Population Totale : 1 396 477 habitants",
        "Superficie Totale : 53 000 km²",
        "Division Administrative : 5 Sandjaks, 39 Cazas, 44 Nahiès, 2822 Villages",
        "I. Sandjak (Smyrne) : Smyrne, Pergame, Phocée, Ménemen, Tchesmé, Sivri-Hissar, Kouch-Adassi, Tireh, Baïndir, Eudémich, Ourla",
        "II. Sandjak (Saroukhan) : Manissa, Kirk-Aghadj, Ak-Hissar, Soma, Kassaba, Gheurdès, Démirdji, Salihli, Koula, Alachehr, Echmé",
        "III. Sandjak (Aïdin) : Aïdin, Sévké, Tchina, Bozdoghan, Nazilli",
        "IV. Sandjak (Denisli) : Dénizli, Saraï-Keuï, Tchal, Davas, Bouladan, Kara-Aghadj",
        "V. Sandjak (Mentéché) : Mougla, Bodroum, Milas, Marmaris, Keuïdjiès, Makri"
      ]
    }
  };

  const I18N = {
    supportedLangs: ["tr", "en", "fr"],
    t(lang, key) {
      const dict = translations[lang] || translations.tr;
      return dict[key] || (translations.tr && translations.tr[key]) || key;
    },
    getKind(lang, kind) {
      const dict = translations[lang] || translations.tr;
      return (dict.kinds && dict.kinds[kind]) || kind;
    },
    getSandjak(lang, sandjak) {
      const dict = translations[lang] || translations.tr;
      return (dict.sandjaks && dict.sandjaks[sandjak]) || sandjak;
    },
    getLayer(lang, layer) {
      const dict = translations[lang] || translations.tr;
      return (dict.layers && dict.layers[layer]) || layer;
    },
    get(lang) {
      return this.dict(lang);
    },
    dict(lang) {
      return translations[lang] || translations.tr;
    }
  };

  window.I18N = I18N;
})(typeof window !== "undefined" ? window : global);
