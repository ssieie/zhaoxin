<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import ItemBlock from "/@/views/milestone/components/itemBlock.vue";
import ItemLine from "/@/views/milestone/components/itemLine.vue";



</script>

<template>
  <div class="bg-base min-h-dvh">
    <div class="sticky top-0 bg-base z-9999 p-b-30px">
      <navigation-bar :anim="false" />
    </div>
    <div class="h-20px md:h-60px sticky top-85px md:top-115px bg-base z-1"></div>
    <div class="m-auto header-w p-b-20px wrapper alibbph">
      <div class="relative">
        <div class="sticky top-105px md:top-175px bg-base z-1 text-30px font-700 title-text-base">关于此网站</div>
        <ItemLine />
        <ItemBlock />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

</style>