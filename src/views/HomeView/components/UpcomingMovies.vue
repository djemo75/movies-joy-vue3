<template>
  <div>
    <div class="text-h5 mb-3">Upcoming Movies</div>
    <template v-if="!loading">
      <UpcomingMoviesListItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </template>

    <SkeletonLoader v-else height="395px" width="100%" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMovies } from "@/services/moviesService";
import { Movie } from "@/types";
import { useToast } from "vue-toast-notification";
import UpcomingMoviesListItem from "./UpcomingMoviesListItem.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const movies = ref<Movie[]>([]);
const loading = ref(true);

const toast = useToast();

onMounted(() => {
  loadMovies();
});

const loadMovies = async () => {
  try {
    loading.value = true;
    const { data } = await getMovies("upcoming", 1);
    movies.value = data.results.slice(0, 3);
  } catch (error) {
    toast.error("An error occurred while loading the movies.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
.movie-item {
  display: flex;
  margin-bottom: 16px;

  .image-container {
    width: 150px;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    margin-right: 12px;

    img {
      width: 150px;
      height: 200px;
      object-fit: cover;
      transition: 550ms ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }
}
</style>
