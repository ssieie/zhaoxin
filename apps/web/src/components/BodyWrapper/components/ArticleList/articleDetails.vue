<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import { inject, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Article, articleApi } from "/@/api/article.ts";
import { useArticle } from "/@/components/BodyWrapper/components/ArticleList/articleUtils.ts";
import CustomMdPreview from "/@/components/mdPreview/customMdPreview.vue";

const { theme }: any = inject("theme");

const articleUtils = useArticle();

const headerBg = ref(true);

watch(
  () => theme.value,
  () => {
    headerBg.value = false;
    setTimeout(() => {
      headerBg.value = true;
    }, 350);
  },
);

const route = useRoute();

const articleInfo = ref<Article>({});

onMounted(() => {
  if (route.query.id) {
    //
    articleApi()
      .details(route.query.id)
      .then((res: RequestResponse<Article>) => {
        if (res.status === 200) {
          articleInfo.value = res.data;
        }
      });
  }
});
</script>

<template>
  <div class="bg-base min-h-dvh relative">
    <div
      class="sticky top-0 z-9999 p-b-30px header switch-animation"
      :class="headerBg ? 'custom-header' : ''"
    >
      <navigation-bar :anim="false" />
    </div>
    <div
      class="m-auto header-w p-b-20px md:p-b-60px m-t-20px md:m-t-60px title-text-base"
    >
      <div class="flex items-center gap-6px">
        <span
          class="cursor-pointer color-#4b5563 dark:color-#d1d5db switch-animation"
          @click="articleUtils.toOtherPage('/')"
          >首页</span
        >
        <i
          class="i-tabler-chevron-right text-20px font-black color-#a1a1aa dark:color-#d1d5db switch-animation"
        ></i>
        <span
          class="cursor-pointer color-#4b5563 dark:color-#d1d5db switch-animation"
          @click="articleUtils.toOtherPage('/category')"
          >分类</span
        >
        <i
          class="i-tabler-chevron-right text-20px font-black color-#a1a1aa dark:color-#d1d5db switch-animation"
        ></i>
        <span
          class="cursor-pointer color-#4b5563 dark:color-#d1d5db switch-animation"
          @click="
            articleUtils.toOtherPage('/category', { id: articleInfo.cId })
          "
          >{{ articleInfo.cName }}</span
        >
      </div>
      <div
        class="m-t-10px md:m-t-20px p-b-20px md:p-b-40px text-26px md:text-30px font-bold tracking-4px"
      >
        {{ articleInfo.title }}
      </div>

      <CustomMdPreview
        :id="articleInfo.id + 'articleInfo'"
        :content="articleInfo.text"
      />

      <div class="flex justify-center m-t-20px md:m-t-60px m-b-20px md:m-b-40px">
        <div class="w-100px h-100px bg-#416475"></div>
      </div>
      <div class="flex flex-col items-end gap-16px">
        <div class="flex items-center">
          <span
            class="inline-block i-tabler-flame text-32px font-black color-red dark:color-orange switch-animation"
          ></span>
          <span
            class="self-end p-r-8px font-zqh text-30px p-l-8px color-#6b7280 dark:color-#7dd3fc switch-animation"
            >{{ articleInfo.heat }}</span
          >
        </div>
        <div class="text-14px">
          <span class="p-r-8px">最后修改:</span>
          <span>{{ articleInfo.updateTime?.replace("T", " ") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.light .custom-header.header {
  background-image: radial-gradient(transparent 1px, #f8fafc 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

.dark .custom-header.header {
  background-image: radial-gradient(transparent 1px, #020617 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}
</style>
