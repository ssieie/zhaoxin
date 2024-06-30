<script setup lang="ts">
import {inject} from "vue";

const {updateLocation} = inject<any>("theme");

</script>

<template>
  <div class="h-48px"></div>
  <div class="flex justify-between items-center max-w-1100px m-auto">
    <div class="flex items-center">
      <div class="text-3xl font-extrabold m-r-80px cursor-pointer">
        <span
          class="switch-animation bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700 font-playwrite dark:from-sky-200 dark:to-sky-600"
        >
          <span class="tracking-4px">Zhao</span> Xin
        </span>
      </div>
      <div class="color-#6b7280 text-20px cursor-pointer m-r-40px font-msz dark:color-#d4d4d8">
        最新
      </div>
      <div class="color-#6b7280 text-20px cursor-pointer m-r-40px font-msz dark:color-#d4d4d8">
        分类
      </div>
      <div class="color-#6b7280 text-20px cursor-pointer m-r-40px font-msz dark:color-#d4d4d8">
        小憩
      </div>
    </div>
    <div>
      <button
        @click="updateLocation"
        class="i-tabler-sun dark:i-tabler-moon text-26px font-black m-r-30px color-#374151 dark:color-#d1d5db switch-animation"
      />
      <button
        class="i-tabler-brand-github text-26px font-black color-#374151 zx-rotate-center-h dark:color-#d1d5db switch-animation"
      />
    </div>
  </div>
</template>

<style scoped></style>
