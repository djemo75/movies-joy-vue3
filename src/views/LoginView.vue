<template>
  <div class="loading-container">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { STATIC_ROUTES } from "@/router";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/stores";

import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const route = useRoute();
const code = route.query.code as string;

const toast = useToast();
const authStore = useAuthStore();

onMounted(() => {
  if (code) {
    getTokens();
  }
});

const getTokens = async () => {
  try {
    await authStore.getAuthTokens(code);
    await authStore.loadUserProfile();
    router.push(STATIC_ROUTES.home);
  } catch (error) {
    let message = "An error occured while logging you.";
    if (isAxiosError(error)) {
      message = error.message;
    }
    toast.error(message);
    setTimeout(() => {
      router.push(STATIC_ROUTES.home);
    }, 2000);
  }
};
</script>

<style scoped lang="less">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
