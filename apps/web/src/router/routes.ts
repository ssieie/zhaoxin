import { type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("/@/views/404.vue"),
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
