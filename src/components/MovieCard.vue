<template>
  <div class="movie-item">
    <div class="image-container">
      <template v-if="!showFallbackImage">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.title"
          @click="handleView"
          @error="handleImageError"
      /></template>
      <div v-else class="no-image-text">No Image</div>
    </div>

    <div class="info">
      <div class="movie-title" @click="handleView">
        {{ movie.original_title }}
      </div>
      <div class="score-and-genres-container">
        <MovieScore :score="movie.vote_average" />
        <div v-if="!isGenresLoading" class="movie-genres">
          {{ genresAsText }}
        </div>
        <div v-else class="movie-genres">Loading....</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Movie, Genre } from "@/types";
import { useRouter } from "vue-router";
import { STATIC_ROUTES } from "@/router";
import MovieScore from "@/components/MovieScore.vue";
import { ref } from "vue";
import { useMovieStore } from "@/stores";

type Props = {
  movie: Movie;
};

const props = defineProps<Props>();

const showFallbackImage = ref<boolean>(false);

const movieStore = useMovieStore();
const router = useRouter();

const handleView = () => {
  router.push(
    STATIC_ROUTES.movieDetails.replace(":id", props.movie.id.toString())
  );
};

const handleImageError = () => {
  showFallbackImage.value = true;
};

const genres = computed<Genre[]>(() =>
  movieStore.getGenresByIds(props.movie.genre_ids)
);

const genresAsText = genres.value.map((g) => g.name).join(", ");

const isGenresLoading = computed<boolean>(() => movieStore.isLoadingGenres);
</script>

<style scoped lang="less">
.movie-item {
  margin-bottom: 16px;

  .image-container {
    width: 100%;
    min-width: 100%;
    aspect-ratio: 1.5;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: #303030;

    img {
      width: 100%;
      aspect-ratio: 1.5;
      object-fit: cover;
      transition: all 300ms;
      filter: grayscale(0.2);
    }
    &:hover {
      img {
        filter: grayscale(0);
      }
    }

    .no-image-text {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  .info {
    .movie-title {
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
      margin-bottom: 6px;
    }
    .score-and-genres-container {
      display: flex;
      align-items: center;
      .movie-genres {
        display: flex;
        align-items: center;
        margin-left: 8px;
        font-size: 14px;
        font-weight: 500;
        color: rgb(91, 91, 91);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
