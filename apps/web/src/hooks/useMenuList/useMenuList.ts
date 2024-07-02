import { ref } from "vue";

export type menuListType = Record<string, string>[];

export const menuList = ref<menuListType>([
  {
    title: "最新",
  },
  {
    title: "分类",
  },
  {
    title: "事件里程碑",
  },
  {
    title: "小憩",
  },
  {
    title: "还没想好",
  },
]);
