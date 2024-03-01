<template>
  <div class="links">
    <router-link :to="STATIC_ROUTES.home">Movies</router-link>
    <router-link :to="STATIC_ROUTES.notFound">Series</router-link>
  </div>
</template>

<script setup lang="ts">
import { STATIC_ROUTES } from "@/router";
</script>

<style scoped lang="less">
.links {
  a {
    font-weight: bold;
    color: #8e8b8b;
    text-decoration: none;
    margin-right: 32px;
    transition: 200ms ease-in-out;

    &.router-link-exact-active {
      color: #fff;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>
