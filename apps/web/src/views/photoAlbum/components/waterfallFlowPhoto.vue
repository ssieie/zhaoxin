<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { throttle } from "@blog/utils";
import {Photo, photoApis} from "/@/api/photo.ts";

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
          .map(() => {
            // 分页加载
            loadMoreHandler()
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
  createPhotoWrap(imgData);
}

const resizeHandlerThrottle = throttle(resizeHandler, 500, {
  leading: true,
  trailing: true,
});

const photoRef = ref<HTMLElement>();

function loadImg(div:HTMLDivElement){
  const img = document.createElement('img')
  img.style.objectFit = 'contain'
  img.style.width = '100%'
  img.style.height = '100%'
  img.classList.add('target-scale')
  img.src = div.getAttribute('data-preurl')!
  img.onload = function (){
    div.style.backgroundColor = 'unset'
  }
  img.onerror = function (){
    img.src = "data:image/png;base64,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"
  }

  const highQualityImg = document.createElement('img')
  highQualityImg.style.objectFit = 'cover'
  highQualityImg.style.width = '100%'
  highQualityImg.style.height = '100%'
  highQualityImg.classList.add('target-scale')
  highQualityImg.src = div.getAttribute('data-url')!

  highQualityImg.onload = function (){
    img.src = highQualityImg.src
  }

  div.appendChild(img)
}

// 10
let rowTotalHeight = 0;
let currentTopContext:Record<number, number> = {};
let isOneLine = true;

let currentIdx = 0;
function createPhotoWrap(arr: Photo[]) {
  // 处理宽高
  arr = arr.map(foo => {
    const aspectRatio = foo.height / foo.width; // 计算宽高比
    const newHeight = Math.round(getColInfo.value.width * aspectRatio);


    return {
      ...foo,
      width: getColInfo.value.width,
      height: newHeight
    };
  });

  let rowMaxHeight = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    rowMaxHeight = Math.max(rowMaxHeight, arr[i].height);
    let div = document.createElement("div");
    div.style.width = getColInfo.value.width + "px";
    div.style.height = arr[i].height + "px";
    div.style.position = "absolute";
    div.style.opacity = '0';
    div.style.overflow = 'hidden';
    if (isOneLine) {
      div.style.top = "0";
    } else {
      div.style.top = currentTopContext[currentIdx] + "px";
    }
    if (Reflect.has(currentTopContext, currentIdx)) {
      currentTopContext[currentIdx] =
        currentTopContext[currentIdx] + arr[i].height + 10;
    } else {
      currentTopContext[currentIdx] = arr[i].height + 10;
    }
    if (currentIdx === 0) {
      div.style.left = "0";
    } else {
      div.style.left =
        currentIdx * getColInfo.value.width + 10 * currentIdx + "px";
    }
    div.style.background = "#f3f4f6";

    div.setAttribute('data-preurl',arr[i].previewUrl)
    div.setAttribute('data-url',arr[i].photoUrl)

    loadImg(div)
    // div.innerHTML = i;
    ob.observe(div);
    photoRef.value?.appendChild(div);

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
  photoRef.value!.style.height = maxT + "px";
}

let imgData:Photo[] = [];
let more = ref(true)
const page = ref({
  page: 1,
  pageSize: 20,
})
const loadMoreHandler = () => {
  if (more.value){
    page.value.page++
    photoApis().new(page.value).then((res:RequestResponse<Photo[]>)=>{
      if (res.status === 200){
        if (res.data.length === 0){
          more.value = false
          loadMoreOb.unobserve(loadMoreRef.value)
        }
        more.value = res.data.length > 0
        imgData.push(...res.data)
        createPhotoWrap(res.data);
      }
    })
  }
}
onMounted(() => {
  currentW.value = +photoRef.value.clientWidth;
  window.addEventListener("resize", resizeHandlerThrottle);

  photoApis().new(page.value).then((res:RequestResponse<Photo[]>)=>{
    if (res.status === 200){
      if (res.data.length > 0){
        more.value = true
        loadMoreOb.observe(loadMoreRef.value)
      }
      imgData.push(...res.data)
      createPhotoWrap(imgData);
    }
  })
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandlerThrottle);
});
</script>

<template>
  <div>
    <div class="wrap relative" ref="photoRef"></div>
    <div class="waterfall relative h-60px m-t-20px" ref="loadMoreRef" v-if="more">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped></style>
