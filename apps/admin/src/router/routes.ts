import { type RouteRecordRaw } from "vue-router";
import { h } from "vue";
import {
  HomeOutlined,
  HeartOutlined
} from "@ant-design/icons-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("/@/layout/index.vue"),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: '首页', icon: () => h(HomeOutlined) },
        component: () => import('/@/views/home/home.vue'),
      },
      {
        path: '/test1',
        name: 'test1',
        meta: { title: 'test1', icon: () => h(HeartOutlined) },
        component: () => import('/@/views/test/test.vue'),
      },
    ],
  },
];

export default routes;
