import { getNewAccessToken } from "@/services/authService";
import { useAuthStore } from "@/stores";
import { User } from "@/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useToast } from "vue-toast-notification";

const authenticatedAxios = axios.create({
  baseURL: process.env.VUE_APP_GOOGLE_API_URL,
});
authenticatedAxios.interceptors.request.use(
  async (config) => {
    const toast = useToast();
    const authStore = useAuthStore();

    let accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    const refresh_token = localStorage.getItem("refresh_token");

    if (!accessToken || !idToken) {
      return config;
    }

    const decodedToken: User = jwtDecode(idToken);
    const thresholdInMilliseconds = 15 * 60 * 1000; // 15min

    // If there is no refresh token and access token is expired, logout the user
    const isAccessTokenExpired = new Date().getTime() > decodedToken.exp * 1000;
    if (!refresh_token && isAccessTokenExpired) {
      toast.info("Your session has expired, please log in again!");
      authStore.logout();
    }

    const shouldRefreshTheToken =
      new Date().getTime() + thresholdInMilliseconds >= decodedToken.exp * 1000;
    if (refresh_token && shouldRefreshTheToken) {
      try {
        const { data } = await getNewAccessToken(refresh_token);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("id_token", data.id_token);
        accessToken = data.access_token; // Attach the new access token
      } catch (error) {
        toast.error("Something went wrong! Try to login again!");
        authStore.logout();
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { authenticatedAxios };
