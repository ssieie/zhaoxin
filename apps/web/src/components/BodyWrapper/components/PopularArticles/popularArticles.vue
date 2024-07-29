<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { articleApi } from "/@/api/article.ts";

const { theme }: any = inject("theme");

const dogUri = computed(() => {
  return theme.value === "light" ? "dog-pic-light" : "dog-pic-dark";
});

const hotList = ref<Record<"title" | "id", string>[]>([]);

onMounted(() => {
  articleApi()
    .hotList()
    .then((res: RequestResponse<Record<"title" | "id", string>[]>) => {
      if (res.status === 200) {
        hotList.value = res.data;
      }
    });
});
</script>

<template>
  <div class="h-auto md:sticky md:top-30px md:m-t-20px">
    <div class="flex items-center m-b-16px md:m-b-30px">
      <span
        class="inline-block i-tabler-christmas-tree text-26px font-black color-#06b6d4 dark:color-#67e8f9 switch-animation"
      ></span>
      <span
        class="alibbph text-18px p-l-4px color-#06b6d4 dark:color-#67e8f9 tracking-2px switch-animation"
        >热门内容</span
      >
    </div>
    <div class="p-l-20px m-l-16px md:m-l-0 alibbph">
      <div
        v-for="(i, idx) in hotList" :key="i.id"
        :style="{
          '--focus-in-expand-animation-delay': (idx + 1) * 0.16 + 's',
        }"
        class="text-16px font-700 title-text-base m-b-12px select-none relative fade-in-top"
      >
        <span class="text-shadow-drop-right-h cursor-pointer title-wrap"
          >{{ i.title }}</span
        >
        <span
          class="absolute title-arrow i-tabler-arrow-right text-24px color-#1d4ed8 dark:color-#3b82f6 switch-animation"
        ></span>
      </div>
    </div>
    <div
      class="w-170px h-127px m-t-30px dog-pic m-auto md:m-none"
      :class="dogUri"
    ></div>
  </div>
</template>

<style scoped lang="sass">
.title-wrap
  &:hover + .title-arrow
    left: -30px


.title-arrow
  left: -36px
  top: 1px
  transition: all .1s ease-in-out


.dog-pic-light
  background: url("../../../../assets/images/run-dog.png") no-repeat center

.dog-pic-dark
  background: url("../../../../assets/images/run-dog-dark.png") no-repeat center

.dog-pic
  background-size: contain
  z-index: 1
</style>
