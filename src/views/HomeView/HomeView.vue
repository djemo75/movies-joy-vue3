<template>
  <v-container class="big-container">
    <v-row>
      <v-col cols="12" md="8" sm="12"><NowPlayingMoviesCarousel /></v-col>
      <v-col cols="12" md="4" sm="12"><UpcomingMovies /></v-col>
    </v-row>
  </v-container>

  <v-container class="big-container"><TopTenPopularMovies /></v-container>
</template>

<script setup lang="ts">
import UpcomingMovies from "./components/UpcomingMovies.vue";
import NowPlayingMoviesCarousel from "./components/NowPlayingMoviesCarousel.vue";
import TopTenPopularMovies from "./components/TopTenPopularMovies.vue";
</script>
