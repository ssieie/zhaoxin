<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import CategoryItem from "/@/views/category/components/categoryItem.vue";
import { nextTick, onMounted, ref } from "vue";
import { Article, articleApi } from "/@/api/article.ts";
import {removeT} from "@blog/utils";

interface CategoryList {
  name: string;
  articleList: Article[];
}

const categoryList = ref<CategoryList[]>([]);

onMounted(() => {
  articleApi()
    .listAll()
    .then((res: RequestResponse<Article[]>) => {
      if (res.status === 200) {
        const map: Record<string, Article[]> = {};
        for (const foo of removeT<Article>(res.data)) {
          if (map[foo.cName]) {
            map[foo.cName].push(foo);
          } else {
            map[foo.cName] = [foo];
          }
        }

        for (const mapKey in map) {
          categoryList.value.push({
            name: mapKey,
            articleList: map[mapKey],
          });
        }
      }
    });
});
</script>

<template>
  <div class="bg-base min-h-dvh">
    <div class="sticky top-0 bg-base z-9999 p-b-30px">
      <navigation-bar />
    </div>
    <div class="p-b-20px md:p-b-60px m-t-20px md:m-t-60px">
      <CategoryItem
        v-for="i in categoryList"
        :key="i.name"
        :category-info="i"
      />
    </div>
  </div>
</template>

<style scoped></style>
