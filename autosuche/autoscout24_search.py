#!/usr/bin/env python3
"""
AutoScout24 Automation Script für iOS
Dieses Script durchsucht AutoScout24 basierend auf den Kriterien in auto-search-config.json
"""

import json
import requests
from urllib.parse import urlencode
import webbrowser
from datetime import datetime

def load_config():
    """Lädt die Suchkonfiguration"""
    with open('auto-search-config.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def build_autoscout24_url(config):
    """Erstellt die AutoScout24 Such-URL basierend auf der Konfiguration"""
    criteria = config['search_criteria']

    # Mapping für Kraftstofftypen
    fuel_map = {
        'Benzin': 'B',
        'Diesel': 'D',
        'Elektro': 'E',
        'Hybrid': '3',
        'LPG': 'L',
        'Erdgas': 'N'
    }

    # Mapping für Getriebe
    transmission_map = {
        'Automatik': 'A',
        'Schaltgetriebe': 'M'
    }

    # Hersteller-IDs (häufigste)
    make_map = {
        'VW': '79',
        'Volkswagen': '79',
        'BMW': '13',
        'Mercedes': '47',
        'Mercedes-Benz': '47',
        'Audi': '9',
        'Opel': '56',
        'Ford': '29',
        'Skoda': '68',
        'Seat': '67',
        'Renault': '60',
        'Peugeot': '55',
        'Citroen': '17'
    }

    # Modell-IDs für VW Golf (Beispiel)
    model_map = {
        'Golf': '12920',
        'Passat': '12921',
        'Polo': '12922',
        'Tiguan': '12923'
    }

    # Baue URL-Parameter
    params = {
        'sort': 'standard',
        'desc': '0',
        'ustate': 'N,U',  # Neu und Gebraucht
        'size': '20',
        'page': '1',
        'cy': 'D',  # Deutschland
        'atype': 'C',  # PKW
    }

    # Füge Hersteller hinzu
    if criteria['make'] in make_map:
        params['make'] = make_map[criteria['make']]

    # Füge Modell hinzu
    if criteria['model'] in model_map:
        params['model'] = model_map[criteria['model']]

    # Preis
    if criteria.get('price_min'):
        params['pricefrom'] = criteria['price_min']
    if criteria.get('price_max'):
        params['priceto'] = criteria['price_max']

    # Kilometerstand
    params['kmfrom'] = '0'
    if criteria.get('mileage_max'):
        params['kmto'] = criteria['mileage_max']

    # Baujahr
    if criteria.get('year_min'):
        params['fregfrom'] = criteria['year_min']

    # Kraftstoff
    fuel_codes = [fuel_map[f] for f in criteria.get('fuel_type', []) if f in fuel_map]
    if fuel_codes:
        params['fuel'] = ','.join(fuel_codes)

    # Getriebe
    trans_codes = [transmission_map[t] for t in criteria.get('transmission', []) if t in transmission_map]
    if trans_codes:
        params['gear'] = ','.join(trans_codes)

    # Standort
    location = criteria.get('location', {})
    if location.get('postal_code'):
        params['zip'] = location['postal_code']
    if location.get('radius_km'):
        params['zipr'] = location['radius_km']

    # Erstelle finale URL
    base_url = 'https://www.autoscout24.de/lst'
    query_string = urlencode(params, safe=',')

    return f"{base_url}?{query_string}"

def open_in_browser(url):
    """Öffnet die URL im Standard-Browser"""
    print(f"\n🔍 Öffne AutoScout24 Suche...")
    print(f"URL: {url}\n")
    webbrowser.open(url)

def generate_shortcut_url(url):
    """Generiert eine URL für iOS Shortcuts"""
    return url

def main():
    print("=" * 60)
    print("AutoScout24 iOS Automation")
    print("=" * 60)
    print(f"⏰ Zeitpunkt: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}\n")

    # Lade Konfiguration
    config = load_config()
    criteria = config['search_criteria']

    print("📋 Suchkriterien:")
    print(f"   Fahrzeug: {criteria['make']} {criteria['model']}")
    print(f"   Preis: {criteria['price_min']} € - {criteria['price_max']} €")
    print(f"   Kilometerstand: max. {criteria['mileage_max']} km")
    print(f"   Baujahr: ab {criteria['year_min']}")
    print(f"   Kraftstoff: {', '.join(criteria['fuel_type'])}")
    print(f"   Getriebe: {', '.join(criteria['transmission'])}")

    # Erstelle URL
    url = build_autoscout24_url(config)

    print(f"\n🔗 Generierte Such-URL:")
    print(f"   {url}\n")

    # Speichere URL für iOS Shortcut
    with open('autoscout24-shortcut-url.txt', 'w', encoding='utf-8') as f:
        f.write(url)

    print("✅ URL wurde in 'autoscout24-shortcut-url.txt' gespeichert")
    print("   → Diese URL kannst du in deinem iOS Shortcut verwenden\n")

    # Öffne Browser
    choice = input("Möchtest du die Suche jetzt im Browser öffnen? (j/n): ")
    if choice.lower() in ['j', 'ja', 'y', 'yes']:
        open_in_browser(url)
        print("\n✅ Browser wurde geöffnet!")

    print("\n" + "=" * 60)
    print("Fertig!")
    print("=" * 60)

if __name__ == "__main__":
    try:
        main()
    except FileNotFoundError:
        print("❌ Fehler: auto-search-config.json nicht gefunden!")
        print("   Stelle sicher, dass die Datei im gleichen Verzeichnis liegt.")
    except KeyError as e:
        print(f"❌ Fehler: Fehlender Parameter in Konfiguration: {e}")
    except Exception as e:
        print(f"❌ Fehler: {e}")
