<script setup lang="ts">
import {triggerSoundEffect} from "@blog/utils";
import a from '/@/assets/audio/bubbling.mp3'
import {onMounted, ref} from "vue";
import {articleApi, HotCategoryList} from "/@/api/article.ts";
import {useArticle} from "/@/components/BodyWrapper/components/ArticleList/articleUtils.ts";

const article = useArticle()

const hotCategoryList = ref<HotCategoryList[]>([])

const blockMouseenterHandler = () => {
  triggerSoundEffect(a)
}

onMounted(()=>{
  articleApi().hotCategoryList().then((res:RequestResponse<HotCategoryList[]>)=>{
    if (res.status === 200){
      hotCategoryList.value = res.data
    }
  })
})
</script>

<template>
  <div class="">
    <div class="flex items-center m-b-16px md:m-b-30px">
      <span
        class="inline-block i-tabler-category-2 text-26px font-black color-#06b6d4 dark:color-#67e8f9 switch-animation"
      ></span>
      <span
        class="alibbph text-18px p-l-4px color-#06b6d4 dark:color-#67e8f9 tracking-2px switch-animation"
        >热门类别</span
      >
    </div>
    <div class="flex flex-wrap gap-12px">
      <div
        v-for="(i, idx) in hotCategoryList"
        :key="i.cId"
        :style="{
          '--focus-in-expand-animation-delay': (idx + 1) * 0.16 + 's',
        }"
        @mouseenter="blockMouseenterHandler"
        @click="article.toOtherPage('/category', { id: i.cId })"
        class="alibbph cate-block scale-in-center p-6px p-l-10px p-r-10px cursor-pointer select-none rounded-lg color-#475569 bg-#e5e7eb hover:bg-#a8a29e dark:hover:bg-#71717a dark:bg-#334155 dark:color-#cbd5e1 switch-animation text-13px"
      >
        {{ i.cName }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
</style>
