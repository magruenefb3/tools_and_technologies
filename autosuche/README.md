# AutoScout24 iOS Automation

## 🚨 Problem: Siri Shortcut funktioniert nicht wie erwartet

Die AutoScout24 App ignoriert URL-Parameter und zeigt die letzte Suche an.

## ✅ Lösung: 3 funktionierende Alternativen

---

## **Option 1: Einfacher App-Starter (EMPFOHLEN für den Start)**

### Einrichtung:

1. **Öffne die Kurzbefehle-App**
2. Tippe auf **+** → "Neuer Kurzbefehl"
3. Füge diese Aktionen hinzu:
   - **"App öffnen"** → Wähle "AutoScout24"
   - **"Warten"** → 1 Sekunde
   - **"Text sprechen"** → "AutoScout ist geöffnet. Viel Erfolg!"

4. Benenne: **"Auto suchen"**
5. Aktiviere Siri: **"Hey Siri, Auto suchen"**

### Vorteil:
- ✅ Funktioniert sofort
- ✅ Keine Parameter-Probleme
- ✅ Du öffnest die App und deine gespeicherte Suche ist da

### Tipp:
**Speichere deine Suche in der AutoScout24 App:**
1. Öffne AutoScout24 App
2. Gib deine Suchkriterien ein (VW Golf, 5.000-15.000€, etc.)
3. Tippe auf **"Suche speichern"** oder **"Suchauftrag erstellen"**
4. Aktiviere **Push-Benachrichtigungen**

➡️ **Jetzt bekommst du automatisch Benachrichtigungen bei neuen Angeboten!**

---

## **Option 2: Browser Automation App (Fortgeschritten)**

### Voraussetzung:
- Installiere **"Browser Automation"** aus dem App Store

### Einrichtung:

1. Öffne **Browser Automation App**
2. Erstelle **"New Automation"**
3. Kopiere den Code aus `autoscout24_ios_automation.js`
4. Passe die Konfiguration an:

```javascript
const CONFIG = {
    make: "VW",
    model: "Golf",
    priceMin: 5000,
    priceMax: 15000,
    // ... weitere Einstellungen
};
```

5. Speichere und führe aus

### Vorteil:
- ✅ Vollautomatische Suche
- ✅ Keine manuelle Eingabe nötig
- ✅ Suchparameter in Code gespeichert

---

## **Option 3: Python-Script (Desktop/Server)**

### Voraussetzung:
- Python 3.x auf deinem Computer oder Server
- `requests` Library: `pip install requests`

### Verwendung:

```bash
cd autosuche/
python3 autoscout24_search.py
```

### Vorteil:
- ✅ Generiert die perfekte Such-URL
- ✅ Kann automatisiert laufen (z.B. täglich)
- ✅ Ergebnisse können per E-Mail/Telegram verschickt werden

---

## 📁 Dateien in diesem Ordner

| Datei | Beschreibung |
|-------|--------------|
| `auto-search-config.json` | Zentrale Konfiguration deiner Suchkriterien |
| `autoscout24_search.py` | Python-Script für Desktop/Server |
| `autoscout24_ios_automation.js` | JavaScript für Browser Automation App |
| `ios-shortcut-autoscout24.md` | Detaillierte Anleitung für iOS Shortcuts |
| `autoscout24-shortcut-url.txt` | Fertige Such-URL |
| `README.md` | Diese Anleitung |

---

## 🎯 Empfohlener Workflow

### **Für Einsteiger:**

1. **Nutze Option 1** (Einfacher Shortcut)
2. **Speichere deine Suche in der App**
3. **Aktiviere Push-Benachrichtigungen**
4. Fertig! 🎉

### **Für Fortgeschrittene:**

1. **Nutze Option 2** (Browser Automation)
2. **Oder Option 3** (Python-Script auf Server)
3. **Kombiniere mit Benachrichtigungen** (Telegram, E-Mail, etc.)

---

## 🔧 Anpassung der Suchkriterien

Bearbeite `auto-search-config.json`:

```json
{
  "search_criteria": {
    "make": "VW",              // ← Deine Marke
    "model": "Golf",           // ← Dein Modell
    "price_max": 15000,        // ← Max. Preis
    "price_min": 5000,         // ← Min. Preis
    "mileage_max": 100000,     // ← Max. Kilometer
    "year_min": 2018,          // ← Min. Baujahr
    // ... weitere Kriterien
  }
}
```

---

## ⚡ Quick Start

**3 Schritte zum Erfolg:**

1. **Shortcut erstellen** (Option 1)
2. **Suche in App speichern**
3. **"Hey Siri, Auto suchen"** sagen

Das war's! 🚀

---

## 🆘 Hilfe & Troubleshooting

### Problem: "App öffnet nicht"
**Lösung:** Stelle sicher, dass AutoScout24 App installiert ist

### Problem: "Siri findet Shortcut nicht"
**Lösung:** Gehe zu iPhone-Einstellungen → Siri & Suchen → Kurzbefehle aktivieren

### Problem: "Falsche Suche wird angezeigt"
**Lösung:** Speichere deine gewünschte Suche in der App neu

### Problem: "Browser Automation funktioniert nicht"
**Lösung:**
1. Prüfe, ob die App installiert ist
2. Erlaube Browser-Zugriff in den Einstellungen
3. Teste zuerst mit einfacherem Script

---

## 📱 Nächste Schritte

- [ ] Shortcut für **mobile.de** erstellen
- [ ] Shortcut für **Kleinanzeigen** erstellen
- [ ] Kombinierten Shortcut für alle 3 Apps erstellen
- [ ] Tägliche Automatisierung einrichten

---

## 💡 Tipps

1. **Nutze die Suchagenten-Funktion** in den Apps
2. **Aktiviere Push-Benachrichtigungen** für neue Angebote
3. **Prüfe täglich** oder lass dich benachrichtigen
4. **Sei schnell** bei guten Angeboten!

---

**Viel Erfolg bei der Autosuche! 🚗💨**
