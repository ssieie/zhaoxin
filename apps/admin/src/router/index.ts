import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.ts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Session } from "@blog/utils";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to) => {
  NProgress.configure({ showSpinner: false });
  if (to.meta.title) NProgress.start();
  const token = Session.get("token");
  if (!token && to.name !== 'Login') {
    Session.clear();
    NProgress.done();
    return "/login";
  } else if (token && to.path === "/login") {
    NProgress.done();
    return "/dashboard";
  }
  NProgress.done();
});

export default router;
