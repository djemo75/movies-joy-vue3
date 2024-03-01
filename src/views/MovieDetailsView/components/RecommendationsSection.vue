<template>
  <div class="text-h5 mb-3">Recommendations</div>

  <template v-if="!loading">
    <MovieCard
      v-for="movie in recommendations"
      :key="movie.id"
      :movie="movie"
    />
  </template>

  <div v-else v-for="item in [1, 2, 3]" :key="item">
    <SkeletonLoader :style="{ aspectRatio: 1.5, borderRadius: '20px' }" />
    <SkeletonLoader :style="{ height: '20px', marginTop: '8px' }" />
    <SkeletonLoader
      :style="{
        height: '20px',
        marginTop: '12px',
        marginBottom: '16px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { getMovieRecommendations } from "@/services/moviesService";
import { Movie } from "@/types";
import { ref, watch } from "vue";
import { onMounted } from "vue";
import { useToast } from "vue-toast-notification";
import { useRoute, useRouter } from "vue-router";
import { isAxiosError } from "axios";
import { STATIC_ROUTES } from "@/router";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import MovieCard from "@/components/MovieCard.vue";

const router = useRouter();
const route = useRoute();

const recommendations = ref<Movie[]>();
const loading = ref(true);

const toast = useToast();

onMounted(() => {
  loadRecommendations();
});

watch(
  () => route.params.id as string,
  () => loadRecommendations()
);

const loadRecommendations = async () => {
  try {
    loading.value = true;
    const { data } = await getMovieRecommendations(route.params.id as string);
    recommendations.value = data.results;
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
</script>
