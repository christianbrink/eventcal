let calendar = {
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
		   color Attribut angegeben werden). Farbe "default" nicht loeschen!

		Die URL der Farben muss auch in 'calendar.css' angepasst werden!! */


		"colors" : { 
			"default": { 
				"background": "#ADD8E6", 
				"foreground": "#000" 
			},
			"blue" : { 
				"background": "#0f519f",
				"backgroundImage": "images/termine/blue_splotch.png", 
				"foreground": "#ffffff" 
			},
			"red" : { 
				"background": "#f4362c", 
				"backgroundImage": "images/termine/red_splotch.png",
				"foreground": "#ffffff" 
			},
			"green": { 
				"background": "#00FF00", 
				"backgroundImage": "images/termine/green_splotch.png",
				"foreground": "#000" 
			},
			"yellow": { 
				"background": "#fbec81", 
				"backgroundImage": "images/termine/yellow_splotch.png",
				"foreground": "#000" 
			}
		}
	},

	/* Event Liste 
	  (Gibt es mehrere Event mit demselben Datum mehrfach, wird im Kalender 
	  nur das Event das als letztes in der Liste steht angezeigt) 

	template:
"": { "title": "", "time": "", "color": "", "duration": "", "comment": ""},

	*/
	  
	"events" : {
/*              "04.09.17": { "title": "Themenzentriertes Malen",       "time": "19:00h", "color": "yellow",    "duration": "1h", "comment": ""},
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
             
/*                "29.11.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
                "06.12.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
                "13.12.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
                "20.12.18": { "title": "Kindermalgruppe",               "time": "16:30h", "color": "green",     "duration": "1h", "comment": ""},
*/
	}  	
};