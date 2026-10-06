// search.js - High-speed diacritics-folding search engine for Smyrne 1894
(function(window) {
  function foldString(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "") // strip combining accents
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/İ/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/[âàáä]/g, "a")
      .replace(/[êèéë]/g, "e")
      .replace(/[îíï]/g, "i")
      .replace(/[ôòóö]/g, "o")
      .replace(/[ûùúü]/g, "u")
      .replace(/['’`\-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  class SearchIndex {
    constructor(labels) {
      this.labels = labels || [];
      this.records = this.labels.map(l => {
        const textParts = [
          l.fr || "",
          l.ota ? (l.ota.latn || "") : "",
          l.ota ? (l.ota.arab || "") : "",
          l.modern || "",
          l.kind || "",
          l.sandjak || "",
          l.lit ? ((l.lit.tr || "") + " " + (l.lit.en || "") + " " + (l.lit.fr || "")) : "",
          l.note ? ((l.note.tr || "") + " " + (l.note.en || "") + " " + (l.note.fr || "")) : ""
        ];
        return {
          id: l.id,
          label: l,
          foldedPrimary: foldString((l.fr || "") + " " + (l.ota ? l.ota.latn : "") + " " + (l.modern || "")),
          foldedAll: foldString(textParts.join(" ")),
          rawOtaArab: (l.ota && l.ota.arab) ? l.ota.arab : ""
        };
      });
    }

    search(query, selectedKind, selectedSandjak) {
      const q = foldString(query);
      const rawQ = (query || "").trim();

      return this.records.filter(rec => {
        // Sandjak filter
        if (selectedSandjak && selectedSandjak !== "all") {
          if (rec.label.sandjak !== selectedSandjak) return false;
        }

        // Kind filter
        if (selectedKind && selectedKind !== "all") {
          if (rec.label.kind !== selectedKind) return false;
        }

        if (!q && !rawQ) return true;

        // Check Arabic script match
        if (rawQ && rec.rawOtaArab && rec.rawOtaArab.includes(rawQ)) {
          return true;
        }

        if (!q) return true;

        // Substring / token matching
        const tokens = q.split(" ").filter(Boolean);
        return tokens.every(token => rec.foldedAll.includes(token));
      }).map(rec => rec.label);
    }
  }

  window.SearchIndex = SearchIndex;
  window.foldString = foldString;
})(typeof window !== "undefined" ? window : global);
