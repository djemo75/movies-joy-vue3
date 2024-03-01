import { Genre, Movie, MovieDetails, MoviesType } from "@/types";
import { PaginatedResult } from "@/types/PaginatedResult";
import { movieDBAxios } from "@/utils/moviesAxios";

export const getMovies = async (moviesType: MoviesType, page: number) => {
  const language = "en-US";
  return movieDBAxios.get<PaginatedResult<Movie>>(
    `/movie/${moviesType}?language=${language}&page=${page}`
  );
};

export const getMovie = async (id: string) => {
  return movieDBAxios.get<MovieDetails>(`/movie/${id}`);
};

export const getGenres = async () => {
  return movieDBAxios.get<{ genres: Genre[] }>(`/genre/movie/list`);
};

export const getMovieRecommendations = async (id: string) => {
  return movieDBAxios.get<PaginatedResult<Movie>>(
    `/movie/${id}/recommendations`
  );
};

export const searchMovies = async (query: string, page: number) => {
  return movieDBAxios.get<PaginatedResult<Movie>>(
    `/search/movie?query=${query}&page=${page}`
  );
};
