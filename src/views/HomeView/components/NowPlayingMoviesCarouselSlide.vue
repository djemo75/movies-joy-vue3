<template>
  <v-carousel-item
    :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`"
    cover
  >
    <div class="info">
      <div class="movie-genres">
        <div v-for="genre in genres" :key="genre.id">
          {{ genre.name }}
        </div>
      </div>
      <div class="movie-title" @click="handleView">
        {{ movie.original_title }}
      </div>
      <MovieScore :score="movie.vote_average" />

      <v-btn
        class="action-button"
        rounded="xl"
        size="large"
        :ripple="false"
        prepend-icon="fa:fas fa-play"
        @click="handleView"
        >Watch trailer</v-btn
      >
    </div>
  </v-carousel-item>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { STATIC_ROUTES } from "@/router";
import { Genre, Movie } from "@/types";
import MovieScore from "@/components/MovieScore.vue";
import { useMovieStore } from "@/stores";

type Props = {
  movie: Movie;
  carouselIndex: number;
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
</script>

<style scoped lang="less">
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding-left: 40px;
  padding-right: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));

  .movie-genres {
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    & > div {
      background: #000000c5;
      padding: 4px 6px;
      color: #fff;
      font-size: 12px;
      color: #d4d4d4;
      font-weight: 500;
      border-radius: 8px;
      margin-right: 8px;
    }
  }
  .movie-title {
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
  }

  .action-button {
    background: #c333f3;
    color: #fff;
    text-transform: none;
    font-weight: 600;
    transition: 1000ms;
    margin-top: 20px;
  }
}
</style>
