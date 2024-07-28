<script setup lang="ts">
import {getCurrentInstance, nextTick} from "vue";
import type { ComponentInternalInstance } from "vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

import { onMounted, ref } from "vue";
import { Article, articleApi } from "/@/api/article.ts";

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
        articleList.value = res.data
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
    class="m-b-40px select-none cursor-pointer opacity-0"
  >
    <p
      class="inline-block text-18px alibbph font-600 title-text-base m-b-10px relative underline-animation-target"
    >
      <span>{{i.title}}</span>
      <span class="underline-animation underline-base"></span>
    </p>
    <div class="desc-text-base text-15px alibbph m-b-10px text-pretty">
      {{i.describe}}
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
