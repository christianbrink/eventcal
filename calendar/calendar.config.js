let evCal_data = {

	"i18n": {
		"default" : {
			"event.start" : "Beginn",
			"event.duration" : "Dauer",
			"nav.start.title" : "Zum Anfang springen",
			"nav.end.title" : "Zum Anfang springen",
			"nav.forward.title" : "7 Tage vor",
			"nav.back.title" : "7 Tage zurück",
			"nav.hint" : "...oder einfach im Kalender Wischen oder Scrollen!",
			"months" : [ "Jan", "Feb", "M&auml;r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
			"days" : [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ]
		},
		"en" : {
			"event.start" : "Start",
			"event.duration" : "Duration",
			"nav.start.title" : "Jump to start",
			"nav.end.title" : "Jump to end",
			"nav.forward.title" : "7 days forward",
			"nav.back.title" : "7 days back",
			"nav.hint" : "...or simply swipe or scroll the calendar!",
			"months" : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			"days" : [ "So", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
		}
	},

	"settings": {	
		
		/* Breite des Containers der Kalender beinhaltet */
		"containerWidth": "100%", 
		
		/* Tage zurueck */
		"daysPast": 4,
		
		/* Tage vor */
		"daysFuture": 200,

		/* Anzahl von Tagen, um die per Klick gescrollt werden soll */
		"scrollPerClick": 7,

		/* Rahmendicke der Eventzellen (in px) */
		"borderWidth": 1,

		/* Option um den Scrollbar des Containers beim Laden zu positionieren 
		   (Bei "auto" wird Scrollbar mittig positioniert. Sinnvoll, wenn daysPast = daysFuture) */
		"scrollTo": "1",
		 
		/* Farben (koennen frei erweitert und in Events via 
		   color Attribut angegeben werden). Farbe "default" nicht loeschen! */

		"colors" : { 
			"default": { 
				"background": "#ADD8E6", 
				"foreground": "#000" 
			},
			"blue" : { 
				"background": "#0f519f",
				"backgroundImage": "calendar/images/blue_splotch.png",
				"foreground": "#ffffff" 
			},
			"red" : { 
				"background": "#f4362c", 
				"backgroundImage": "calendar/images/red_splotch.png",
				"foreground": "#ffffff" 
			},
			"green": { 
				"background": "#00FF00", 
				"backgroundImage": "calendar/images/green_splotch.png",
				"foreground": "#000" 
			},
			"yellow": { 
				"background": "#fbec81", 
				"backgroundImage": "calendar/images/yellow_splotch.png",
				"foreground": "#000" 
			}
		}
	},

	/*
		Event Liste
	  	(Gibt es mehrere Event mit demselben Datum mehrfach, wird im Kalender nur das letzte Event angezeigt.)

		template:
		"": { "title": "", "time": "", "color": "", "duration": "", "comment": ""},
	*/
	  
	"events" : {
/*
				"04.09.17": { "title": "Themenzentriertes Malen",       "time": "19:00h", "color": "yellow",    "duration": "1h", "comment": ""},
                "02.10.17": { "title": "Themenzentriertes Malen",       "time": "19:00h", "color": "yellow",    "duration": "1h", "comment": ""},
                "06.11.17": { "title": "Themenzentriertes Malen",       "time": "19:00h", "color": "yellow",    "duration": "1h", "comment": ""},
                "04.12.17": { "title": "Themenzentriertes Malen",       "time": "19:00h", "color": "yellow",    "duration": "1h", "comment": ""},
*/
                "11.01.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "25.01.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "08.02.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "22.02.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "07.03.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "21.03.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "25.04.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "09.05.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "23.05.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "13.06.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "27.06.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "25.07.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "08.08.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "22.08.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "12.09.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "26.09.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "10.10.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "24.10.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "07.11.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "21.11.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "05.12.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},
                "19.12.20": { "title": "Offenes Atelier",               "time": "10:00h", "color": "red",       "duration": "3h", "comment": ""},

                "20.12.19": { "title": "Ausdrucksmalen",        "time": "19:30h", "color": "blue",      "duration": "1,5h", "comment": "Freitagsgruppe"},

                "14.03.20": { "title": "Weiterbildung Malbegleiter•in",        "time": "10:00h", "color": "yellow",      "duration": "7h", "comment": "1h Mittagspause"},
                "15.03.20": { "title": "Weiterbildung Malbegleiter•in",        "time": "10:00h", "color": "yellow",      "duration": "5h", "comment": "1h Mittagspause"},
                "18.04.20": { "title": "Weiterbildung Malbegleiter•in",        "time": "10:00h", "color": "yellow",      "duration": "7h", "comment": "1h Mittagspause"},
                "19.04.20": { "title": "Weiterbildung Malbegleiter•in",        "time": "10:00h", "color": "yellow",      "duration": "5h", "comment": "1h Mittagspause"},
                "16.05.20": { "title": "Weiterbildung Malbegleiter•in",        "time": "10:00h", "color": "yellow",      "duration": "7h", "comment": "1h Mittagspause"},
                "17.05.20": { "title": "Weiterbildung Malbegleiter•in",        "time": "10:00h", "color": "yellow",      "duration": "5h", "comment": "1h Mittagspause"},
             
/*
				"29.11.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
                "06.12.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
                "13.12.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
                "20.12.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
*/
	}  	
};