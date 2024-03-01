<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import AppLayout from "@/components/AppLayout/AppLayout.vue";
import { useAuthStore, useCalendarStore, useMovieStore } from "@/stores";

const authStore = useAuthStore();
const calendarStore = useCalendarStore();
const movieStore = useMovieStore();

onMounted(() => {
  authStore.loadUserProfile();
  movieStore.loadGenres();
});

watch(
  () => authStore.isAuthenticated,
  () => {
    if (authStore.isAuthenticated) {
      calendarStore.getEvents();
    }
  }
);
</script>

<style lang="less">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #0d0c0f;
  color: #fff;
}

@media (min-width: 960px) {
  .big-container {
    max-width: 1200px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
