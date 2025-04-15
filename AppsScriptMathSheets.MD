# Spezielle Funktionen in Apps Script

## eingebaute Objekte

Date

## Math

Methoden: Math
Aufrunden: Math.ceil (a);
Abrunden: Math.floor (a);

Integer von 0 bis 9 generieren:
Math.floor(Math.randon()*10);

## Objekt in String konvertieren

Objekte können voneinandere entkoppelt werden. Dies geht, indem ein Objekt erst in einen String umgewandelt wird und anschließend aus dem String ein neue Objekt erzeugt wird.

```JavaScript
 const meinObjekt = {
    'vorname' : 'Heinz',
    'nachname' : 'Müller'
  }
  const meinString = JSON.stringify(meinObjekt);
  Logger.log(meinObjekt.vorname);
  Logger.log(meinString);
  const meinObjekt2 = JSON.parse(meinString);
  meinObjekt2.vorname = 'Samuel';
  Logger.log(meinObjekt2);
  Logger.log(meinObjekt1);
 ```

## Sheets

Es gibt unzählige Funktionen in Sheets, mit denen Elemente eines Spreadsheets angesprochen und modifiziert werden können. Hier nur eine kleine Auswahl


### Arbeiten mit Sheets, Daten holen und ausgeben

Voraussetzung: Das Apps Script muss an ein Spreadsheet gebunden sein. 
SpreadheetApp // Hauptklasse zur Verwendung des Sheets-Dienstes

```JavaScript
function aktivesSheet (){
    const spsh = SpreadsheetApp.getActiveSpreadsheet();
    const sh = spsh.getActiveSheet();
    const daten = sh.getDataRange(); // Daten holen
    const werte = daten.getValues();// Werte der Daten holen

    werte.forEach((w)=>{
        Logger.log(w) // w ist ein Array
        Logger.log(w[2]) // holt nur den dritten Wert aus dem Array
    })
    Logger.log(sheet.Name);
}
```

### Sheet(s) auswählen und Namen der Sheets ändern

Hier wird ein Sheet über eine URL angesprochen.  Nicht gebunden!

```JavaScript
// öffnen über eine URL
function oeffneSheetUeberURL(){
    const url = 'https://docs.google.com/.../'; // hier URL einfügen
    const spsh = SpreadsheetApp.openByUrl(url);
    //const sh = spsh.getSheets()[1]; // aus dem Array ein Sheet heraussuchen
    const sh = spsh.getSheetByName('Daten');
    //sh.setName('Neuer Name'); 
    if(sh != null){ // Falls es das Sheet gibt (not null)...
        Logger.log(sh.getIndex());
    }else{  // falls das Sheet nicht existiert ...
        Logger.log(sh);
    }
}
 
// öffnen über die ID des Sheets 
function oeffneSheetUeberID() {
    const id = '1rrORyEVHbvl_8I44q-_iIpO2SuY79qBKo66NEfKwg24';
    const spsh = SpreadsheetApp.openById(id);
    const shs =  spsh.getSheets();
    shs.forEach((sh,index)=>{ // implizite Funktion
        Logger.log(sh.getName());
        sh.setName('Neuer Name '+index); // Umbenennen der Sheets
    })
    Logger.log(shs);
}
 ```

### Neue Sheets erzeugen mit insertSheet()

```JavaScript
function neuesSheetErzeugen() {
    let url = 'https://URL' // URL
    const spsh = SpreadsheetApp.openByURL(url);
    const shs = spsh.getSheets(); // alle Sheets des Spreadsheets
    Logger.log(shs);
    const neuerName = 'Neues Sheet';
    
    // falls es das so noch nicht gibt, dann anlegen
    // also Test auf null
    let sh = spsh.getSheetByName(neuerName);
    
    if(sh != null){
        Logger.log('Existiert leider schon!);
    } else{
        sh = spsh.insertSheet(); // Achtung! Das ist ungewöhnlich!
        sh.setName(neuerName)
    }
    Logger.log(sh.getIndex());
}
```
