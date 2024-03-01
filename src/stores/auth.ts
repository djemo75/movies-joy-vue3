import router, { STATIC_ROUTES } from "@/router";
import { getOAuthTokens } from "@/services/authService";
import { User } from "@/types";
import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useAuthStore = defineStore("auth", () => {
  const toast = useToast();

  const user = ref<User | null>(null);
  const isLoading = ref<boolean>(false);

  const getAuthTokens = async (authorizationCode: string) => {
    try {
      isLoading.value = true;
      const { data } = await getOAuthTokens(authorizationCode);
      localStorage.setItem("id_token", data.id_token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      const decoded = jwtDecode(data.id_token);
      localStorage.setItem("userData", JSON.stringify(decoded));
    } catch (error) {
      let message = "An error occured while logging you.";
      if (isAxiosError(error)) {
        message = error.message;
      }
      toast.error(message);
      setTimeout(() => {
        router.push(STATIC_ROUTES.home);
      }, 2000);
    } finally {
      isLoading.value = false;
    }
  };

  const loadUserProfile = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      user.value = JSON.parse(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userData");

    user.value = null;
  };

  const isAuthenticated = computed(() => Boolean(user.value));

  return {
    user,
    isLoading,
    isAuthenticated,
    getAuthTokens,
    loadUserProfile,
    logout,
  };
});
