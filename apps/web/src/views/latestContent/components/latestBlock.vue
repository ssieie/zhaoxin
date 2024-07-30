<script setup lang="ts">
import {computed, nextTick, onMounted, ref} from "vue";
import {Article, articleApi} from "/@/api/article.ts";
import {removeT} from "@blog/utils";
import {useArticle} from "/@/components/BodyWrapper/components/ArticleList/articleUtils.ts";

const article = useArticle()

const articleRefs = ref<Array<HTMLElement>>([]);

let currentIdx = 0;
const ob = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => {
        const article = entry.target;
        article.classList.add("fade-in-fwd");
        // @ts-ignore
        article.style.setProperty(
          "--focus-in-expand-animation-delay",
          `${(currentIdx + 1) * 0.3}s`,
        );
        currentIdx++;
        setTimeout(() => {
          currentIdx--;
        }, 300);
        ob.unobserve(article);
      });
  },
  {
    threshold: 0.5,
  },
);

const articleListAll = ref<Article[]>([])

const articleListCount = computed(()=>{
  return articleListAll.value.length
})

onMounted(() => {

  articleApi().listAll().then((res:RequestResponse<Article[]>)=>{
    if (res.status === 200){
      articleListAll.value = removeT<Article>(res.data)

      nextTick(()=>{
        for (const el of articleRefs.value) {
          ob.observe(el);
        }
      })
    }
  })
});
</script>

<template>
  <div class="m-auto header-w alibbph p-b-40px md:p-b-80px">
    <div
      class="flex justify-between items-end m-t-20px m-b-30px md:m-t-60px text-30px font-700 title-text-base"
    >
      <span>最新内容</span>
      <span class="text-18px font-300">{{articleListCount}}&nbsp;篇文章</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="(i, idx) in articleListAll"
        :key="i.id"
        :ref="
          (e: any) => {
            if (e) articleRefs[idx] = e;
          }
        "
        @click="article.toDetails(i.id)"
        class="bg-white dark:bg-#1e293b desc-text-base p-20px rounded-lg shadow-lg dark:shadow-none cursor-pointer read-more opacity-0"
      >
        <div class="font-600 text-20px m-b-12px title">{{ i.title }}</div>
        <div class="font-300 text-16px m-b-10px break-all">
          {{i.describe}}
        </div>
        <div class="m-b-8px text-14px">
          <span class="self-end">更新时间:</span>
          <span class="p-l-6px self-end">{{i.updateTime}}</span>
        </div>
        <div
          class="font-nss text-14px desc-text-base font-bold flex items-center chevron-block"
        >
          <span class="p-r-4px">Read More</span>
          <div class="flex items-center chevron-wrap">
            <span
              class="chevron inline-block i-tabler-chevron-right slide-right"
              style="--focus-in-expand-animation-delay: 0.1s"
            ></span>
            <span
              class="chevron inline-block i-tabler-chevron-right -m-l-6px slide-right"
              style="--focus-in-expand-animation-delay: 0.2s"
            ></span>
            <span
              class="chevron inline-block i-tabler-chevron-right -m-l-6px slide-right"
              style="--focus-in-expand-animation-delay: 0.3s"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chevron {
  display: none;
}

.read-more:hover .chevron-block .chevron-wrap .chevron {
  display: block;
}

.read-more:hover .title {
  color: #6366f1;
}
</style>
