import { type RouteRecordRaw } from "vue-router";
import { h } from "vue";
import {
  HomeOutlined,
  HeartOutlined,
  AppstoreOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("/@/layout/index.vue"),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: '首页', icon: () => h(HomeOutlined) },
        component: () => import('/@/views/home/home.vue'),
      },
      {
        path: '/categoryManage',
        name: 'CategoryManage',
        meta: { title: '分类管理', icon: () => h(AppstoreOutlined) },
        component: () => import('/@/views/categoryManage/categoryManage.vue'),
      },
      {
        path: '/articleManage',
        name: 'ArticleManage',
        meta: { title: '文章管理', icon: () => h(FormOutlined) },
        component: () => import('/@/views/articleManage/articleManage.vue'),
      },
      {
        path: '/aboutEdit',
        name: 'AboutEdit',
        meta: { title: '编辑个人介绍', icon: () => h(HeartOutlined) },
        component: () => import('/@/views/aboutEdit/aboutEdit.vue'),
      },
    ],
  },
  {
    path:'/login',
    name:'Login',
    component: () => import("/@/views/login/login.vue"),
  }
];

export default routes;
