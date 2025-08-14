import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SegundaPagView from "../views/SegundaPagView.vue";
import GeneroView from "../views/GeneroView.vue";
import NascimentoView from "../views/NascimentoView.vue";
import AlturaView from "../views/AlturaView.vue";
import PesoView from "../views/PesoView.vue";
import MetaPesoView from "../views/MetaPesoView.vue";

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
    {
      path: '/altura',
      name: 'altura',
      component: AlturaView,
    },
    {
      path: '/peso',
      name: 'peso',
      component: PesoView,
    },
    {
      path: '/metapeso',
      name: 'metapeso',
      component: MetaPesoView,
    },
  ],
});

export default router;
