<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  {
    title: 'Páginas',
    links: [
      { label: 'Home', to: '/principal' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Treinos', to: '/treinos' },
      { label: 'Treinamentos', to: '/treinamentos' },
      { label: 'Explorar', to: '/' },
      { label: 'Informações', to: '/informacoes' },
    ],
  },
  {
    title: 'Saúde & Nutrição',
    links: [
      { label: 'Refeições', to: '/meals' },
      { label: 'Criar refeição', to: '/meals/create' },
      { label: 'Resumo semanal', to: '/meals/weekly-summary' },
      { label: 'Chat', to: '/chat' },
    ],
  },
  {
    title: 'Conta',
    links: [
      { label: 'Perfil', to: '/perfil' },
      { label: 'Editar perfil', to: '/perfil/editar' },
      { label: 'Cadastro', to: '/cadastro' },
      { label: 'Login', to: '/login' },
    ],
  },
]
</script>

<template>
  <footer class="app-footer">
    <div class="content">
      <div class="brand">
        <h2>INMOVE</h2>
        <p>Construindo o melhor fluxo entre treino, nutrição e tecnologia para você atingir seus objetivos.</p>
      </div>

      <div class="links">
        <div v-for="section in sections" :key="section.title" class="link-section">
          <p class="section-title">{{ section.title }}</p>
          <RouterLink
            v-for="link in section.links"
            :key="link.to"
            :to="link.to"
            class="footer-link"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="bottom">
      <span>© {{ new Date().getFullYear() }} InMove. Todos os direitos reservados.</span>
      <div class="meta">
        <a href="mailto:contato@inmove.com" aria-label="Contato e suporte">contato@inmove.com</a>
        <span class="dot" />
        <a href="tel:+550000000000" aria-label="Telefone">+55 00 0000-0000</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: clamp(32px, 6vw, 72px);
  padding: clamp(32px, 6vw, 72px) clamp(20px, 6vw, 80px);
  background: #ffffff;
  color: #111;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.04);
}

.content {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(24px, 4vw, 80px);
  justify-content: space-between;
  align-items: flex-start;
}

.brand {
  flex: 1 1 240px;
  max-width: 360px;
}

.brand h2 {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  letter-spacing: 0.15em;
}

.brand p {
  margin: 12px 0 0;
  opacity: 0.8;
  line-height: 1.5;
  color: rgba(17, 17, 17, 0.72);
}

.links {
  display: flex;
  flex: 2 1 320px;
  gap: clamp(16px, 3vw, 48px);
  flex-wrap: wrap;
}

.link-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 160px;
}

.section-title {
  margin: 0 0 4px;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.7);
}

.footer-link {
  color: #111;
  text-decoration: none;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.footer-link:hover {
  opacity: 1;
  transform: translateX(4px);
  color: #8aa40f;
}

.bottom {
  margin-top: clamp(24px, 4vw, 48px);
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
}

.meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.meta a {
  color: #8aa40f;
  text-decoration: none;
  font-weight: 600;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
}

@media (max-width: 640px) {
  .content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .brand,
  .links,
  .link-section {
    width: 100%;
    text-align: center;
    align-items: center;
  }

  .links {
    flex-direction: column;
  }

  .link-section {
    width: 100%;
  }

  .bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
  }

  .meta {
    flex-direction: column;
    gap: 4px;
  }

  .dot {
    display: none;
  }
}
</style>
