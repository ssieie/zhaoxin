<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import CategoryItem from "/@/views/category/components/categoryItem.vue";


const categoryList = [
  {name:'JavaScript',articleList:[1,2]},
  {name:'Vue',articleList:[1,2,3]},
  {name:'Rust',articleList:[1,2,3,4]},
  {name:'代码之外',articleList:[1,2,3]},
]

</script>

<template>
  <div class="bg-base min-h-dvh">
    <div class="sticky top-0 bg-base z-9999 p-b-30px">
      <navigation-bar />
    </div>
    <div class="p-b-20px md:p-b-60px m-t-20px  md:m-t-100px">
      <CategoryItem v-for="i in categoryList" :key="i.name" :category-info="i" />
    </div>
  </div>
</template>

<style scoped>

</style>