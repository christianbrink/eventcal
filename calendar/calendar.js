$(document).ready(function() {

	$("div#scrollContainer").attr("class", "border-full");
	$("div#scrollContainer").css("width",
			calendar.settings.containerWidth);

	let eventRow = $("table#calendar tr[class=event-row]");
	let monthRow = $("table#calendar tr[class=month-row]");

	let now = new Date().getTime();

	let daysPast = calendar.settings.daysPast;
	let daysFuture = calendar.settings.daysFuture;
	let scrollPerClick = calendar.settings.scrollPerClick;
	let borderWidth = calendar.settings.borderWidth;

	let todayCellId;

	let month = -1;
	let year = -1;
	let colSpan = 1;

	for (let i = -daysPast; i < daysFuture; i++) {

		let time = now + i * (24 * 60 * 60 * 1000);
		let date = new Date();
		date.setTime(time);
		
		let lastDay = i+1 == daysFuture //letzter Schleifendurchlauf

		if (month == -1) {
			month = date.getMonth(); 
			year = date.getFullYear(); 
		}
		else {
			if (date.getMonth() != month || lastDay) { //neuer Monat oder letzter Schleifendurchlauf
				monthRow.append("<td class='month-cell border-right' colspan='"+
					(lastDay ? (colSpan + 1) : colSpan) + "'>" +
					"<span>" + getMonthName(month) + " " + year + "</span></td>");

				month = date.getMonth();
				year = date.getFullYear();
				colSpan = 1;
			}
			else colSpan++;
		}

		let dateStruct = toDateStructure(date);
		let eventCellContent = "<span>"+getDayName(dateStruct.dayOfWeek)+"</span><span>"+dateStruct.dayOfMonth+"</span>";

		let cellId = 'event_' + (i + daysPast);
		eventRow.append('<td id="' + cellId
				+ '" class="event-cell border-right '
				+ (i == 0 ? 'today' : '') + ( date.getDay() == 0 ? 'sunday' : '') +'">' + eventCellContent
				+ '</td>');
		let eventCell = $("td#" + cellId);
		eventCell.addClass("event-cell border-right");

		if (i == 0) {
			todayCellId = cellId;
			eventCell.addClass("today");
		}
		let evtData = calendar.events[dateStruct.eventId];

		if (evtData) {

			let eventColor = evtData.color ?
				calendar.settings.colors[evtData.color] :
				calendar.settings.colors["default"];

			eventCell.css("color", eventColor.foreground);

			if (eventColor.backgroundImage) {
				eventCell.css("background-image","url('" + eventColor.backgroundImage + "')");
			}
			else eventCell.css("background-color", eventColor.background);


			eventCell.attr("title",
				evtData.title + " | " + "Beginn: " + evtData.time
				+ (evtData.duration ? (" | Dauer: " + evtData.duration) : "")
				+ (evtData.comment ? (" | " + evtData.comment) : ""));
		}
	}

	$(this).tooltip({
		content : function(callback) {
			callback($(this).prop('title').replace(/\|/g, '<br />'));
		}
	});

	let tableWidth = $("#calendar")[0].clientWidth;
	let containerWidth = $("#calContainer").width();
	let cellWidth = $("td#" + todayCellId).width();

	if (calendar.settings.scrollTo == "auto")
		$("#calContainer").scrollLeft((tableWidth - containerWidth + cellWidth) / 2 - 4.5);
	else
		$("#calContainer").scrollLeft(calendar.settings.scrollTo);

	let x = 0;
	let left = 0;

	$("#calBtnStart").on({
		click: function() {
			/* Ganz nach links scrollen (Scrollposition = 0) */
			$("#calContainer").scrollLeft(0);
		}
	});

	$("#calBtnRight").on({
		click: function() {
			/* aktuelle Scrollposition abfragen */
			left = $("#calContainer").scrollLeft();

			/* scrollPerClick Tage nach rechts scrollen */
			$("#calContainer").scrollLeft(left + scrollPerClick * (cellWidth + borderWidth));
		}
	});

	$("#calBtnLeft").on({
		click: function() {
			/* aktuelle Scrollposition abfragen */
			left = $("#calContainer").scrollLeft();

			/* scrollPerClick Tage nach links scrollen */
			$("#calContainer").scrollLeft(left - scrollPerClick * (cellWidth + borderWidth));
		}
	});

	$("#calBtnEnd").on({
		click: function() {
			/* Anzahl der Tage (= Zellen) im Kalender bestimmen */
			let dayCount = daysPast + daysFuture;

			/* Ganz nach rechts scrollen */
			$("#calContainer").scrollLeft(dayCount * (cellWidth + borderWidth) - containerWidth);
		}
	});

	$("#calContainer").on({
		mousemove: function(e) {
			if (e.buttons == 1) {

				if (x == 0) {
					x = e.pageX;
			        left = $(this).scrollLeft();
				}

				let newX = e.pageX;
				$(this).scrollLeft(left - newX + x);
	    	}
		},
		mousedown: function(e) {
				e.preventDefault();
				x = e.pageX;
				left = $(this).scrollLeft();
		},
		mouseup: function() {
				x = 0;
		},
		mouseout: function() {
				x = 0;
		},
		scroll: function() {

			let calContainer = $(this);

			/* Abstand des scrollContainers zum linken Rand */
			let scrollContainerOffset = $("div#scrollContainer").offset().left;

			/* Summe der Breiten der Zellen die den sichtbaren Bereich komplett verlassen haben */
			let invisibleCellWidths = 0;

			$("table#calendar tr[class=month-row] td span").each(function() {
				/* das sichtbar zu haltende Element */
				let span = $(this);

				/* dessen Breite */
				let spanWidth = span.width();

				/* Breite der Zelle des Elementes */
				let cellWidth = span.parent().width();

				/* Abstand Zelle zum linken Rand des scrollContainers (wird < 0 sobald die Zelle den sichtbaren Bereich verlaesst) */
				let cellOffset = span.parent().offset().left - scrollContainerOffset;

				/* Zelle hat den sichtbaren Bereich komplett verlassen, also ihre Breite auf die Breite aller unsichtbaren Zellen addieren */
				if (cellOffset + cellWidth <= 0) {
					invisibleCellWidths += cellWidth;
				}
				/* Ansonsten ist die Zelle noch ganz oder teilweise sichtbar */
				else {
					/* Zelle ist nur noch teilweise sichtbar */
					if (cellOffset < 0) {

						/* Pruefen, ob in sichtbarem Teil der Zelle noch genug Platz ist,
						 * ob Element weiter zu verschieben (min Abstand zum rechten Rand: 20) */
						if ((cellWidth + cellOffset - spanWidth - 20) > 0) {

							/* Verschoben wird durch das Setzen des linken Margins des Elements auf die Scrollposition des
							 * calContainer DIVs abzueglich der Breiten der bereits komplett unsichtbaren Zellen. */
							span.css("margin-left", (calContainer.scrollLeft() - invisibleCellWidths) + "px");
						}
					}

					/* Verhindert, dass Labels beim Zurueckscrollen nicht wieder an der Ursprungposition kommen. */
					if (cellOffset >= -10 && cellOffset <= 10)
						span.css("margin-left", "0px");
				}
			});
		}
	});
});

function toDateStructure(date) {
	let d = date.getDate();
	let weekday = date.getDay();
	let m = date.getMonth() + 1;
	let y = date.getFullYear() - 2000;

	let eventId = (d < 10 ? "0" : "") + d + "." + (m < 10 ? "0" : "") + m + "." + y;
	let dayOfMonth = (d < 10 ? "0" : "") + d;


	return {
		"eventId" : eventId,
		"dayOfMonth" : dayOfMonth,
		"dayOfWeek" : weekday
	}
}

function getDayName(dayOfWeek) {
	switch (dayOfWeek) {
		case 0: return "So";
		case 1: return "Mo";
		case 2: return "Di";
		case 3: return "Mi";
		case 4: return "Do";
		case 5: return "Fr";
		case 6: return "Sa";

	}
}

function getMonthName(monthOfYear) {
	switch (monthOfYear) {
		case 0: return "Jan";
		case 1: return "Feb";
		case 2: return "M&auml;r";
		case 3: return "Apr";
		case 4: return "Mai";
		case 5: return "Jun";
		case 6: return "Jul";
		case 7: return "Aug";
		case 8: return "Sep";
		case 9: return "Okt";
		case 10: return "Nov";
		case 11: return "Dez";
	}
}
