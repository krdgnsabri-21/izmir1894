// app.js - Main Application Controller for Smyrne Vilayet (1894) with Leaflet Engine
(function() {
  let currentLang = "tr";
  let mapEngine = null;
  let searchIndex = null;
  let allLabels = [];
  let metaData = {};
  let selectedId = null;
  let selectedSandjak = "all";
  let selectedKind = "all";
  let searchDebounceTimer = null;
  let currentOpacityPercent = 85;

  function init() {
    initLangFromUrl();
    loadData().then(data => {
      metaData = data;
      allLabels = data.labels || [];
      searchIndex = new SearchIndex(allLabels);

      // Initialize Leaflet Map Engine
      mapEngine = new MapEngine();
      mapEngine.init("leaflet-view", data);
      mapEngine.onSelectPlace(handleSelect);

      setupUI();
      updateTranslations();
      renderKindPills();
      renderList();
      checkInitialSelection();
    }).catch(err => {
      console.error("Failed to load map data:", err);
      alert("Harita verileri yüklenirken bir sorun oluştu.");
    });
  }

  function initLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (lang && I18N.supportedLangs.includes(lang)) {
      currentLang = lang;
    } else {
      const stored = localStorage.getItem("smyrne_lang");
      if (stored && I18N.supportedLangs.includes(stored)) {
        currentLang = stored;
      }
    }
  }

  function setLanguage(lang) {
    if (!I18N.supportedLangs.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem("smyrne_lang", lang);
    updateUrl();
    updateTranslations();
    renderKindPills();
    renderList();
    if (selectedId) {
      renderDetailCard(selectedId);
    }
  }

  function loadData() {
    return new Promise((resolve, reject) => {
      if (window.SMYRNE_LABELS) {
        resolve(window.SMYRNE_LABELS);
        return;
      }
      fetch("data/labels.json")
        .then(res => {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(data => resolve(data))
        .catch(err => {
          console.warn("fetch failed, checking global labels fallback:", err);
          if (window.SMYRNE_LABELS) {
            resolve(window.SMYRNE_LABELS);
          } else {
            reject(err);
          }
        });
    });
  }

  function checkInitialSelection() {
    const params = new URLSearchParams(window.location.search);
    const sel = params.get("sel");
    if (sel && allLabels.some(l => l.id === sel)) {
      handleSelect(sel);
      const target = allLabels.find(l => l.id === sel);
      if (target && target.lat != null && target.lon != null) {
        mapEngine.flyTo(target.lat, target.lon, 11);
      }
    }
  }

  function updateUrl() {
    const params = new URLSearchParams();
    params.set("lang", currentLang);
    if (selectedId) {
      params.set("sel", selectedId);
    }
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.replaceState({}, "", newUrl);
  }

  function handleSelect(id) {
    selectedId = id;
    if (mapEngine) {
      mapEngine.setActiveMarker(id);
    }
    updateUrl();
    renderDetailCard(id);

    // Update active class in sidebar place list
    document.querySelectorAll(".place-item").forEach(item => {
      if (item.dataset.id === id) {
        item.classList.add("active");
        item.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        item.classList.remove("active");
      }
    });
  }

  function setupUI() {
    // Prevent map dragging when interacting with detail card
    const detailCardEl = document.getElementById("detail-card");
    if (detailCardEl) {
      L.DomEvent.disableClickPropagation(detailCardEl);
      L.DomEvent.disableScrollPropagation(detailCardEl);
    }

    // Prevent map dragging on floating controls
    const floatingControls = document.getElementById("floating-map-controls");
    if (floatingControls) {
      L.DomEvent.disableClickPropagation(floatingControls);
      L.DomEvent.disableScrollPropagation(floatingControls);
    }

    // Search input
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        renderList();
      }, 150);
    });

    // Clear search
    document.getElementById("btn-clear-search").addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      renderList();
    });

    // Sancak filter dropdown
    const sandjakSelect = document.getElementById("sandjak-select");
    sandjakSelect.addEventListener("change", (e) => {
      selectedSandjak = e.target.value;
      renderList();
    });

    // Opacity Slider control
    const opacitySlider = document.getElementById("opacity-slider");
    const opacityValue = document.getElementById("opacity-value");
    if (opacitySlider && opacityValue) {
      opacitySlider.value = currentOpacityPercent;
      opacityValue.textContent = `${currentOpacityPercent}%`;

      opacitySlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10);
        currentOpacityPercent = val;
        opacityValue.textContent = `${val}%`;
        mapEngine.setHistoricalOpacity(val / 100);
      });
    }

    // Quick Opacity Presets (0%, 50%, 85%, 100%)
    document.querySelectorAll(".opacity-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = parseInt(btn.dataset.val, 10);
        currentOpacityPercent = val;
        if (opacitySlider) opacitySlider.value = val;
        if (opacityValue) opacityValue.textContent = `${val}%`;
        mapEngine.setHistoricalOpacity(val / 100);
      });
    });

    // Toggle Historical visibility eye button
    const toggleHistoricalBtn = document.getElementById("btn-toggle-historical");
    if (toggleHistoricalBtn) {
      toggleHistoricalBtn.addEventListener("click", () => {
        const visible = mapEngine.toggleHistoricalVisibility();
        toggleHistoricalBtn.classList.toggle("is-hidden", !visible);
        if (visible) {
          if (opacitySlider) opacitySlider.value = currentOpacityPercent;
          if (opacityValue) opacityValue.textContent = `${currentOpacityPercent}%`;
        } else {
          if (opacityValue) opacityValue.textContent = "0%";
        }
      });
    }

    // Fit historical map bounds button
    const btnFitBounds = document.getElementById("btn-fit-bounds");
    if (btnFitBounds) {
      btnFitBounds.addEventListener("click", () => {
        mapEngine.fitHistoricalBounds();
      });
    }

    // Language switcher buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
      });
    });

    // About modal
    const aboutModal = document.getElementById("about-modal");
    document.getElementById("btn-about").addEventListener("click", () => {
      aboutModal.classList.add("is-open");
    });
    document.getElementById("btn-close-about").addEventListener("click", () => {
      aboutModal.classList.remove("is-open");
    });
    aboutModal.addEventListener("click", (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.remove("is-open");
      }
    });

    // Mobile sidebar drawer toggle
    const mobileToggle = document.getElementById("btn-mobile-sidebar");
    const sidebar = document.getElementById("app-sidebar");
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("is-open");
      });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        aboutModal.classList.remove("is-open");
        handleSelect(null);
      } else if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  function updateTranslations() {
    const dict = I18N.get(currentLang);

    // Document title
    document.title = `${dict.appName} · ${dict.tagline}`;

    // Header strings
    document.getElementById("app-title").textContent = dict.appName;
    document.getElementById("app-subtitle").textContent = dict.subTagline;
    document.getElementById("search-input").setAttribute("placeholder", dict.searchPlaceholder);

    // Language buttons active state
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });

    // UI Buttons tooltip titles
    const btnFit = document.getElementById("btn-fit-bounds");
    if (btnFit) btnFit.setAttribute("title", dict.fitHistorical);

    const btnEye = document.getElementById("btn-toggle-historical");
    if (btnEye) btnEye.setAttribute("title", dict.toggleHistorical);

    document.getElementById("btn-about").setAttribute("title", dict.about);

    // Opacity label
    const opLabel = document.getElementById("opacity-label");
    if (opLabel) opLabel.textContent = dict.opacity;

    // Sandjak filter options
    const sandjakSelect = document.getElementById("sandjak-select");
    sandjakSelect.innerHTML = `
      <option value="all">${dict.allSandjaks}</option>
      <option value="Smyrne">${dict.sandjaks["Smyrne"]}</option>
      <option value="Saroukhan">${dict.sandjaks["Saroukhan"]}</option>
      <option value="Aïdin">${dict.sandjaks["Aïdin"]}</option>
      <option value="Denisli">${dict.sandjaks["Denisli"]}</option>
      <option value="Mentéché">${dict.sandjaks["Mentéché"]}</option>
      <option value="Special">${dict.sandjaks["Special"]}</option>
    `;
    sandjakSelect.value = selectedSandjak;

    // About modal texts
    document.getElementById("about-title").textContent = dict.aboutTitle;
    const bodyEl = document.getElementById("about-body");
    bodyEl.innerHTML = dict.aboutBody.map(p => `<p>${p}</p>`).join("") +
      `<div class="about-stats-box">
        <h4>${dict.statsTitle}</h4>
        <ul>${dict.statsItems.map(item => `<li>${item}</li>`).join("")}</ul>
      </div>`;
  }

  function renderKindPills() {
    const dict = I18N.get(currentLang);
    const container = document.getElementById("kind-pills");
    const kinds = ["all", "city", "town", "ruin", "mountain", "water", "other"];

    container.innerHTML = kinds.map(k => {
      const label = k === "all" ? dict.allKinds : (dict.kinds[k] || k);
      const count = k === "all" 
        ? allLabels.length 
        : allLabels.filter(l => l.kind === k).length;

      const isActive = selectedKind === k ? "active" : "";
      return `<button class="kind-pill ${isActive}" data-kind="${k}">
        ${label} <span class="pill-count">${count}</span>
      </button>`;
    }).join("");

    container.querySelectorAll(".kind-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        selectedKind = pill.dataset.kind;
        container.querySelectorAll(".kind-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        renderList();
      });
    });
  }

  function renderList() {
    const dict = I18N.get(currentLang);
    const query = document.getElementById("search-input").value;
    const filtered = searchIndex.search(query, selectedKind, selectedSandjak);

    // Update count in header
    document.getElementById("results-count").textContent = dict.results(filtered.length, allLabels.length);

    // Re-render Leaflet Markers based on current filter
    if (mapEngine) {
      mapEngine.renderMarkers(filtered, selectedId, currentLang);
    }

    const listContainer = document.getElementById("places-list");
    if (filtered.length === 0) {
      listContainer.innerHTML = `<div class="empty-results">${dict.noResults}</div>`;
      return;
    }

    listContainer.innerHTML = filtered.map(l => {
      const isSelected = l.id === selectedId ? "active" : "";
      const kindName = dict.kinds[l.kind] || l.kind;
      const sandjakName = dict.sandjaks[l.sandjak] || l.sandjak;

      return `
        <div class="place-item ${isSelected}" data-id="${l.id}">
          <div class="place-item-header">
            <span class="place-fr">${l.fr}</span>
            <span class="place-badge kind-badge-${l.kind}">${kindName}</span>
          </div>
          <div class="place-ota">
            <span class="ota-latn">${l.ota ? l.ota.latn : ""}</span>
            <span class="ota-arab" dir="rtl">${l.ota ? l.ota.arab : ""}</span>
          </div>
          <div class="place-modern">${l.modern}</div>
        </div>
      `;
    }).join("");

    // Click handler for items
    listContainer.querySelectorAll(".place-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        handleSelect(id);
        const target = allLabels.find(l => l.id === id);
        if (target && target.lat != null && target.lon != null) {
          mapEngine.flyTo(target.lat, target.lon, 11);
        }
        // On mobile, close sidebar after selection
        if (window.innerWidth < 800) {
          const sidebar = document.getElementById("app-sidebar");
          if (sidebar) sidebar.classList.remove("is-open");
        }
      });
    });
  }

  function renderDetailCard(id) {
    const panel = document.getElementById("detail-card");
    if (!id) {
      panel.classList.remove("is-visible");
      return;
    }

    const label = allLabels.find(l => l.id === id);
    if (!label) return;

    const dict = I18N.get(currentLang);
    const kindName = dict.kinds[label.kind] || label.kind;
    const sandjakName = dict.sandjaks[label.sandjak] || label.sandjak;
    const litText = label.lit ? (label.lit[currentLang] || label.lit.tr || "") : "";
    const noteText = label.note ? (label.note[currentLang] || label.note.tr || "") : "";
    const coordsText = (label.lat && label.lon) ? `${label.lat.toFixed(4)}° N, ${label.lon.toFixed(4)}° E` : "—";

    panel.innerHTML = `
      <div class="card-close" id="btn-close-card" title="${dict.close}">&times;</div>
      <div class="card-header">
        <span class="card-badge kind-badge-${label.kind}">${kindName}</span>
        <span class="card-sandjak">${sandjakName}</span>
      </div>
      <h2 class="card-title-fr">${label.fr}</h2>
      
      <div class="card-tier-box">
        <div class="tier-label">${dict.rowOttoman}</div>
        <div class="tier-ota-content">
          <span class="card-ota-latn">${label.ota ? label.ota.latn : "—"}</span>
          <span class="card-ota-arab" dir="rtl">${label.ota ? label.ota.arab : ""}</span>
        </div>
      </div>

      <div class="card-tier-box">
        <div class="tier-label">${dict.rowModern}</div>
        <div class="card-modern-name">${label.modern}</div>
      </div>

      ${litText ? `
        <div class="card-section">
          <div class="card-section-label">${dict.etymology}</div>
          <div class="card-section-text">${litText}</div>
        </div>
      ` : ""}

      ${noteText ? `
        <div class="card-section">
          <div class="card-section-label">${dict.historicalNote}</div>
          <div class="card-section-text">${noteText}</div>
        </div>
      ` : ""}

      <div class="card-coords-box">
        <span class="coords-label">WGS84:</span>
        <span class="coords-val">${coordsText}</span>
      </div>

      <div class="card-actions">
        <button class="card-btn primary" id="card-fly-btn">
          <span>🔍</span> ${dict.flyToLocation}
        </button>
        <button class="card-btn secondary" id="card-share-btn">
          <span>🔗</span> ${dict.shareLocation}
        </button>
      </div>
    `;

    panel.classList.add("is-visible");

    // Close button
    document.getElementById("btn-close-card").addEventListener("click", () => {
      handleSelect(null);
    });

    // Fly button
    document.getElementById("card-fly-btn").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (label.lat != null && label.lon != null) {
        mapEngine.flyTo(label.lat, label.lon, 12);
      }
    });

    // Share button
    document.getElementById("card-share-btn").addEventListener("click", (e) => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        const btn = e.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>✓</span> ${dict.linkCopied}`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      });
    });
  }

  // Start on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
