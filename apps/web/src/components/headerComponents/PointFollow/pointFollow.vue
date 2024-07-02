<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Uhuhuh from "/@/components/headerComponents/PointFollow/pointFollow.ts";
import InfoCard from "/@/components/headerComponents/InfoCard/infoCard.vue";

const { theme }: any = inject("theme");

const pointFollowRef = ref(null);
let uhuhuh: Uhuhuh | null = null;

watch(
  () => theme.value,
  () => {
    if (uhuhuh) uhuhuh.default();
  },
);

onMounted(() => {
  uhuhuh = new Uhuhuh(430, 230, pointFollowRef.value!);
  uhuhuh.render(45);
});

onBeforeUnmount(() => {
  if (uhuhuh) {
    uhuhuh.destroy();
  }
});
</script>

<template>
  <div class="header-w m-auto pointer-events-none relative z-1 h-230px sm:h-300px">
    <InfoCard />
    <div
      class="absolute right-0 -bottom-6 w-430px h-230px z-1 hidden sm:block"
      ref="pointFollowRef"
    ></div>
  </div>
</template>

<style scoped></style>
