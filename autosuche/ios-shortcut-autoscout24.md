# iOS Automation für AutoScout24

## Variante 1: Apple Shortcut (App-Start)

### So richtest du es ein:

1. Öffne die **Kurzbefehle-App** auf deinem iPhone
2. Tippe auf **+** (Neuer Kurzbefehl)
3. Füge folgende Aktionen hinzu:

**Aktionen:**
```
1. "App öffnen" → Wähle "AutoScout24"
2. "Warten" → 2 Sekunden
3. (Optional) "Benachrichtigung anzeigen" → "AutoScout24 geöffnet - Viel Erfolg bei der Suche!"
```

4. Benenne den Kurzbefehl: **"Auto suchen AS24"**
5. Füge ein Icon hinzu (optional)

### Siri aktivieren:
- Sage: *"Hey Siri, Auto suchen AS24"*

---

## Variante 2: Apple Shortcut mit Web-URL (mit Suchparametern)

### Setup:

1. Öffne die **Kurzbefehle-App**
2. Tippe auf **+** (Neuer Kurzbefehl)
3. Füge folgende Aktionen hinzu:

**Aktionen:**
```
1. "URL öffnen"
   URL: https://www.autoscout24.de/lst?
        make=79&           (VW = 79)
        model=12920&       (Golf = 12920)
        pricefrom=5000&
        priceto=15000&
        kmfrom=0&
        kmto=100000&
        fregfrom=2018&
        fregto=2024&
        fuel=B,D,3&        (Benzin, Diesel, Hybrid)
        gear=A,M&          (Automatik, Schaltung)
        ustate=N,U         (Neu, Gebraucht)

2. (Optional) "Safari öffnen" falls der Link nicht automatisch öffnet
```

4. Benenne: **"Auto suchen AS24 Web"**

**Hinweis:** Diese URL öffnet die Website, nicht die App. Die AutoScout24 App fragt dann oft, ob du die App öffnen möchtest.

---

## Variante 3: Browser Automation App (Erweitert)

Falls du die **Browser Automation App** installiert hast:

### JavaScript Automation Script:

```javascript
// AutoScout24 Automation
const config = {
  make: "VW",
  model: "Golf",
  priceMin: 5000,
  priceMax: 15000,
  mileageMax: 100000,
  yearMin: 2018
};

// Öffne AutoScout24
window.location.href = "https://www.autoscout24.de/lst";

// Warte bis Seite geladen
setTimeout(() => {
  // Fülle Suchformular aus
  document.querySelector('[name="make"]').value = config.make;
  document.querySelector('[name="model"]').value = config.model;
  document.querySelector('[name="pricefrom"]').value = config.priceMin;
  document.querySelector('[name="priceto"]').value = config.priceMax;

  // Starte Suche
  document.querySelector('button[type="submit"]').click();
}, 3000);
```

---

## Variante 4: App Deep Link Tester (Experimentell)

Versuche diese URL Schemes in Safari:

```
autoscout24://
autoscout24://search
autoscout24://search?make=vw&model=golf
as24://
```

**So testest du:**
1. Öffne Safari
2. Gib eine URL ein (z.B. `autoscout24://`)
3. Wenn die App öffnet, kannst du Parameter hinzufügen

---

## Automatisierung mit Zeitplan

### Tägliche Erinnerung:

1. Öffne **Kurzbefehle-App**
2. Gehe zu **Automation** (unten)
3. Tippe auf **+** → **Persönliche Automation erstellen**
4. Wähle **Tageszeit**
5. Stelle Zeit ein (z.B. 8:00 Uhr)
6. Füge Aktion hinzu: **"Kurzbefehl ausführen"** → Wähle deinen Shortcut
7. Deaktiviere **"Vor dem Ausführen fragen"**

---

## Empfehlung:

**Start mit Variante 1 oder 2:**
- Einfach einzurichten
- Funktioniert sofort
- Kann mit Siri gesteuert werden

**Für Fortgeschrittene:**
- Variante 3 mit Browser Automation App
- Variante 4 zum Testen der Deep Links

---

## Suchparameter-Referenz für AutoScout24 Web-URL:

| Parameter | Beschreibung | Beispiel |
|-----------|--------------|----------|
| `make` | Hersteller-ID | `79` (VW) |
| `model` | Modell-ID | `12920` (Golf) |
| `pricefrom` | Preis von | `5000` |
| `priceto` | Preis bis | `15000` |
| `kmfrom` | Km von | `0` |
| `kmto` | Km bis | `100000` |
| `fregfrom` | Erstzulassung von | `2018` |
| `fregto` | Erstzulassung bis | `2024` |
| `fuel` | Kraftstoff | `B,D,3` (Benzin, Diesel, Hybrid) |
| `gear` | Getriebe | `A,M` (Auto, Manuell) |
| `zip` | PLZ | `10115` |
| `zipr` | Umkreis | `50` |

**Häufige Hersteller-IDs:**
- VW: 79
- BMW: 13
- Mercedes: 47
- Audi: 9
- Opel: 56

**Kraftstoff-Codes:**
- B = Benzin
- D = Diesel
- E = Elektro
- 3 = Hybrid
- L = LPG
- N = Erdgas
