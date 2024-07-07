<script setup lang="ts">
import { onBeforeUnmount, ref, onMounted } from "vue";

const objectOfReferenceRef = ref();
const scrollRef = ref();

const ob = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      scrollRef.value.classList.remove("active");
    } else {
      scrollRef.value.classList.add("active");
    }
  },
  {
    threshold: 0,
  },
);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  ob.observe(objectOfReferenceRef.value);
});

onBeforeUnmount(() => {
  ob.unobserve(objectOfReferenceRef.value);
});
</script>

<template>
  <div class="pointer-events-none">
    <div class="absolute top-30% -z-9999" ref="objectOfReferenceRef"></div>
    <div
        @click="scrollToTop"
        ref="scrollRef"
        class="top cursor-pointer flex items-center justify-center fixed right-10px bottom-10px md:right-40px md:bottom-40px w-40px h-40px rounded-lg bg-#2563eb dark:bg-#3b82f6"
    >
      <span class="i-tabler-chevron-up text-26px font-black color-#fff"></span>
    </div>
  </div>
</template>

<style scoped>
.top {
  transition: opacity ease-in-out .5s;
  opacity: 0;
  pointer-events: none;
}

.active {
  opacity: 1;
  pointer-events: auto;
}
</style>
