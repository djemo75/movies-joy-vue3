import { Country } from "./Country";
import { Genre } from "./Genre";
import { Language } from "./Language";
import { ProductionCompany } from "./ProductionCompany";

export type MovieBase = {
  id: number;
  original_language: string;
  original_title: string;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
};

export type Movie = MovieBase & {
  genre_ids: number[];
};

export type MovieDetails = MovieBase & {
  belongs_to_collection: string | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
};

export type MoviesType = "now_playing" | "popular" | "top_rated" | "upcoming";
