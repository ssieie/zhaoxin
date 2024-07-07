import { type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("/@/views/home/home.vue"),
  },
  {
    path: "/latest",
    name: "latest",
    component: () => import("/@/views/latestContent/latestContent.vue"),
  },
  {
    name: "notFound",
    path: "/:path(.*)*",
    component: () => import("/@/views/404.vue"),
    meta: {
      title: "您访问的页面不存在",
      hidden: true,
    },
  },
];

export default routes;
