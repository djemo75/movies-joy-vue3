<template>
  <div class="container">
    <div class="inner-container">
      <div class="description">
        MoviesJoy is a Free Movies streaming site with zero ads. We let you
        watch movies online without having to register or paying, with over
        10000 movies and TV-Series. You can also Download full movies from
        MoviesJoy and watch it later if you want.
      </div>
      <div class="app-logo">© MoviesJoy</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.container {
  background: #000;
  margin-top: 60px;

  .inner-container {
    max-width: 800px;
    margin: 0 auto;
    padding-top: 16px;
    padding-bottom: 16px;

    .description {
      font-size: 14px;
      color: rgb(72, 72, 72);
    }

    .app-logo {
      font-weight: 500;
      text-align: center;
      margin-top: 12px;
    }
  }
}
</style>
