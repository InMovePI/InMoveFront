import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SegundaPagView from "../views/SegundaPagView.vue";
import GeneroView from "../views/GeneroView.vue";
import NascimentoView from "../views/NascimentoView.vue";
import AlturaView from "../views/AlturaView.vue";
import PesoView from "../views/PesoView.vue";
import MetaPesoView from "../views/MetaPesoView.vue";
import ObjetivoView from "../views/ObjetivoView.vue";
import FocoView from "../views/FocoView.vue";
import LoginView from "../views/loginView.vue";
import PrincipalView from "../views/PrincipalView.vue";

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
    {
      path: '/objetivo',
      name: 'objetivo',
      component: ObjetivoView,
    },
    {
      path: '/foco',
      name: 'foco',
      component: FocoView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/principal',
      name: 'principal',
      component: PrincipalView,
    },
  ],
});

export default router;
