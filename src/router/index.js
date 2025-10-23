import { createRouter, createWebHistory } from "vue-router";
import PrincipalView from "../views/PrincipalView.vue";
import CadastroView from "../views/CadastroView.vue";
import InformaçõesView from "../views/InformaçõesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/principal', 
    },
    {
      path: '/principal',
      name: 'principal',
      component: PrincipalView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView,
    },
    {
      path: '/informaçoes',
      name: 'informaçoes',
      component: InformaçõesView,
    },
  ],
});

export default router;
