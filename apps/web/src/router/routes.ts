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
    path: "/category",
    name: "category",
    component: () => import("/@/views/category/category.vue"),
  },
  {
    path: "/milestone",
    name: "milestone",
    component: () => import("/@/views/milestone/milestone.vue"),
  },
  {
    path: "/takeAMomentOff",
    name: "takeAMomentOff",
    component: () => import("/@/views/takeAMomentOff/takeAMomentOff.vue"),
  },
  {
    path: "/photoAlbum",
    name: "photoAlbum",
    component: () => import("/@/views/photoAlbum/photoAlbum.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("/@/views/about/about.vue"),
  },
  {
    path: "/articleDetails",
    name: "ArticleDetails",
    component: () => import("/@/components/BodyWrapper/components/ArticleList/articleDetails.vue"),
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
