<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Article, articleApi } from "/@/api/article.ts";
import { useArticle } from "/@/components/BodyWrapper/components/ArticleList/articleUtils.ts";
import CustomMdPreview from "/@/components/mdPreview/customMdPreview.vue";
import { triggerSoundEffect } from "@blog/utils";
import a from "/@/assets/audio/glitch-bass-101008.mp3";
import b from "/@/assets/audio/success-68578.mp3";
import heart0 from "/@/assets/images/heart/heart0.png";
import heart1 from "/@/assets/images/heart/heart1.png";
import heart2 from "/@/assets/images/heart/heart2.png";
import heart3 from "/@/assets/images/heart/heart3.png";
import heart4 from "/@/assets/images/heart/heart4.png";
import heart5 from "/@/assets/images/heart/heart5.png";
import heart6 from "/@/assets/images/heart/heart6.png";
import heart7 from "/@/assets/images/heart/heart7.png";
import heart8 from "/@/assets/images/heart/heart8.png";
import heart9 from "/@/assets/images/heart/heart9.png";
import { useThemeChange } from "/@/hooks/useThemeChange/useThemeChange.ts";
import Comment from "/@/components/BodyWrapper/components/ArticleList/comment/comment.vue";
import { RequestResponse } from "/@/types/global";

const articleUtils = useArticle();

const { headerBg } = useThemeChange();

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
          commentRef.value.load(res.data.id)
        }
      });
  }
});

const heartList = [
  heart0,
  heart1,
  heart2,
  heart3,
  heart4,
  heart5,
  heart6,
  heart7,
  heart8,
  heart9,
];
const heartWrapRef = ref<HTMLElement>();
const currentClickNumber = ref(0);
const heartUp = () => {
  if (currentClickNumber.value === 9) return;

  const span = document.createElement("span");
  span.innerHTML = "+1";
  span.classList.add("increase-one");
  span.classList.add("slide-out-top");
  let flag = +new Date() + "";
  span.setAttribute("flag", flag);

  setTimeout(() => {
    const spanWithFlag = heartWrapRef.value?.querySelector(
      `span[flag="${flag}"]`,
    );
    if (spanWithFlag) {
      spanWithFlag.remove();
    }
  }, 2000);

  heartWrapRef.value?.appendChild(span);

  currentClickNumber.value += 1;

  articleInfo.value.likeNumber += 1;

  if (currentClickNumber.value === 9) {
    triggerSoundEffect(b);
    addLike();
  } else {
    triggerSoundEffect(a);
  }
};

const addLike = () => {
  articleApi()
    .giveTheThumbsUp(articleInfo.value.id)
    .then(() => {});
};

const commentRef = ref();
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
        class="m-t-10px md:m-t-20px p-b-20px md:p-b-40px text-26px md:text-30px font-bold tracking-4px flex items-center"
      >
        <span>{{ articleInfo.title }}</span>
        <div class="flex items-center text-20px md:text-20px">
          <span
            class="inline-block i-tabler-flame text-32px font-black color-red dark:color-orange switch-animation"
          ></span>
          <span
            class="self-end p-r-8px font-zqh p-l-8px color-#6b7280 dark:color-#7dd3fc tracking-2px switch-animation"
            >{{ articleInfo.heat }}</span
          >
        </div>
      </div>

      <CustomMdPreview
        :id="articleInfo.id + 'articleInfo'"
        :content="articleInfo.text"
      />

      <div
        class="flex justify-between flex-col items-center m-t-20px md:m-t-60px m-b-20px md:m-b-40px gap-12px"
      >
        <div class="flex flex-col items-center gap-12px">
          <div class="relative" ref="heartWrapRef">
            <img
              @click="heartUp"
              alt=""
              :src="heartList[currentClickNumber % 10]"
              class="w-80px cursor-pointer heart md:w-120px"
              :class="currentClickNumber === 9 ? 'heartbeat' : ''"
            />
          </div>
          <div class="color-#fca5a5 dark:color-#ffedd5 text-30px font-zqh">
            {{ articleInfo.likeNumber }}
          </div>
        </div>
        <div class="flex flex-col items-center gap-12px">
          <div class="text-14px">
            <span class="p-r-8px">最后修改:</span>
            <span class="font-zqh tracking-2px">{{
              articleInfo.updateTime?.replace("T", " ")
            }}</span>
          </div>
        </div>
      </div>

      <comment ref="commentRef" />
    </div>
  </div>
</template>

<style scoped lang="less">
.heart {
  object-position: center;
  object-fit: contain;
}
</style>
