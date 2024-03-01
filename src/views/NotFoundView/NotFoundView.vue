<template>
  <div class="container">
    <img :src="notFoundPageImage" alt="not found page" />
  </div>
</template>

<script setup lang="ts">
import notFoundPageImage from "@/assets/not-found-page.png";
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;

  img {
    margin-top: 40px;
    max-width: 600px;
    width: 100%;
  }
}
</style>
