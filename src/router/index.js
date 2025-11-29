import { createRouter, createWebHistory } from "vue-router";
import PrincipalView from "../views/PrincipalView.vue";
import CadastroView from "../views/CadastroView.vue";
import InformaçõesView from "../views/InformaçõesView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import PerfilView from "../views/PerfilView.vue";
import EditProfileView from "../views/EditProfileView.vue";

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
      path: '/informacoes',
      name: 'informacoes',
      component: InformaçõesView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
    },
    {
      path: '/perfil/editar',
      name: 'perfil.editar',
      component: EditProfileView,
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/ChatPage.vue'),
      meta: { requiresAuth: true },
    }
  ],
});

// global guard to enforce JWT login on routes with `requiresAuth` meta
router.beforeEach((to, from) => {
  if (to.meta?.requiresAuth) {
    const token = localStorage.getItem('access_token');
    if (!token) return { name: 'login', query: { next: to.fullPath } };
  }
  return true;
});

export default router;
