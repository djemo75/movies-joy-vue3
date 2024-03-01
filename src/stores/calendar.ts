import { getCalendarEvents } from "@/services/calendarService";
import { CalendarEvent, MovieDetails } from "@/types";
import { subDays } from "date-fns";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useCalendarStore = defineStore("calendar", () => {
  const toast = useToast();

  const events = ref<CalendarEvent[]>([]);
  const isLoadingEvents = ref<boolean>(false);

  const getEvents = async () => {
    try {
      isLoadingEvents.value = true;
      const { data } = await getCalendarEvents({
        timeMin: subDays(new Date(), 7).toISOString(),
      });
      events.value = data.items;
    } catch (error) {
      toast.error("An error occurred while loading the events.");
    } finally {
      isLoadingEvents.value = false;
    }
  };

  const getEventByMovie = (movie: MovieDetails): CalendarEvent | undefined => {
    return events.value.find(
      (event) =>
        event.summary.includes(movie.original_title) ||
        event.description.includes(movie.id.toString())
    );
  };

  return { events, isLoadingEvents, getEvents, getEventByMovie };
});
