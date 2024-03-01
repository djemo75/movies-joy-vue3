<template>
  <div class="brand-text" @click="redirectToHome">MoviesJoy</div>
</template>

<script setup lang="ts">
import { STATIC_ROUTES } from "@/router";
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToHome = () => {
  router.push(STATIC_ROUTES.home);
};
</script>

<style scoped>
.brand-text {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  min-width: 320px;
}
</style>
