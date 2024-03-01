<template>
  <div>
    <div class="text-h5 mb-3">Top Movies</div>
    <div
      class="list"
      ref="scrollableContainer"
      @scroll="handleScroll"
      :style="{
        maskImage: `linear-gradient(to right, transparent 0%, black ${
          isLeftOverflowing ? 48 : 0
        }px, black calc(100% - ${
          isRightOverflowing ? 48 : 0
        }px), transparent 100%)`,
      }"
    >
      <template v-if="!loading">
        <TopTenPopularMoviesItem
          v-for="(movie, index) in movies"
          :key="movie.id"
          :movie="movie"
          :index="index"
          :hoveredItemIndex="hoveredItemIndex"
          :setHoveredItemIndex="
            (indexValue) => {
              hoveredItemIndex = indexValue;
            }
          "
        />
      </template>
      <SkeletonLoader v-else height="180px" width="100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMovies } from "@/services/moviesService";
import { Movie } from "@/types";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import TopTenPopularMoviesItem from "./TopTenPopularMoviesItem.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const movies = ref<Movie[]>([]);
const loading = ref(true);
const scrollableContainer = ref<HTMLDivElement>();
const isLeftOverflowing = ref<boolean>(false);
const isRightOverflowing = ref<boolean>(false);
const hoveredItemIndex = ref<number>();

const toast = useToast();

onMounted(() => {
  loadMovies().then(() => {
    if (scrollableContainer.value) {
      handleSetOverflow(scrollableContainer.value);
    }
  });
});

const loadMovies = async () => {
  try {
    loading.value = true;
    const { data } = await getMovies("popular", 1);
    movies.value = data.results.slice(0, 10);
  } catch (error) {
    toast.error("An error occurred while loading the movies.");
  } finally {
    loading.value = false;
  }
};

const handleScroll = (e: Event) => {
  const el = e.target as HTMLDivElement | null;
  if (el) {
    handleSetOverflow(el);
  }
};

const handleSetOverflow = (el: HTMLDivElement) => {
  const isScrolledToRightValue =
    el.scrollWidth < el.clientWidth + el.scrollLeft + 1;
  isRightOverflowing.value = !isScrolledToRightValue;
  const isScrolledToLeftValue = isScrolledToRightValue
    ? false
    : el.scrollLeft === 0;
  isLeftOverflowing.value = !isScrolledToLeftValue;
};
</script>

<style scoped lang="less">
.list {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  & > div:not(.skeleton) {
    margin-right: 16px;
  }
}
</style>
