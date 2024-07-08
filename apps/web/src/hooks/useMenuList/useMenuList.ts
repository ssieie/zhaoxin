import {ref} from "vue";
import { useRouter } from "vue-router";

export interface RouteItem {
  title: string;
  url: string;
}

export type menuListType = RouteItem[];

const menuList = ref<menuListType>([
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
    url: "/milestone",
  },
  {
    title: "小憩",
    url: "/takeAMomentOff",
  },
  {
    title: "关于",
    url: "/about",
  },
  {
    title: "还没想好",
    url: "/unknown",
  },
]);

export function useMenu() {
  const router = useRouter();

  const menuChange = (
      type: "push",
      item: RouteItem,
      callback?: Function,
  ) => {
    switch (type) {
      case "push":
        router.push(item.url).then(() => {
          callback && callback();
        });
        break;
    }
  };

  return {
    menuList,
    menuChange,
  };
}
