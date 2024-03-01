<template>
  <div class="movie-item">
    <div class="image-container">
      <img
        :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
        :alt="movie.title"
        @click="handleView"
      />
    </div>

    <div class="info">
      <div class="movie-title" @click="handleView">
        {{ movie.original_title }}
      </div>
      <div class="movie-release-date">
        {{ formatDate(new Date(movie.release_date)) }}
      </div>
      <div v-if="!isGenresLoading" class="movie-genres">
        {{ genresAsText }}
      </div>
      <div v-else class="movie-genres">Loading....</div>
      <div class="movie-score">
        <v-btn variant="plain" :ripple="false">
          <MovieScore :score="movie.vote_average" />
          <v-tooltip activator="parent" location="top"
            >Average rating</v-tooltip
          >
        </v-btn>

        <v-btn variant="plain" :ripple="false">
          <v-icon
            icon="fa:fas fa-user"
            size="small"
            class="movie-vote-count-icon"
          ></v-icon>
          <div class="movie-vote-count-value">{{ movie.vote_count }}</div>
          <v-tooltip activator="parent" location="top"
            >Number of people who voted</v-tooltip
          >
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Movie, Genre } from "@/types";
import { formatDate } from "@/utils/date";
import { useRouter } from "vue-router";
import { STATIC_ROUTES } from "@/router";
import MovieScore from "@/components/MovieScore.vue";
import { useMovieStore } from "@/stores";

type Props = {
  movie: Movie;
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

const genresAsText = genres.value.map((g) => g.name).join(", ");

const isGenresLoading = computed<boolean>(() => movieStore.isLoadingGenres);
</script>

<style scoped lang="less">
.movie-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .image-container {
    width: 120px;
    min-width: 120px;
    height: 120px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    margin-right: 16px;

    img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      transition: 550ms ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }

  .info {
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
    .movie-release-date {
      margin-bottom: 6px;
      font-size: 15px;
      color: rgb(211, 211, 211);
    }
    .movie-genres {
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      font-size: 14px;
      font-weight: 500;
      color: rgb(91, 91, 91);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .movie-score {
      .v-btn:first-child {
        margin-left: -14px;
      }
      .movie-vote-count-icon {
        color: #8d8d8d;
        margin-left: 12px;
        margin-right: 6px;
      }
      .movie-vote-count-value {
        font-weight: 700;
      }
      .v-btn--variant-plain {
        opacity: 1;
      }
    }
  }
}
</style>
