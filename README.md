
# Event Calendar (eventcal)

Einfaches, übersichtliches Kalender-Widget für Veranstaltungen. 

## Installationsanleitung

### TL;DR;

Am einfachsten lädst du dir das Projekt herunter oder klonst das Repository und schaust in die [index.html](https://github.com/christianbrink/eventcal/edit/master/index.html). Dann kannst nachvollziehen, wie es eingebunden wird. Die index.html läuft auch lokal, falls du das Widget in Action sehen möchstest.

### Voraussetzungen

Event Calendar erfordert [jQuery](https://jquery.com/), [jQuery UI](https://jqueryui.com/) und [Font Awesome](https://fontawesome.com/). 

Um jQuery verfügbar zu machen, bindest du am besten folgende Scripte im &lt;head&gt; deiner Website ein:

```
<!-- JQuery -->
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>

<!-- JQuery UI -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
```

Font Awesome solltest du im Verzeichnis deiner Website installieren (hier im Verzeichnis font-awesome).
Binde dann folgendes Stylesheet im &lt;head&gt; deiner Website ein:

```
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
```

Oder folge einfach der Installationsanleitung für [Font Awesome](https://fontawesome.com/). 
 

### Installation

Kopiere das Verzeichnis calendar in das Verzeichnis deiner Website und binde folgendes im &lt;head&gt; deiner Website ein:
```
<!-- Event Calendar stylesheet -->
<link rel="stylesheet" type="text/css" href="calendar/calendar.css" />

<!-- Event Calendar JavaScript -->
<script src="calendar/calendar.js"></script>

<!-- Event Calendar config and data -->
<script src="calendar/calendar.config.js"></script>
```

Füge dieses Elemen in den &lt;body&gt; deiner Website an den Ort ein, wo Event Calender erscheinen soll.
```
<div id="eventCalendar"></div>
```

Schließlich füge noch folgnden Code in den &lt;head&gt; deiner Website ein. Dies sollte hinter den jQuery Tags erscheinen:
```
<script>
    $(document).ready(() => {
        let evCal = new EventCalendar($, 'eventCalendar', 'de', evCal_data);
        evCal.init();
    });
</script>
```

'eventCalendar' ist die ID des div-Elementes, das du im &lt;body&gt; eingebunden hast, 'de' ist die Sprache, in der Event Calendar angezeigt werden soll. Du kannst auch 'en' benutzen. Verwendest du eine nicht vorhandene Sprache (z.B. 'fr'), wird Event Calendar auf Deutsch angezeigt.

## Konfiguration

Um Event Calendar nach deinen Anforderungen anzupassen, editiere die Datei 
```
calendar/calendar.config.js
```
Diese definiert ein JSON Objekt, das aus den drei Bereichen 'i18n', 'settings' und 'events' besteht.
Normalerweise musst du nichts an den ersten beiden Bereichen ändern. Füge einfach deine Events im Bereich 'events' hinzu, achte dabei aber auf die korrekte JSON Syntax. 
Ein Event hat das Schema

```
"DATUM": { "title": "TITEL", "time": "UHRZEIT", "color": "[default|blue|red|yellow|green]", "duration": "DAUER", "comment": "KOMMENTAR"}
```
also z.B.
```
"07.03.20": { "title": "Offenes Atelier", "time": "10:00h", "color": "red", "duration": "3h", "comment": "Bitte vorher anmelden!"}
```
Pflichtangaben sind DATUM, 'title', 'time' und 'color'. Weitere Farben kannst du im 'settings'-Bereich unter 'colors' definieren oder dort die vorhandenen Farben anpassen.

## Fehlerbehebung
Sollte Event Calendar trotz der o.a. Anleitung nicht erscheinen, schaue bitte in die Web-Console deines Browsers (normalerweise mit F12 bzw. Cmd+Opt+I). Dort solltest du hoffentlich hilfreiche Fehlermeldungen finden.

## Autor

* **Christian Brink** - *Design & Entwicklung* - [christianbrink](https://github.com/christianbrink)

Eine Liste aller Contributors gibt es [hier](https://github.com/christianbrink/eventcal/contributors).

## Lizenz

Das Projekt steht unter der MIT Lizenz - schau in die [LICENSE.md](LICENSE.md) Datei für Details.
