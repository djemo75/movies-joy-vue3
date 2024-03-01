<template>
  <div class="root">
    <div v-if="loading">
      <SkeletonLoader height="440px" border-radius="24px" />
    </div>
    <v-carousel
      v-else
      v-model="carouselIndex"
      :hide-delimiters="true"
      :show-arrows="false"
      :cycle="true"
    >
      <NowPlayingMoviesCarouselSlide
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :carousel-index="carouselIndex"
      />

      <div class="custom-pagination">
        <div
          v-for="(movie, index) in movies"
          :key="movie.id"
          class="page"
          @click="carouselIndex = index"
        >
          <div v-if="index === carouselIndex" class="dot" />
        </div>
      </div>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import { getMovies } from "@/services/moviesService";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import NowPlayingMoviesCarouselSlide from "./NowPlayingMoviesCarouselSlide.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { Movie } from "@/types";

const carouselIndex = ref(0);
const movies = ref<Movie[]>([]);
const loading = ref(true);

const toast = useToast();

onMounted(() => {
  loadMovies();
});

const loadMovies = async () => {
  try {
    loading.value = true;
    const { data } = await getMovies("now_playing", 1);
    movies.value = data.results.slice(0, 7);
  } catch (error) {
    toast.error("An error occurred while loading the movies.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
.root {
  .v-carousel {
    border-radius: 24px;
    height: 440px !important;
  }

  .custom-pagination {
    position: absolute;
    z-index: 3;
    right: 26px;
    bottom: 26px;
    display: flex;
    align-items: center;

    .page {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #d2c9c9;
      cursor: pointer;
      transition: 200ms ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #c333f3;
        cursor: pointer;
        transition: 200ms ease-in-out;
      }
    }
  }
}
</style>
