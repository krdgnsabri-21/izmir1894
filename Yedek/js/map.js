// map.js - Leaflet Map Engine & Historical Georeferenced Overlay for Smyrne Vilayet (1894)
(function(window) {
  class MapEngine {
    constructor() {
      this.map = null;
      this.historicalLayer = null;
      this.markersLayer = null;
      this.markersMap = new Map(); // id -> L.marker
      this.activeMarkerId = null;
      this.currentOpacity = 0.85;
      this.isHistoricalVisible = true;
      this.onSelectCallback = null;

      // Georeference bounds from calibration
      this.bounds = [
        [36.0389, 25.3224], // South-West (approx. Rhodes / Aegean)
        [39.5228, 30.3516]  // North-East (approx. Balikesir / Usak / Denizli borders)
      ];
      this.center = [38.15, 27.70];
      this.defaultZoom = 8;
    }

    init(containerId, data) {
      if (data && data.georeference) {
        if (data.georeference.bounds) this.bounds = data.georeference.bounds;
        if (data.georeference.center) this.center = data.georeference.center;
        if (data.georeference.zoom) this.defaultZoom = data.georeference.zoom;
      }

      // Initialize Leaflet map
      this.map = L.map(containerId, {
        center: this.center,
        zoom: this.defaultZoom,
        minZoom: 6,
        maxZoom: 17,
        zoomControl: false // we add custom positioned zoom control
      });

      // Add Zoom control at top-left
      L.control.zoom({ position: 'topleft' }).addTo(this.map);

      // Setup 5 standard Basemap Tile Layers
      const cartoPositron = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }
      );

      const openStreetMap = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
          maxZoom: 19
        }
      );

      const cartoDark = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }
      );

      const esriSatellite = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and GIS User Community',
          maxZoom: 19
        }
      );

      const openTopoMap = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org" target="_blank">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a>',
          maxZoom: 17
        }
      );

      // Default active base layer: CartoDB Positron (cleanest for historical overlays)
      cartoPositron.addTo(this.map);

      // Create Historical 1894 Image Overlay
      const imageUrl = 'CUINET(1894)_3.348_Smyrne_Vilayet.jpg';
      this.historicalLayer = L.imageOverlay(imageUrl, this.bounds, {
        opacity: this.currentOpacity,
        interactive: false,
        alt: 'Vital Cuinet 1894 Smyrne Vilayet Haritası',
        crossOrigin: true
      }).addTo(this.map);

      // Create Markers Layer Group
      this.markersLayer = L.layerGroup().addTo(this.map);

      // Base layers object for Layer Switcher
      const baseMaps = {
        '<span class="layer-control-item"><i class="layer-icon positron"></i> CartoDB Positron (Açık/Önerilen)</span>': cartoPositron,
        '<span class="layer-control-item"><i class="layer-icon osm"></i> OpenStreetMap (Sokak)</span>': openStreetMap,
        '<span class="layer-control-item"><i class="layer-icon dark"></i> CartoDB Dark (Koyu)</span>': cartoDark,
        '<span class="layer-control-item"><i class="layer-icon esri"></i> Esri / Satellite (Modern Uydu)</span>': esriSatellite,
        '<span class="layer-control-item"><i class="layer-icon topo"></i> OpenTopoMap (Fiziki/Topo)</span>': openTopoMap
      };

      // Overlay layers object
      const overlays = {
        '<span class="layer-control-item overlay-label"><i class="layer-icon cuinet"></i> <strong>Vital Cuinet 1894 Haritası</strong></span>': this.historicalLayer,
        '<span class="layer-control-item overlay-label"><i class="layer-icon pins"></i> <strong>Tarihi Yer İmleri (60 Konum)</strong></span>': this.markersLayer
      };

      // Add Layer Control (L.control.layers)
      this.layersControl = L.control.layers(baseMaps, overlays, {
        position: 'topright',
        collapsed: true
      }).addTo(this.map);

      // Map scale
      L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(this.map);

      // Click on map clears selection
      this.map.on('click', (e) => {
        if (e.originalEvent._markerClicked) return;
        if (this.onSelectCallback) {
          this.onSelectCallback(null);
        }
      });

      return this;
    }

    setHistoricalOpacity(val) {
      this.currentOpacity = Math.max(0, Math.min(1, val));
      if (this.historicalLayer && this.isHistoricalVisible) {
        this.historicalLayer.setOpacity(this.currentOpacity);
      }
    }

    toggleHistoricalVisibility() {
      this.isHistoricalVisible = !this.isHistoricalVisible;
      if (this.historicalLayer) {
        if (this.isHistoricalVisible) {
          if (!this.map.hasLayer(this.historicalLayer)) {
            this.historicalLayer.addTo(this.map);
          }
          this.historicalLayer.setOpacity(this.currentOpacity);
        } else {
          this.historicalLayer.setOpacity(0);
        }
      }
      return this.isHistoricalVisible;
    }

    fitHistoricalBounds() {
      if (this.map && this.bounds) {
        this.map.fitBounds(this.bounds, { padding: [20, 20], maxZoom: 12 });
      }
    }

    flyTo(lat, lon, zoom = 12) {
      if (this.map) {
        this.map.flyTo([lat, lon], zoom, {
          duration: 1.2,
          easeLinearity: 0.25
        });
      }
    }

    renderMarkers(places, activeId, currentLang = 'tr') {
      this.markersLayer.clearLayers();
      this.markersMap.clear();

      places.forEach(place => {
        if (place.lat == null || place.lon == null) return;

        const isSpecial = place.sandjak === 'Special' || place.kind === 'other';
        const markerClass = `custom-pin pin-${place.kind || 'city'} ${place.id === activeId ? 'is-active' : ''} ${isSpecial ? 'pin-special' : ''}`;
        
        // Icon content
        let glyph = '📍';
        if (place.kind === 'city') glyph = '🏛️';
        else if (place.kind === 'town') glyph = '🏘️';
        else if (place.kind === 'ruin') glyph = '🏺';
        else if (place.kind === 'mountain') glyph = '⛰️';
        else if (place.kind === 'water') glyph = '🌊';
        else if (place.kind === 'other') glyph = '📜';

        const customIcon = L.divIcon({
          className: 'marker-container',
          html: `<div class="${markerClass}" data-id="${place.id}" title="${place.modern}">
                   <span class="pin-glyph">${glyph}</span>
                   <span class="pin-pulse"></span>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18]
        });

        const marker = L.marker([place.lat, place.lon], {
          icon: customIcon,
          riseOnHover: true,
          title: place.modern || place.fr
        });

        // Hover tooltip
        const tooltipHtml = `
          <div class="map-tooltip">
            <strong class="tooltip-title">${place.modern}</strong>
            <span class="tooltip-fr">${place.fr}</span>
            ${place.ota ? `<span class="tooltip-ota">${place.ota.latn} / ${place.ota.arab}</span>` : ''}
          </div>
        `;
        marker.bindTooltip(tooltipHtml, {
          direction: 'top',
          offset: [0, -12],
          className: 'custom-leaflet-tooltip',
          opacity: 0.95
        });

        // Click handler
        marker.on('click', (e) => {
          e.originalEvent._markerClicked = true;
          this.setActiveMarker(place.id);
          if (this.onSelectCallback) {
            this.onSelectCallback(place.id);
          }
        });

        marker.addTo(this.markersLayer);
        this.markersMap.set(place.id, marker);
      });

      if (activeId) {
        this.setActiveMarker(activeId);
      }
    }

    setActiveMarker(id) {
      if (this.activeMarkerId && this.markersMap.has(this.activeMarkerId)) {
        const prevMarker = this.markersMap.get(this.activeMarkerId);
        const el = prevMarker.getElement();
        if (el) {
          const pin = el.querySelector('.custom-pin');
          if (pin) pin.classList.remove('is-active');
        }
      }

      this.activeMarkerId = id;
      if (id && this.markersMap.has(id)) {
        const marker = this.markersMap.get(id);
        const el = marker.getElement();
        if (el) {
          const pin = el.querySelector('.custom-pin');
          if (pin) pin.classList.add('is-active');
        }
      }
    }

    onSelectPlace(callback) {
      this.onSelectCallback = callback;
    }
  }

  window.MapEngine = MapEngine;
})(window);
