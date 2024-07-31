<script setup lang="ts">
import {getCurrentInstance, nextTick} from "vue";
import type { ComponentInternalInstance } from "vue";
import { onMounted, ref } from "vue";
import { Article, articleApi } from "/@/api/article.ts";
import {removeT} from "@blog/utils";
import {useArticle} from "/@/components/BodyWrapper/components/ArticleList/articleUtils.ts";

const article = useArticle()

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const articleRefs = ref<Array<any>>([]);

let currentIdx = 0;
const ob = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => {
        const article = entry.target;
        article.classList.add("slide-in-top");
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

const articleList = ref<Article[]>([]);

onMounted(() => {
  articleApi()
    .list()
    .then((res: RequestResponse<Article>) => {
      if (res.status === 200) {
        proxy.$notyf.success(res.message);
        articleList.value = removeT(res.data)
        nextTick(()=>{
          for (const el of articleRefs.value) {
            ob.observe(el);
          }
        })
      }
    });
});
</script>

<template>
  <div
    v-for="(i, idx) in articleList"
    :ref="
      (e: any) => {
        if (e) articleRefs[idx] = e;
      }
    "
    @click="article.toDetails(i.id)"
    class="m-b-40px select-none cursor-pointer opacity-0"
  >
    <p
      class="inline-block text-20px alibbph font-600 title-text-base m-b-10px relative underline-animation-target"
    >
      <span>{{i.title}}</span>
      <span class="underline-animation underline-base"></span>
    </p>
    <div class="desc-text-base text-16px alibbph m-b-10px text-pretty break-all">
      {{i.describe}}
    </div>
    <div class="desc-text-base text-14px alibbph m-b-10px flex ">
      <span class="inline-block i-tabler-flame text-22px font-black color-red dark:color-orange switch-animation"></span>
      <span class="self-end p-r-8px color-red dark:color-orange">{{i.heat}}</span>
      <span class="self-end">更新时间:</span>
      <span class="p-l-6px self-end">{{i.updateTime}}</span>
    </div>
    <div class="text-14px font-nss desc-text-base font-bold flex items-center">
      <span class="read-more p-r-4px">Read More</span>
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
</template>

<style scoped>
.chevron {
  display: none;
}

.read-more:hover + .chevron-wrap .chevron {
  display: block;
}
</style>
