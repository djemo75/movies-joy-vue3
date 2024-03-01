<template>
  <div
    class="item"
    :class="{
      grayscale: hoveredItemIndex !== undefined && hoveredItemIndex !== index,
      hovered: hoveredItemIndex === index,
    }"
  >
    <div class="index">{{ index + 1 }}</div>
    <div class="image-container">
      <img
        :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
        :alt="movie.title"
        @click="handleView"
        @mouseenter="() => setHoveredItemIndex(index)"
        @mouseleave="() => setHoveredItemIndex(undefined)"
      />
    </div>
    <div class="info">
      <div class="movie-title" @click="handleView">
        {{ movie.original_title }}
      </div>
      <div v-if="!isGenresLoading" class="movie-genres">
        {{ genresAsText }}
      </div>
      <div v-else class="movie-genres">Loading....</div>
      <movie-score :score="movie.vote_average" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieScore from "@/components/MovieScore.vue";
import { STATIC_ROUTES } from "@/router";
import { useMovieStore } from "@/stores";
import { Movie, Genre } from "@/types";
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";

type Props = {
  movie: Movie;
  index: number;
  hoveredItemIndex: number | undefined;
  setHoveredItemIndex: (hoveredItemIndex: number | undefined) => void;
};

const props = defineProps<Props>();

const movieStore = useMovieStore();
const router = useRouter();

const handleView = () => {
  router.push(
    STATIC_ROUTES.movieDetails.replace(":id", props.movie.id.toString())
  );
};

const genres = computed<Genre[]>(() =>
  movieStore.getGenresByIds(props.movie.genre_ids)
);

const genresAsText = [...genres.value]
  .splice(0, 2)
  .map((g) => g.name)
  .join(", ");

const isGenresLoading = computed<boolean>(() => {
  return movieStore.isLoadingGenres;
});
</script>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  max-width: 300px;
  min-width: 300px;

  .index {
    font-size: 2.5rem;
    font-weight: 700;
    margin-right: 20px;
  }

  .image-container {
    width: 120px;
    min-width: 120px;
    height: 180px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 120px;
      height: 180px;
      object-fit: cover;
      transition: transform 550ms ease-in-out, filter 700ms;
    }

    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }

  .info {
    margin-left: 16px;
    width: 100%;

    .movie-title {
      font-weight: 600;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin-bottom: 6px;
    }

    .movie-genres {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
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

  &.grayscale {
    .image-container img {
      filter: grayscale(1);
    }
    & .movie-score .movie-score-icon {
      color: #a1a1a1;
    }
  }
  &.hovered {
    & .image-container img {
      filter: grayscale(0);
    }
  }
}
</style>
