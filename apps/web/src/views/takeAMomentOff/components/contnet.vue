<script setup lang="ts">
import News from "/@/views/takeAMomentOff/components/news.vue";
import IframeViewer from "/@/views/takeAMomentOff/components/iframeViewer.vue";
import { ref } from "vue";

const iframeViewerRef = ref();
const wrapClick = (name: string) => {
  iframeViewerRef.value.viewer(location.origin + name);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-20px">
    <div
      class="row-span-14 md:row-span-2 col-span-1 wrap1 card cursor-pointer bg-#f9fafb"
      @click="wrapClick('/1.html')"
    ></div>
    <div
      class="row-span-14 md:row-span-2 col-span-1 wrap2 card cursor-pointer bg-#f9fafb"
      @click="wrapClick('/2.html')"
    ></div>
    <div class="row-span-4 col-span-1 h-600px card bg-#f9fafb">
      <news />
    </div>
    <div
        class="row-span-14 md:row-span-2 col-span-1 wrap3 card cursor-pointer bg-#f9fafb"
        @click="wrapClick('/3.html')"
    ></div>
    <div
        class="row-span-14 md:row-span-2 col-span-1 wrap4 card cursor-pointer bg-#f9fafb"
        @click="wrapClick('/4.html')"
    ></div>
<!--    <div class="row-span-2 col-span-2 card cursor-pointer bg-#f9fafb">04</div>-->
<!--    <div class="row-span-2 col-span-2 card cursor-pointer bg-#f9fafb">05</div>-->
<!--    <div class="row-span-2 col-span-2 card cursor-pointer bg-#f9fafb">06</div>-->
  </div>
  <iframe-viewer ref="iframeViewerRef" />
</template>

<style scoped lang="less">
.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 0 1.8px rgba(0, 0, 0, 0.023),
    0 0 4.1px rgba(0, 0, 0, 0.034),
    0 0 7.4px rgba(0, 0, 0, 0.041),
    0 0 12.2px rgba(0, 0, 0, 0.049),
    0 0 20.1px rgba(0, 0, 0, 0.056),
    0 0 35.1px rgba(0, 0, 0, 0.067),
    0 0 76px rgba(0, 0, 0, 0.09);
}

.wrap1 {
  background-image: url("/@/assets/images/cover-image/1.png");
  background-size: cover;
  background-position: center;
}

.wrap2 {
  background-image: url("/@/assets/images/cover-image/2.png");
  background-size: cover;
  background-position: center;
}
.wrap3 {
  background-image: url("/@/assets/images/cover-image/3.png");
  background-size: cover;
  background-position: center;
}
.wrap4 {
  background-image: url("/@/assets/images/cover-image/4.png");
  background-size: cover;
  background-position: center;
}
</style>
