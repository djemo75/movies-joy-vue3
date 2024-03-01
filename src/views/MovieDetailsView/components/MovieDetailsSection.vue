<template>
  <div v-if="!loading && movie">
    <div class="image-container">
      <img
        :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`"
        :alt="movie.title"
      />
    </div>
    <div class="movie-info">
      <div class="title-container">
        <div class="movie-title">{{ movie.original_title }}</div>

        <div class="actions" v-if="movie && isAuthenticated">
          <CalendarFormModal :movie="movie" />
        </div>
      </div>
      <div class="movie-genres">{{ genresAsText }}</div>

      <MovieScore :score="movie.vote_average" />
    </div>

    <div class="overview">{{ movie.overview }}</div>
  </div>
  <div v-else>
    <SkeletonLoader :style="{ aspectRatio: 1.5, borderRadius: '24px' }" />
    <SkeletonLoader
      :style="{ width: '300px', height: '22px', marginTop: '28px' }"
    />
    <SkeletonLoader
      :style="{ width: '70px', height: '16px', marginTop: '22px' }"
    />
  </div>
</template>

<script setup lang="ts">
import { MovieDetails } from "@/types";
import MovieScore from "@/components/MovieScore.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { onMounted } from "vue";
import { watch } from "vue";
import { getMovie } from "@/services/moviesService";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { isAxiosError } from "axios";
import { STATIC_ROUTES } from "@/router";
import CalendarFormModal from "./CalendarFormModal.vue";
import { computed } from "vue";
import { useAuthStore } from "@/stores";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const movie = ref<MovieDetails>();
const loading = ref(true);

const toast = useToast();

onMounted(() => {
  loadMovie();
});

watch(
  () => route.params.id as string,
  () => loadMovie()
);

const loadMovie = async () => {
  try {
    loading.value = true;
    const { data } = await getMovie(route.params.id as string);
    movie.value = data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      router.push(STATIC_ROUTES.notFound);
      return;
    }
    toast.error("An error occurred while loading the movie.");
  } finally {
    loading.value = false;
  }
};

const isAuthenticated = computed<boolean>(() => authStore.isAuthenticated);

const genresAsText = movie.value
  ? movie.value.genres.map((g) => g.name).join(", ")
  : undefined;
</script>

<style scoped lang="less">
.image-container {
  width: 100%;
  aspect-ratio: 1.5;
  border-radius: 24px;
  overflow: hidden;
  background: #303030;

  img {
    width: 100%;
    aspect-ratio: 1.5;
    object-fit: cover;
  }
}

.movie-info {
  margin-top: 16px;

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .movie-title {
      font-size: 1.75rem;
      font-weight: 500;
    }
    .actions {
      display: flex;
      align-items: center;
    }
  }

  .movie-genres {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: rgb(91, 91, 91);
  }
}

.overview {
  margin-top: 20px;
}
</style>
