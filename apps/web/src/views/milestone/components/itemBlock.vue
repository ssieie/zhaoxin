<script setup lang="ts">
import a from "/@/assets/images/test/1.jpg";
import a1 from "/@/assets/images/test/2.jpg";
import a2 from "/@/assets/images/test/3.png";
import a3 from "/@/assets/images/test/4.jpg";

const items = [
  {
    title: '关于此网站',
    desc: '关于此网站关于此网站',
  },
  {
    title: '关于此网站',
    desc: '关于此网站关于此网站'
  },
  {
    title: '关于此网站',
    desc: '关于此网站关于此网站'
  },
  {
    title: '关于此网站',
    desc: '关于此网站关于此网站'
  },
  {
    title: '关于此网站',
    desc: '关于此网站关于此网站'
  },
  {
    title: '关于此网站',
    desc: '关于此网站关于此网站'
  },
]
const images = [a, a1, a2, a3];
</script>

<template>
  <div
    class="sticky bottom-0 flex gap-4 overflow-x-auto custom-scroll-bar card-wrap bg-base p-t-14px"
  >
    <div
      v-for="(i, idx) in items"
      class="h-230px w-160px md:h-260px md:w-190px xl:h-280px xl:w-210px 2xl:h-300px 2xl:w-230px shrink-0 relative flex items-end overflow-hidden p-1em card"
    >
      <div
        class="bg"
        :style="{
          'background-image': `url(${images[idx % 4]})`,
        }"
      ></div>
      <div class="content relative flex flex-col items-center w-full p-1em z-1">
        <div class="title text-1.4em font-bold alibbph">{{ i.title }}</div>
        <p class="desc m-t-10px">
          {{i.desc}}
        </p>
        <div
          class="btn cursor-pointer m-t-10px p-t-6px p-b-6px p-l-10px p-r-10px rounded tracking-2px text-14px font-bold bg-#000"
        >
          查看
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
$imageIds: url('../../../assets/images/test/1.jpg'), url('../../../assets/images/test/2.jpg'), url('../../../assets/images/test/3.png'), url('../../../assets/images/test/4.jpg')
.card-wrap
  --d: 700ms
  --e: cubic-bezier(0.19, 1, 0.22, 1)

  .card
    text-align: center
    color: whitesmoke
    background-color: whitesmoke
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1)

    .bg
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 110%
      background-image: var(--bg)
      background-size: cover
      background-position: 0 0
      transition: transform calc(var(--d) * 1.5) var(--e)
      pointer-events: none

    &:after
      content: ''
      display: block
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 200%
      pointer-events: none
      background-image: linear-gradient(to bottom, hsla(0, 0%, 0%, 0) 0%, hsla(0, 0%, 0%, 0.009) 11.7%, hsla(0, 0%, 0%, 0.034) 22.1%, hsla(0, 0%, 0%, 0.072) 31.2%, hsla(0, 0%, 0%, 0.123) 39.4%, hsla(0, 0%, 0%, 0.182) 46.6%, hsla(0, 0%, 0%, 0.249) 53.1%, hsla(0, 0%, 0%, 0.320) 58.9%, hsla(0, 0%, 0%, 0.394) 64.3%, hsla(0, 0%, 0%, 0.468) 69.3%, hsla(0, 0%, 0%, 0.540) 74.1%, hsla(0, 0%, 0%, 0.607) 78.8%, hsla(0, 0%, 0%, 0.668) 83.6%, hsla(0, 0%, 0%, 0.721) 88.7%, hsla(0, 0%, 0%, 0.762) 94.1%, hsla(0, 0%, 0%, 0.790) 100%)
      transform: translateY(0)
      transition: transform calc(var(--d) * 2) var(--e)


    &:hover
      .bg
        transform: translateY(-4%)

      &:after
        transform: translateY(-50%)

      .content
        transform: translateY(0)

        .desc
          opacity: 1


    .content
      transform: translateY(calc(100% - 60px))
      transition: transform var(--d) var(--e)

      .desc
        opacity: 0
        transition: transform var(--d) var(--e), opacity var(--d) var(--e)
</style>
