<template>
  <div class="movie-score">
    <v-icon
      icon="fa:fas fa-star"
      size="small"
      class="movie-score-icon"
    ></v-icon>
    <div class="movie-score-value">{{ score }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

type Props = {
  score: number;
};

defineProps<Props>();
</script>

<style scoped lang="less">
.movie-score {
  display: flex;
  align-items: center;

  .movie-score-icon {
    color: #ffcb00;
    margin-right: 8px;
    transition: 500ms;
  }
  .movie-score-value {
    font-weight: 700;
  }
}
</style>
