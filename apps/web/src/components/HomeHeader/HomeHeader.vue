<script setup lang="ts">
import NavigationBar from "/@/components/NavigationBar/navigationBar.vue";
</script>

<template>
  <div
    class="h-400px bg-gradient-to-r from-sky-200 to-sky-100 relative overflow-hidden"
  >
    <NavigationBar />
    <div class="absolute bottom-0 left-0 right-0 translate-y-1">
      <svg
        class="absolute -left-3 -right-3 bottom-0 w-106% min-w-600px"
        preserveAspectRatio="none"
        width="1440"
        height="74"
        viewBox="0 0 1440 74"
      >
        <path
          fill="#fff"
          d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style scoped></style>
