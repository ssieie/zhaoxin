<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { throttle } from "@blog/utils";

const ob = new IntersectionObserver(
    (entries) => {
      entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const photo = entry.target;
            photo.classList.add("fade-in-fwd");
            ob.unobserve(photo);
          });
    },
    {
      threshold: 0.5,
    },
);

const loadMoreRef = ref()
const loadMoreOb = new IntersectionObserver(
    (entries) => {
      entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            // 分页加载
          });
    },
    {
      threshold: 1,
    },
);

const PHOTO_COL_MAP = {
  1100: {
    width: 1170 / 4,
    col: 4,
  },
  1000: {
    width: 1080 / 3,
    col: 3,
  },
  900: {
    width: 980 / 3,
    col: 3,
  },
  800: {
    width: 880 / 3,
    col: 3,
  },
  600: {
    width: 790 / 2,
    col: 2,
  },
};

const currentW = ref();

const getColInfo = computed<Record<"width" | "col", number>>(() => {
  if (currentW.value > 1100) return PHOTO_COL_MAP[1100];
  if (currentW.value > 1000) return PHOTO_COL_MAP[1000];
  if (currentW.value > 900) return PHOTO_COL_MAP[900];
  if (currentW.value > 800) return PHOTO_COL_MAP[800];
  if (currentW.value > 600) return PHOTO_COL_MAP[600];
  return {
    width: currentW.value,
    col: 1,
  };
});

function resizeHandler() {
  if (currentW.value === +photoRef.value.clientWidth) return;
  currentW.value = +photoRef.value.clientWidth;

  currentIdx = 0
  rowTotalHeight = 0;
  photoRef.value.innerHTML = "";
  currentTopContext = {};
  createPhotoWrap(testData);
}

const resizeHandlerThrottle = throttle(resizeHandler, 500, {
  leading: true,
  trailing: true,
});

const photoRef = ref<HTMLElement>();

// 10
let rowTotalHeight = 0;
let currentTopContext = {};
let isOneLine = true;

let currentIdx = 0;
function createPhotoWrap(arr: any[]) {
  let rowMaxHeight = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    rowMaxHeight = Math.max(rowMaxHeight, arr[i].h);
    let div = document.createElement("div");
    div.style.width = getColInfo.value.width + "px";
    div.style.height = arr[i].h + "px";
    div.style.position = "absolute";
    div.style.opacity = 0;
    if (isOneLine) {
      div.style.top = "0";
    } else {
      div.style.top = currentTopContext[currentIdx] + "px";
    }
    if (Reflect.has(currentTopContext, currentIdx)) {
      currentTopContext[currentIdx] =
        currentTopContext[currentIdx] + arr[i].h + 10;
    } else {
      currentTopContext[currentIdx] = arr[i].h + 10;
    }
    if (currentIdx === 0) {
      div.style.left = "0";
    } else {
      div.style.left =
        currentIdx * getColInfo.value.width + 10 * currentIdx + "px";
    }
    div.style.background = "#f3f4f6";

    div.innerHTML = arr[i].v;
    ob.observe(div);
    photoRef.value.appendChild(div);

    if (currentIdx === getColInfo.value.col - 1) {
      rowTotalHeight += rowMaxHeight + 10;
      rowMaxHeight = 0;
      currentIdx = 0;
      isOneLine = false;
    } else {
      currentIdx++;
    }
  }

  // if (currentIdx !== getColInfo.value.col) {
  //   rowTotalHeight += rowMaxHeight;
  // }
  let maxT = 0;
  for (const h of Object.values(currentTopContext)) {
    maxT =Math.max(maxT, +h);
  }
  photoRef.value.style.height = maxT + "px";
}

const test = () => {
  createPhotoWrap([
    { w: 100, h: 300, v: "14" },
    { w: 100, h: 400, v: "15" },
    { w: 100, h: 500, v: "16" },
    { w: 100, h: 300, v: "17" },
  ])

  testData.push(...[
    { w: 100, h: 300, v: "14" },
    { w: 100, h: 400, v: "15" },
    { w: 100, h: 500, v: "16" },
    { w: 100, h: 300, v: "17" },
  ])
}

let testData = [
  { w: 100, h: 300, v: "1" },
  { w: 100, h: 400, v: "2" },
  { w: 100, h: 500, v: "3" },
  { w: 100, h: 300, v: "4" },

  { w: 100, h: 300, v: "5" },
  { w: 100, h: 400, v: "6" },
  { w: 100, h: 500, v: "7" },
  { w: 100, h: 300, v: "8" },

  { w: 100, h: 500, v: "9" },
  { w: 100, h: 300, v: "10" },
  { w: 100, h: 300, v: "11" },
  { w: 100, h: 400, v: "12" },

  { w: 100, h: 200, v: "13" },
];
onMounted(() => {
  currentW.value = +photoRef.value.clientWidth;
  window.addEventListener("resize", resizeHandlerThrottle);

  createPhotoWrap(testData);

  loadMoreOb.observe(loadMoreRef.value)
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandlerThrottle);
});
</script>

<template>
  <div>
    <div class="wrap relative" ref="photoRef"></div>
    <div class="waterfall relative h-60px m-t-20px" ref="loadMoreRef">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped></style>
