import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.ts";
import { setMenuActive } from "/@/hooks/useMenuList/useMenuList.ts";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to) => {
  setMenuActive(to.fullPath);
});

export default router;
