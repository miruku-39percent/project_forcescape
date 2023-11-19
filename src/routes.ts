import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Proxy from "./components/Proxy.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: '/proxy',
      name: 'Proxy',
      component: Proxy,
    },
  ],
});

export default router;
