<script setup lang="ts">
let testList:any = [];
for (let i = 0; i <= 16; i++) {
  let vote = { id: -1, type: -1, time: "", title: "" };
  vote.id = i;
  if (i % 3 === 0) {
    vote.type = -1;
    vote.time = 2021 - i + "";
  } else {
    vote.type = 1;
    vote.time = `08-3${i}`;
  }
  vote.title = `第${i}个事件`;

  testList.push(vote);
}
</script>

<template>
  <div class="wrapper relative dark:color-#e5e7eb">
    <div
      class="m-l-16px m-t-10px py-14px m-b-30px border-4 border-transparent border-l-#d4d4d8 content"
    >
      <div
        class="p-l-8px border-1 border-dashed border-transparent border-b-#d4d4d8"
        :style="{
          '--focus-in-expand-animation-delay': (index + 1) * 0.16 + 's',
        }"
        v-for="(item, index) in testList"
      >
        <div class="fade-in-fwd py-10px p-l-8px" v-if="~item.type">
          <div class="text-18px p-b-4px">{{ item.time }}</div>
          <div class="font-300">
            {{
              item.title
            }}士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒士大夫撒
          </div>
        </div>
        <div
          class="year py-10px relative text-22px font-500 before:bg-#9ca3af dark:before:bg-#67e8f9"
          v-else
        >
          {{ item.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.year
  &:before
    content: ''
    position: absolute
    top: 19px
    left: -16px
    width: 10px
    height: 10px
    border-radius: 50%


.wrapper
  min-height: calc(100vh - 530px)

@media (max-width: 899px)
  .wrapper
    min-height: calc(100vh - 105px - 300px)
</style>
