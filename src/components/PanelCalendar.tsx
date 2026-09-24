import FullCalendar from "@fullcalendar/react";
import type { EventClickInfo, EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import listPlugin from "@fullcalendar/react/list";
import interactionPlugin from "@fullcalendar/react/interaction";
import classicThemePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

export interface PanelEvent {
	id: string;
	title: string;
	start: string;
	end: string;
}

interface Props {
	events: PanelEvent[];
}

export default function PanelCalendar({ events }: Props) {
	const calendarEvents: EventInput[] = events.map((event) => ({
		id: event.id,
		title: event.title,
		start: event.start,
		end: event.end,
	}));

	const startDate = new Date(2026, 10, 11);

	function handleEventClick(info: EventClickInfo) {
		info.jsEvent.preventDefault();
		window.location.hash = `panel-${info.event.id}`;
	}

	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, classicThemePlugin]}
			initialView="listWeek"
			initialDate={startDate}
			timeZone="America/Los_Angeles"
			headerToolbar={{
				left: "prev,next today",
				center: "title",
				right: "dayGridMonth,timeGridWeek,listWeek",
			}}
			events={calendarEvents}
			eventClick={handleEventClick}
			height="auto"
		/>
	);
}
