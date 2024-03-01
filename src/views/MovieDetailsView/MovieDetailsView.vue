<template>
  <div>
    <v-container class="big-container">
      <v-row>
        <v-col cols="12" md="9" sm="12">
          <MovieDetailsSection />
        </v-col>
        <v-col cols="12" md="3" sm="12"><RecommendationsSection /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import MovieDetailsSection from "./components/MovieDetailsSection.vue";
import RecommendationsSection from "./components/RecommendationsSection.vue";
</script>

<style scoped lang="less">
.loading-container {
  display: flex;
  justify-content: center;
}
</style>
