import { createRouter, createWebHistory } from "vue-router";
import PrincipalView from "../views/PrincipalView.vue";
import CadastroView from "../views/CadastroView.vue";
import InformaçõesView from "../views/InformaçõesView.vue";
import LoginView from "../views/LoginView.vue";

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
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

export default router;
