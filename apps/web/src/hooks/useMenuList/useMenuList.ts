import { ref } from "vue";
import { useRouter } from "vue-router";

export interface RouteItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export type menuListType = RouteItem[];

const menuList = ref<menuListType>([
  {
    title: "最新",
    url: "/latest",
    isActive: false,
  },
  {
    title: "分类",
    url: "/category",
    isActive: false,
  },
  // {
  //   title: "事件时间线",
  //   url: "/milestone",
  //   isActive: false,
  // },
  {
    title: "乱七倒八",
    url: "/takeAMomentOff",
    isActive: false,
  },
  {
    title: "我的摄影集",
    url: "/photoAlbum",
    isActive: false,
  },
  {
    title: "关于",
    url: "/about",
    isActive: false,
  },
]);

export function useMenu() {
  const router = useRouter();
  const menuChange = (type: "push", item: RouteItem, callback?: Function) => {
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

export const setMenuActive = (path: string) => {
  menuList.value.forEach((v) => (v.isActive = false));
  let menuItem = menuList.value.find((v) => path.startsWith(v.url));
  menuItem && (menuItem.isActive = true);
};
