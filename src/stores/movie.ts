import { getGenres } from "@/services/moviesService";
import { Genre } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useMovieStore = defineStore("movie", () => {
  const toast = useToast();

  const genres = ref<Genre[]>([]);
  const isLoadingGenres = ref<boolean>(false);

  const loadGenres = async () => {
    try {
      isLoadingGenres.value = true;
      const { data } = await getGenres();
      genres.value = data.genres;
    } catch (error) {
      toast.error("An error occurred while loading the genres.");
    } finally {
      isLoadingGenres.value = false;
    }
  };

  const getGenresByIds = (ids: number[] = []) => {
    const array: Genre[] = [];
    ids.forEach((genreId) => {
      const genreObject = genres.value.find((g) => g.id === genreId);
      if (genreObject) {
        array.push(genreObject);
      }
    });

    return array;
  };

  return { genres, isLoadingGenres, loadGenres, getGenresByIds };
});
