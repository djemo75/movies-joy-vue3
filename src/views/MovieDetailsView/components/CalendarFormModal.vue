<template>
  <v-btn
    class="calendar-btn"
    variant="flat"
    color="primary"
    :prepend-icon="
      calendarEvent ? 'fa:fas fa-calendar-check' : 'fa:fas fa-heart'
    "
    :text="calendarEvent ? 'Change time' : 'Like'"
    @click="isOpen = true"
    :ripple="false"
  />
  <v-dialog v-model="isOpen" width="500">
    <template v-slot:default="{ isActive }">
      <v-card
        :title="
          calendarEvent
            ? 'Change the event time on your calendar'
            : 'Schedule an event on your calendar'
        "
      >
        <v-card-text>
          {{
            calendarEvent
              ? "You currently have an event on your calendar. You can change the scheduled time from the form below."
              : "Add an event to your calendar so it can notify you"
          }}
          <div class="selected-datetime">
            <div><b>Day:</b>{{ format(date, "dd MMMM yyyy") }}</div>
            <div><b>Time:</b> {{ format(date, "HH:mm") }}</div>
          </div>

          <div class="datetime-picker">
            <VueDatePicker
              v-model="date"
              inline
              :min-date="new Date()"
              auto-apply
            />
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Cancel"
              @click="isActive.value = false"
              :disabled="Boolean(actionLoading)"
            ></v-btn>
            <v-btn
              v-if="calendarEvent"
              variant="outlined"
              color="primary"
              text="Delete Event"
              class="delete-event-btn"
              @click="deleteEventFromCalendar"
              :loading="actionLoading === 'delete'"
              :disabled="Boolean(actionLoading)"
            ></v-btn>
            <v-btn
              variant="flat"
              color="primary"
              class="calendar-btn"
              :text="calendarEvent ? 'Change time' : 'Add'"
              @click="
                () =>
                  calendarEvent
                    ? changeEventFromCalendar()
                    : addEventToCalendar()
              "
              :loading="actionLoading === 'add' || actionLoading === 'edit'"
              :disabled="Boolean(actionLoading)"
            ></v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from "@/services/calendarService";
import { useCalendarStore } from "@/stores";
import { CalendarEvent, CreateCalendarEvent, MovieDetails } from "@/types";
import { addMinutes, format } from "date-fns";
import { ref } from "vue";
import { watch } from "vue";
import { computed } from "vue";
import { defineProps } from "vue";
import { useToast } from "vue-toast-notification";

type Props = {
  movie: MovieDetails;
};

const props = defineProps<Props>();

const calendarStore = useCalendarStore();
const toast = useToast();

const isOpen = ref(false);
const date = ref(new Date());
const actionLoading = ref<boolean | string>(false);

const preparePayload = () => {
  const timeZone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone;
  const payload: CreateCalendarEvent = {
    summary: props.movie.original_title,
    description: `Link to movie: ${location.href}`,
    start: {
      dateTime: date.value.toISOString(),
      timeZone: timeZone,
    },
    end: {
      dateTime: addMinutes(date.value, props.movie.runtime).toISOString(),
      timeZone: timeZone,
    },
  };

  return payload;
};

const addEventToCalendar = async () => {
  try {
    actionLoading.value = "add";
    const payload = preparePayload();
    await createCalendarEvent(payload);
    await calendarStore.getEvents();
    isOpen.value = false;
  } catch (error) {
    toast.error("An error occurred while creating event in your calendar.");
  } finally {
    actionLoading.value = false;
  }
};

const changeEventFromCalendar = async () => {
  if (!calendarEvent.value) {
    return;
  }
  try {
    actionLoading.value = "edit";
    const payload = preparePayload();
    await updateCalendarEvent(calendarEvent.value.id, payload);
    await calendarStore.getEvents();
    isOpen.value = false;
  } catch (error) {
    toast.error("An error occurred while creating event in your calendar.");
  } finally {
    actionLoading.value = false;
  }
};

const deleteEventFromCalendar = async () => {
  if (!calendarEvent.value) {
    return;
  }
  try {
    actionLoading.value = "delete";
    await deleteCalendarEvent(calendarEvent.value.id);
    await calendarStore.getEvents();
    isOpen.value = false;
  } catch (error) {
    toast.error(
      "An error occurred while deleting the event from your calendar."
    );
  } finally {
    actionLoading.value = false;
  }
};

const calendarEvent = computed<CalendarEvent | undefined>(() =>
  props.movie ? calendarStore.getEventByMovie(props.movie) : undefined
);

watch(calendarEvent, () => {
  if (calendarEvent.value?.start.dateTime)
    date.value = new Date(calendarEvent.value.start.dateTime);
});

watch(isOpen, () => {
  if (isOpen.value)
    date.value = calendarEvent.value
      ? new Date(calendarEvent.value.start.dateTime)
      : new Date();
});
</script>

<style scoped lang="less">
.calendar-btn {
  background: #ff23f4 !important;
  border-radius: 8px;
}

.datetime-picker {
  margin-top: 12px;
  margin-bottom: 20px;
}

.selected-datetime {
  display: flex;
  align-items: center;
  margin-top: 6px;
  & > div:first-of-type {
    margin-right: 16px;
  }
}

.delete-event-btn {
  border-color: #d81a1a !important;
  color: #d81a1a !important;
}
</style>

<style lang="less">
.dp__outer_menu_wrap {
  width: 100% !important;
  .dp--tp-wrap {
    max-width: 100%;
  }
}
</style>
