import {
  CalendarEvent,
  CreateCalendarEvent,
  GetCalendarEventsRequest,
  GetCalendarEventsResponse,
} from "@/types";
import { authenticatedAxios } from "@/utils/authenticatedAxios";

// For now, we're using the user's default calendar
const calendarId = "primary";

export const getCalendarEvents = (data?: GetCalendarEventsRequest) => {
  const searchParams = new URLSearchParams(data);
  return authenticatedAxios.get<GetCalendarEventsResponse>(
    `/calendar/v3/calendars/${calendarId}/events?${searchParams}`
  );
};

export const createCalendarEvent = (data: CreateCalendarEvent) => {
  return authenticatedAxios.post<CalendarEvent>(
    `/calendar/v3/calendars/${calendarId}/events`,
    data
  );
};

export const deleteCalendarEvent = (eventId: string) => {
  return authenticatedAxios.delete<CalendarEvent>(
    `/calendar/v3/calendars/${calendarId}/events/${eventId}`
  );
};

export const updateCalendarEvent = (
  eventId: string,
  data: Partial<CalendarEvent>
) => {
  return authenticatedAxios.patch<CalendarEvent>(
    `/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    data
  );
};
