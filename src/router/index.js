import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SegundaPagView from "../views/SegundaPagView.vue";
import GeneroView from "../views/GeneroView.vue";
import NascimentoView from "../views/NascimentoView.vue";

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
    {
      path: '/genero',
      name: 'genero',
      component: GeneroView,
    },
    {
      path: '/nascimento',
      name: 'nascimento',
      component: NascimentoView,
    },
    
  ],
});

export default router;
