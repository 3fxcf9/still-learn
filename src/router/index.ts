import { createRouter, createWebHistory } from "vue-router";
import client from "@/pocketbase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: { redirectConnected: true },
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !client?.authStore.token) {
    return {
      path: "/login",
    };
  } else if (to.meta.redirectConnected && client?.authStore.token) {
    return {
      path: "/dashboard",
    };
  }
});

export default router;
