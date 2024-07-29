<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {aboutApi} from "/@/api/about.ts";

const sleep = (timeout = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, timeout);
  });
};

let typingTimeout: number | null = null;
let flag = true;
let currentIndex = 0;
const displayedText = ref("");
const fullTextList = ref<string[]>([])
let fullText = ''
let fullTextIdx = 0;
const startTyping = async () => {
  if (flag && currentIndex === fullText.length) {
    flag = false;
    await sleep();
  }
  if (!flag && currentIndex === 0) {
    flag = true;
    fullTextIdx++;
    fullText = fullTextList.value[fullTextIdx % fullTextList.value.length];
  }
  if (flag) {
    displayedText.value += fullText.charAt(currentIndex);
    currentIndex++;
  } else {
    currentIndex--;
    displayedText.value = fullText.slice(0, currentIndex);
  }

  typingTimeout = window.setTimeout(startTyping, 100);
};

onMounted(() => {
  aboutApi().introduce().then((res:RequestResponse<Record<string, string>[]>)=>{
    if (res.status === 200){
      fullTextList.value = res.data.map(v=>v.text)
      fullText = fullTextList.value[0]
      setTimeout(() => {
        startTyping();
      }, 1000);
    }
  })
});
onBeforeUnmount(() => {
  clearTimeout(typingTimeout!);
});
</script>

<template>
  <div
    class="absolute left-0 bottom-0 w-530px h-188px z-2 text-#4b5563 dark:text-#94a3b8"
  >
    <div class="font-mono text-24px font-medium tracking-3px fade-in-top">
      Hi! 👋
    </div>
    <div
      class="font-mono text-22px font-medium tracking-3px fade-in-top"
      style="--focus-in-expand-animation-delay: 0.2s"
    >
      I'm 🐂🐎
    </div>
    <div
      class="alibbph text-18px font-400 tracking-3px fade-in-top h-30px"
      style="--focus-in-expand-animation-delay: 0.4s"
    >
      {{ displayedText }}<span class="blink-2 text-#0a0a0a">|</span>
    </div>
    <div
      class="text-18px font-300 tracking-3px fade-in-top alibbph"
      style="--focus-in-expand-animation-delay: 0.6s"
    >
      浅学
      <span
        class="font-nss font-bold bg-clip-text text-transparent bg-gradient-to-r from-#330867 to-#10b981 dark:from-#fef9d7 dark:to-#d299c2"
        >JavaScript</span
      >
      、
      <span
        class="font-nss font-bold bg-clip-text text-transparent bg-gradient-to-r from-#009efd to-#2af598"
        >Rust</span
      >
      .
    </div>
  </div>
</template>

<style scoped></style>
