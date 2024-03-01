<template>
  <div
    class="skeleton"
    :style="{
      width: props.width,
      height: props.height,
      borderRadius: props.borderRadius,
    }"
  ></div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
type Props = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
};

const props = defineProps<Props>();
</script>

<style scoped lang="less">
.skeleton {
  background: #eee;
  background: linear-gradient(110deg, #303030 8%, #333333 18%, #303030 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
