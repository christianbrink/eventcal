function EventCalendar(jQuery, rootId, lang, calendar) {

	let $ = jQuery;

	this._rootId = rootId;
	this._i18n = calendar.i18n[lang] || calendar.i18n["default"];
	this._settings = calendar.settings;
	this._events = calendar.events;

	this._daysPast = this._settings.daysPast;
	this._daysFuture = this._settings.daysFuture;
	this._scrollPerClick = this._settings.scrollPerClick;
	this._borderWidth = this._settings.borderWidth;

	this._tableWidth = null;
	this._containerWidth = null;
	this._cellWidth = null;

	this.init = function() {
		this._renderCalendar();

		this._initNavButtonEvents();

		this._initScrollEvents();

		/* Tooltips initialisieren */
		$(document).tooltip({
			content : function(callback) {
				callback($(this).prop('title').replace(/\|/g, '<br />'));
			}
		});

		/* Initiale Scroll-Position setzen */
		if (this._settings.scrollTo === "auto")
			$("#evCal_calContainer").scrollLeft((this._tableWidth - this._containerWidth + this._cellWidth) / 2 - 4.5);
		else
			$("#evCal_calContainer").scrollLeft(this._settings.scrollTo);
	};

	this._toDateStructure = function(date) {
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

	this._getDayName = function(dayOfWeek) {
		return this._i18n.days[dayOfWeek];
	};

	this._getMonthName = function(monthOfYear) {
		return this._i18n.months[monthOfYear];
	};

	this._renderCalendar = function() {

		let $root = $(`div#${this._rootId}`);

		let markup = '';
		markup += '<div id="evCal_scrollContainer">';
		markup += '	<div id="evCal_calContainer">';
		markup += '		<table id="evCal_calendar">';
		markup += '			<tr class="evCal-month-row" />';
		markup += '			<tr class="evCal-event-row" />';
		markup += '		</table>';
		markup += '	</div>';
		markup += '</div>';

		markup += '<div id="evCal_controlContainer">';
		markup += '	<table id="evCal_navControls" class="border-full">';
		markup += '		<tr>';
		markup += `			<td><a id="evCal_navStart" title="${this._i18n['nav.start.title']}" class="fa fa-fast-backward" /></td>`;
		markup += `			<td><a id="evCal_navLeft" title="${this._i18n['nav.back.title']}" class="fa fa-backward" /></td>`;
		markup += `			<td><a id="evCal_navRight" title="${this._i18n['nav.forward.title']}" class="fa fa-forward" /></td>`;
		markup += `			<td><a id="evCal_navEnd" title="${this._i18n['nav.end.title']}" class="fa fa-fast-forward" /></td>`;
		markup += '		</tr>';
		markup += '	</table>';
		markup += `<span>${this._i18n['nav.hint']}</span>`
		markup += '</div>';

		$root.append(markup);

		$("div#evCal_scrollContainer").attr("class", "border-full");
		$("div#evCal_scrollContainer").css("width", this._settings.containerWidth);

		let eventRow = $("table#evCal_calendar tr[class=evCal-event-row]");
		let monthRow = $("table#evCal_calendar tr[class=evCal-month-row]");

		let now = new Date().getTime();
		let month = -1;
		let year = -1;
		let colSpan = 1;

		for (let i = -this._daysPast; i < this._daysFuture; i++) {

			let time = now + i * (24 * 60 * 60 * 1000);
			let date = new Date();
			date.setTime(time);

			/* letzter Schleifendurchlauf? */
			let lastDay = i+1 === this._daysFuture;

			if (month === -1) {
				month = date.getMonth();
				year = date.getFullYear();
			}

			else {
				if (date.getMonth() !== month || lastDay) { //neuer Monat oder letzter Schleifendurchlauf
					let markup = `<td class="month-cell border-right" colspan="${(lastDay ? (colSpan + 1) : colSpan)}">`;
					markup += `<span>${this._getMonthName(month)} ${year}</span>`;
					markup += `</td>`;
					monthRow.append(markup);

					month = date.getMonth();
					year = date.getFullYear();
					colSpan = 1;
				}
				else colSpan++;
			}

			let dateStruct = this._toDateStructure(date);

			let cellId = 'event_' + (i + this._daysPast);
			let cellCssClass = `event-cell border-right ${i === 0 ? " today" : ""} ${date.getDay() === 0 ? " sunday" : ""}`;
			let eventCellContent = `<span>${this._getDayName(dateStruct.dayOfWeek)}</span><span>${dateStruct.dayOfMonth}</span>`;
			let markup = `<td id="${cellId}" class="${cellCssClass}">${eventCellContent}</td>`;
			eventRow.append(markup);

			let eventCell = $("td#" + cellId);
			let eventData = this._events[dateStruct.eventId];

			if (eventData) {
				let eventColor = eventData.color ?
					this._settings.colors[eventData.color] :
					this._settings.colors["default"];

				eventCell.css("color", eventColor.foreground);

				if (eventColor.backgroundImage)
					eventCell.css("background-image","url('" + eventColor.backgroundImage + "')");
				else
					eventCell.css("background-color", eventColor.background);

				let eventTitle = `${eventData.title} | ${this._i18n['event.start']}: ${eventData.time}`;
				if (eventData.duration) eventTitle += ` | ${this._i18n['event.duration']}: ${eventData.duration}`;
				if (eventData.comment) eventTitle += ` | ${eventData.comment}`;
				eventCell.attr("title", eventTitle);
			}
		}

		this._tableWidth = $("#evCal_calendar")[0].clientWidth;
		this._containerWidth = $("#evCal_calContainer").width();
		this._cellWidth = $("td.event-cell").width();
	};

	this._initNavButtonEvents = function() {
		$("#evCal_navStart").on({
			click: function() {
				/* Ganz nach links scrollen (Scrollposition = 0) */
				$("#evCal_calContainer").scrollLeft(0);
			}.bind(this)
		});

		$("#evCal_navRight").on({
			click: function() {
				/* aktuelle Scrollposition abfragen */
				let left = $("#evCal_calContainer").scrollLeft();

				/* scrollPerClick Tage nach rechts scrollen */
				$("#evCal_calContainer").scrollLeft(left + this._scrollPerClick * (this._cellWidth + this._borderWidth));
			}.bind(this)
		});

		$("#evCal_navLeft").on({
			click: function() {
				/* aktuelle Scrollposition abfragen */
				let left = $("#evCal_calContainer").scrollLeft();

				/* scrollPerClick Tage nach links scrollen */
				$("#evCal_calContainer").scrollLeft(left - this._scrollPerClick * (this._cellWidth + this._borderWidth));
			}.bind(this)
		});

		$("#evCal_navEnd").on({
			click: function() {
				/* Anzahl der Tage (= Zellen) im Kalender bestimmen */
				let dayCount = this._daysPast + this._daysFuture;

				/* Ganz nach rechts scrollen */
				$("#evCal_calContainer").scrollLeft(dayCount * (this._cellWidth + this._borderWidth) - this._containerWidth);
			}.bind(this)
		});
	};

	this._initScrollEvents = function() {

		let x = 0;
		let left = 0;

		$("#evCal_calContainer").on({
			mousemove: function(e) {
				if (e.buttons === 1) {

					if (x === 0) {
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
				let scrollContainerOffset = $("div#evCal_scrollContainer").offset().left;

				/* Summe der Breiten der Zellen die den sichtbaren Bereich komplett verlassen haben */
				let invisibleCellWidths = 0;

				$("table#evCal_calendar tr[class=evCal-month-row] td span").each(function() {
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
	};
}