import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.ts";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// router.beforeEach((to) => {
// });

export default router;
