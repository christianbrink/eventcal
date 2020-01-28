$(document).ready(function() {

	let daysPast = calendar.settings.daysPast;
	let daysFuture = calendar.settings.daysFuture;
	let scrollPerClick = calendar.settings.scrollPerClick;
	let borderWidth = calendar.settings.borderWidth;

	/* Wird von renderCalendar-Methode gesetzt */
	let tableWidth;
	let containerWidth;
	let cellWidth;

	let getMonthName = function (monthOfYear) {
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
	};

	let toDateStructure = function(date) {
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
	};

	let getDayName = function(dayOfWeek) {
		switch (dayOfWeek) {
			case 0: return "So";
			case 1: return "Mo";
			case 2: return "Di";
			case 3: return "Mi";
			case 4: return "Do";
			case 5: return "Fr";
			case 6: return "Sa";
		}
	};

	let renderCalendar = function() {
		$("div#scrollContainer").attr("class", "border-full");
		$("div#scrollContainer").css("width", calendar.settings.containerWidth);

		let eventRow = $("table#calendar tr[class=event-row]");
		let monthRow = $("table#calendar tr[class=month-row]");

		let todayCellId;
		let now = new Date().getTime();
		let month = -1;
		let year = -1;
		let colSpan = 1;

		for (let i = -daysPast; i < daysFuture; i++) {

			let time = now + i * (24 * 60 * 60 * 1000);
			let date = new Date();
			date.setTime(time);

			let lastDay = i+1 === daysFuture; //letzter Schleifendurchlauf

			if (month === -1) {
				month = date.getMonth();
				year = date.getFullYear();
			}
			else {
				if (date.getMonth() !== month || lastDay) { //neuer Monat oder letzter Schleifendurchlauf
					let markup = `<td class="month-cell border-right" colspan="${(lastDay ? (colSpan + 1) : colSpan)}">`;
					markup += `<span>${getMonthName(month)} ${year}</span>`;
					markup += `</td>`;
					monthRow.append(markup);

					month = date.getMonth();
					year = date.getFullYear();
					colSpan = 1;
				}
				else colSpan++;
			}

			let dateStruct = toDateStructure(date);

			let cellId = 'event_' + (i + daysPast);
			let cellCssClass = `event-cell border-right ${i === 0 ? " today" : ""} ${date.getDay() === 0 ? " sunday" : ""}`;
			let eventCellContent = `<span>${getDayName(dateStruct.dayOfWeek)}</span><span>${dateStruct.dayOfMonth}</span>`;
			let markup = `<td id="${cellId}" class="${cellCssClass}">${eventCellContent}</td>`;
			eventRow.append(markup);

			let eventCell = $("td#" + cellId);
			let evtData = calendar.events[dateStruct.eventId];

			if (evtData) {
				let eventColor = evtData.color ?
					calendar.settings.colors[evtData.color] :
					calendar.settings.colors["default"];

				eventCell.css("color", eventColor.foreground);

				if (eventColor.backgroundImage)
					eventCell.css("background-image","url('" + eventColor.backgroundImage + "')");
				else
					eventCell.css("background-color", eventColor.background);

				eventCell.attr("title",
					evtData.title + " | " + "Beginn: " + evtData.time
					+ (evtData.duration ? (" | Dauer: " + evtData.duration) : "")
					+ (evtData.comment ? (" | " + evtData.comment) : ""));
			}
		}

		tableWidth = $("#calendar")[0].clientWidth;
		containerWidth = $("#calContainer").width();
		cellWidth = $("td.event-cell").width();
	};

	let setupTooltips = function() {
		$(this).tooltip({
			content : function(callback) {
				callback($(this).prop('title').replace(/\|/g, '<br />'));
			}
		});
	};

	let resetScrollPosition = function() {
		if (calendar.settings.scrollTo === "auto")
			$("#calContainer").scrollLeft((tableWidth - containerWidth + cellWidth) / 2 - 4.5);
		else
			$("#calContainer").scrollLeft(calendar.settings.scrollTo);
	};

	renderCalendar();
	setupTooltips();
	resetScrollPosition();

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





