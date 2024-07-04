<script setup lang="ts">
import ArticleList from "/@/components/BodyWrapper/components/ArticleList/articleList.vue";
import CategoryCard from "/@/components/BodyWrapper/components/CategoryCard/categoryCard.vue";
import PopularArticles from "/@/components/BodyWrapper/components/PopularArticles/popularArticles.vue";
</script>

<template>
  <div class="flex gap-20px md:gap-80px m-auto header-w m-t-18px flex-wrap md:flex-nowrap">
    <ArticleList class="basis-1/1 md:basis-7/10" />
    <div class="basis-1/1 md:basis-3/10 flex gap-18px flex-col">
      <CategoryCard />
      <PopularArticles />
    </div>
  </div>
</template>

<style scoped></style>
