import { ref } from "vue";

export interface RouteItem {
  title: string;
  url: string;
}

export type menuListType = RouteItem[];

export const menuList = ref<menuListType>([
  {
    title: "最新",
    url: "/latest",
  },
  {
    title: "分类",
    url: "/category",
  },
  {
    title: "事件里程碑",
    url: "/category",
  },
  {
    title: "小憩",
    url: "/category",
  },
  {
    title: "还没想好",
    url: "/category",
  },
]);
