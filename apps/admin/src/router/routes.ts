import { type RouteRecordRaw } from "vue-router";
import { h } from "vue";
import {
  HomeOutlined,
  HeartOutlined,
  AppstoreOutlined,
  FormOutlined,
  EditOutlined,
  BarChartOutlined,
  VideoCameraAddOutlined,
  TagsOutlined,
  TableOutlined,
  BookOutlined,
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
        meta: { title: '文章分类', icon: () => h(AppstoreOutlined) },
        component: () => import('/@/views/categoryManage/categoryManage.vue'),
      },
      {
        path: '/articleManage',
        name: 'ArticleManage',
        meta: { title: '文章管理', icon: () => h(FormOutlined) },
        component: () => import('/@/views/articleManage/articleManage.vue'),
      },
      {
        path: '/introduceManage',
        name: 'IntroduceManage',
        meta: { title: '首页描述', icon: () => h(EditOutlined) },
        component: () => import('/@/views/introduceManage/introduceManage.vue'),
      },
      {
        path: '/aboutEdit',
        name: 'AboutEdit',
        meta: { title: '编辑个人介绍', icon: () => h(HeartOutlined) },
        component: () => import('/@/views/aboutEdit/aboutEdit.vue'),
      },
      {
        path: '/photoManage',
        name: 'PhotoManage',
        meta: { title: '我的照片', icon: () => h(VideoCameraAddOutlined) },
        children:[
          {
            path: '/photo/categoryManage',
            name: 'PhotoManage',
            meta: { title: '照片分类', icon: () => h(TagsOutlined) },
            component: () => import('/@/views/photoManage/categoryManage/categoryManage.vue'),
          },
          {
            path: '/photo/tvSeries',
            name: 'PhotoTvSeries',
            meta: { title: '影集', icon: () => h(TableOutlined) },
            component: () => import('/@/views/photoManage/tvSeries/tvSeries.vue'),
          },
          {
            path: '/photo/photo',
            name: 'Photo',
            meta: { title: '照片', icon: () => h(BookOutlined) },
            component: () => import('/@/views/photoManage/photo/photo.vue'),
          },
        ]
      },
      {
        path: '/requestLog',
        name: 'RequestLog',
        meta: { title: '接口日志', icon: () => h(BarChartOutlined) },
        component: () => import('/@/views/requestLog/requestLog.vue'),
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
