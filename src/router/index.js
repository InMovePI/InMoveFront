import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SegundaPagView from "../views/SegundaPagView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/frame1',
      name: 'frame1',
      component: SegundaPagView,
    },
    
  ],
});

export default router;
