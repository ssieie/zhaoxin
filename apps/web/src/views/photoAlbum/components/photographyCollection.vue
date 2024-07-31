<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-20px md:grid-cols-3">
    <div v-for="i in 8">
      <div class="bg-#e2e8f0 h-260px rounded-4px">{{ i }}</div>
      <div class="flex justify-between m-t-8px">
        <span>info</span>
        <span>info</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
