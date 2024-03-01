import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MovieDetailsView from "@/views/MovieDetailsView/MovieDetailsView.vue";
import NotFoundView from "@/views/NotFoundView/NotFoundView.vue";
import SearchView from "@/views/SearchView/SearchView.vue";

export const STATIC_ROUTES = {
  home: "/",
  movieDetails: "/movie/:id",
  search: "/search",
  oauth: "/oauth/callback",
  notFound: "/404",
};

const routes: Array<RouteRecordRaw> = [
  {
    path: STATIC_ROUTES.home,
    name: "home",
    component: HomeView,
  },
  {
    path: STATIC_ROUTES.movieDetails,
    name: "movie",
    component: MovieDetailsView,
  },
  {
    path: STATIC_ROUTES.search,
    name: "search",
    component: SearchView,
  },
  {
    path: STATIC_ROUTES.oauth,
    name: "login",
    component: LoginView,
  },
  {
    path: STATIC_ROUTES.notFound,
    name: "notFound",
    component: NotFoundView,
  },
  { path: "/:catchAll(.*)", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
