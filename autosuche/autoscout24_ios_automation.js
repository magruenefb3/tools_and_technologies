/**
 * AutoScout24 iOS Browser Automation Script
 * Für die "Browser Automation" App aus dem App Store
 *
 * Installation:
 * 1. Lade die "Browser Automation" App aus dem App Store
 * 2. Erstelle ein neues Automation-Script
 * 3. Kopiere diesen Code hinein
 * 4. Passe die Suchkriterien unten an
 */

// ========================================
// KONFIGURATION - Passe diese Werte an
// ========================================
const CONFIG = {
    make: "VW",
    model: "Golf",
    priceMin: 5000,
    priceMax: 15000,
    mileageMax: 100000,
    yearMin: 2018,
    fuelTypes: ["Benzin", "Diesel", "Hybrid"],  // Benzin, Diesel, Elektro, Hybrid
    transmissions: ["Automatik", "Schaltgetriebe"],  // Automatik, Schaltgetriebe
    postalCode: "",  // Deine PLZ hier eingeben
    radiusKm: 50
};

// ========================================
// HAUPTFUNKTION
// ========================================
async function searchAutoScout24() {
    console.log("🚀 Starte AutoScout24 Suche...");

    // Mapping für URL-Parameter
    const makeMap = {
        'VW': '79', 'Volkswagen': '79',
        'BMW': '13',
        'Mercedes': '47', 'Mercedes-Benz': '47',
        'Audi': '9',
        'Opel': '56',
        'Ford': '29',
        'Skoda': '68',
        'Seat': '67'
    };

    const modelMap = {
        'Golf': '12920',
        'Passat': '12921',
        'Polo': '12922',
        'Tiguan': '12923'
    };

    const fuelMap = {
        'Benzin': 'B',
        'Diesel': 'D',
        'Elektro': 'E',
        'Hybrid': '3'
    };

    const transmissionMap = {
        'Automatik': 'A',
        'Schaltgetriebe': 'M'
    };

    // Baue URL-Parameter
    const params = new URLSearchParams({
        sort: 'standard',
        desc: '0',
        ustate: 'N,U',
        size: '20',
        page: '1',
        cy: 'D',
        atype: 'C'
    });

    // Füge Suchkriterien hinzu
    if (makeMap[CONFIG.make]) {
        params.append('make', makeMap[CONFIG.make]);
    }

    if (modelMap[CONFIG.model]) {
        params.append('model', modelMap[CONFIG.model]);
    }

    if (CONFIG.priceMin) {
        params.append('pricefrom', CONFIG.priceMin);
    }

    if (CONFIG.priceMax) {
        params.append('priceto', CONFIG.priceMax);
    }

    params.append('kmfrom', '0');
    if (CONFIG.mileageMax) {
        params.append('kmto', CONFIG.mileageMax);
    }

    if (CONFIG.yearMin) {
        params.append('fregfrom', CONFIG.yearMin);
    }

    // Kraftstoff
    const fuelCodes = CONFIG.fuelTypes.map(f => fuelMap[f]).filter(Boolean);
    if (fuelCodes.length > 0) {
        params.append('fuel', fuelCodes.join(','));
    }

    // Getriebe
    const transCodes = CONFIG.transmissions.map(t => transmissionMap[t]).filter(Boolean);
    if (transCodes.length > 0) {
        params.append('gear', transCodes.join(','));
    }

    // Standort
    if (CONFIG.postalCode) {
        params.append('zip', CONFIG.postalCode);
        params.append('zipr', CONFIG.radiusKm);
    }

    // Erstelle finale URL
    const url = `https://www.autoscout24.de/lst?${params.toString()}`;

    console.log("🔗 URL:", url);
    console.log(`📱 Öffne Suche für ${CONFIG.make} ${CONFIG.model}...`);

    // Navigiere zur Suche
    window.location.href = url;

    // Warte auf Seitenladevorgang
    await sleep(3000);

    // Versuche App-Banner zu schließen (falls vorhanden)
    try {
        const closeButton = document.querySelector('.app-banner-close');
        if (closeButton) {
            closeButton.click();
            console.log("✅ App-Banner geschlossen");
        }
    } catch (e) {
        console.log("ℹ️ Kein App-Banner gefunden");
    }

    console.log("✅ Suche abgeschlossen!");
}

// Hilfsfunktion: Warten
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========================================
// ALTERNATIVE: Direkt zur App weiterleiten
// ========================================
async function openAutoScout24App() {
    console.log("📱 Versuche AutoScout24 App zu öffnen...");

    // Versuche verschiedene Deep Link URLs
    const deepLinks = [
        'autoscout24://',
        'autoscout24://search',
        'autoscout24://lst',
        'as24://'
    ];

    for (const link of deepLinks) {
        try {
            window.location.href = link;
            await sleep(1000);
            console.log(`✅ Versuch mit: ${link}`);
            return;
        } catch (e) {
            console.log(`❌ ${link} funktioniert nicht`);
        }
    }

    console.log("ℹ️ Keine Deep Links gefunden - öffne Website");
    await searchAutoScout24();
}

// ========================================
// MAIN EXECUTION
// ========================================
(async function main() {
    console.log("=".repeat(50));
    console.log("AutoScout24 iOS Automation");
    console.log("=".repeat(50));
    console.log(`🚗 Suche: ${CONFIG.make} ${CONFIG.model}`);
    console.log(`💰 Preis: ${CONFIG.priceMin}€ - ${CONFIG.priceMax}€`);
    console.log(`📏 KM: max. ${CONFIG.mileageMax} km`);
    console.log(`📅 Jahr: ab ${CONFIG.yearMin}`);
    console.log("=".repeat(50));

    // Starte Suche
    await searchAutoScout24();

    // Optional: Nach 5 Sekunden versuchen App zu öffnen
    // await sleep(5000);
    // await openAutoScout24App();
})();
