<template>
  <form class="submit-form" @submit.prevent="() => handleSearch(false)">
    <input v-model="searchString" placeholder="Type to search" />

    <v-btn :loading="loading" type="submit" text="Submit" />
  </form>

  <v-container class="big-container movie-list">
    <v-row>
      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="12"
        md="3"
        sm="6"
        xs="12"
      >
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>
  </v-container>

  <div v-if="hasMore" class="has-more-button-container">
    <v-btn
      @click="handleSearchMore"
      :loading="loading"
      type="submit"
      text="Show more"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Movie } from "@/types";
import { searchMovies } from "@/services/moviesService";
import { useToast } from "vue-toast-notification";
import MovieCard from "@/components/MovieCard.vue";
import { useRoute, useRouter } from "vue-router";
import { STATIC_ROUTES } from "@/router";
import { onMounted } from "vue";
import { computed } from "vue";

const movies = ref<Movie[]>([]);
const searchString = ref<string>("");
const page = ref<number>(1);
const totalPages = ref<number>(1);
const loading = ref<boolean>(false);

const router = useRouter();
const route = useRoute();
const toast = useToast();

onMounted(() => {
  if (route.query && route.query.q) {
    searchString.value = route.query.q as string;
    handleSearch(false);
  }
});

const handleSearch = async (keepPreviousResults = false) => {
  try {
    if (!keepPreviousResults) {
      page.value = 1;
    }
    loading.value = true;
    const { data } = await searchMovies(searchString.value, page.value);
    movies.value = keepPreviousResults
      ? [...movies.value, ...data.results]
      : data.results;
    totalPages.value = data.total_pages;
    router.push({
      path: STATIC_ROUTES.search,
      query: { q: searchString.value },
    });
  } catch (error) {
    toast.error("An error occurred while searching movies.");
  } finally {
    loading.value = false;
  }
};

const handleSearchMore = () => {
  page.value = page.value + 1;
  handleSearch(true);
};

const hasMore = computed(() => totalPages.value > page.value);
</script>

<style scoped lang="less">
.submit-form {
  display: flex;
  align-items: center;
  max-width: 400px;
  margin-top: 12px;

  input {
    width: 100%;
    padding: 6px 10px;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 8px;
    margin-right: 12px;
    color: #fff;

    &:focus {
      outline: 0;
    }
  }
}

.movie-list .movie-item {
  margin-bottom: 0px;
}

.has-more-button-container {
  display: flex;
  justify-content: center;
}

.not-found-text {
  margin-top: 20px;
}
</style>
