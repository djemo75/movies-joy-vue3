export type DateTimeAndTimezone = {
  dateTime: string;
  timeZone: string;
};

export type CalendarEventUser = {
  email: string;
  self: boolean;
};

export type CalendarEvent = {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: CalendarEventUser;
  organizer: CalendarEventUser;
  start: DateTimeAndTimezone;
  end: DateTimeAndTimezone;
  iCalUID: string;
  sequence: number;
  reminders: { useDefault: boolean };
  eventType: string;
};

export type GetCalendarEventsRequest = {
  timeMin?: string;
  timeZone?: string;
};

export type GetCalendarEventsResponse = {
  accessRole: string;
  defaultReminders: { method: string; minutes: number }[];
  description: string;
  etag: string;
  items: CalendarEvent[];
  kind: string;
  nextSyncToken: string;
  summary: string;
  timeZone: string;
  updated: string;
};

export type CreateCalendarEvent = {
  summary: string;
  description: string;
  start: DateTimeAndTimezone;
  end: DateTimeAndTimezone;
};
