import axios from "axios";

const movieDBAxios = axios.create({
  baseURL: process.env.VUE_APP_MOVIE_DB_API_URL,
});
movieDBAxios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${process.env.VUE_APP_MOVIE_DB_ACCESS_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { movieDBAxios };
