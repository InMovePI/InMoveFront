import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import TreinamentosView from '../TreinamentosView.vue'
import { useWorkoutLogsStore } from '@/stores/workoutLogs'
import { useAuthStore } from '@/stores/auth'

describe('TreinamentosView - weekly stats and performed list', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows calories total for last 7 days and lists performed workouts', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const routes = [
      { name: 'treinamentos.detail', path: '/treinamentos/:slug', component: { template: '<div />' } }
    ]
    const router = createRouter({ history: createWebHistory(), routes })

    const store = useWorkoutLogsStore()
    // set a logged-in user so greeting shows first name
    const authStore = useAuthStore()
    authStore.user = { id: 1, name: 'Joao Silva', email: 'joao@example.com' }

    const now = Date.now()
    const oneDay = new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString()
    const twoDays = new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString()
    const sixDays = new Date(now - 6 * 24 * 60 * 60 * 1000).toISOString()

    // include duplicates (same workout_slug) and various dates — use real slugs from workouts data
    const logs = [
      { id: 'a', workout_slug: 'costas-biceps', calories_burned: 380, duration_minutes: 90, finished_at: oneDay },
      { id: 'b', workout_slug: 'costas-biceps', calories_burned: 350, duration_minutes: 75, finished_at: twoDays },
      { id: 'c', workout_slug: 'pernas-completo', calories_burned: 410, duration_minutes: 85, finished_at: sixDays }
    ]

    // stub fetchLogs to populate the store without touching network
    store.fetchLogs = vi.fn().mockImplementation(async () => {
      store.logs = logs
      return store.logs
    })

    // mount component
    const wrapper = mount(TreinamentosView, { global: { plugins: [pinia, router] } })

    // wait for the fetchLogs call
    await store.fetchLogs()

    // last-week calories = 380 + 350 + 410 = 1140
    expect(wrapper.html()).toContain('1140')

    // greeting should show first name
    expect(wrapper.html()).toContain('Olá Joao')

    // should render heading
    expect(wrapper.html()).toContain('Treinos realizados')

    // check monthly progress (3 logs in month) -> show 3 / 100 and 3%
    expect(wrapper.html()).toContain('3 / 100')
    expect(wrapper.html()).toContain('3%')

    // total time for last week should sum durations -> 90 + 75 + 85 = 250min -> 4h 10m
    expect(wrapper.html()).toContain('4h')
    expect(wrapper.html()).toContain('10m')

    // check performed cards order: newest (oneDay) should appear first
    const cards = wrapper.findAll('.performed-card')
    expect(cards.length).toBe(3)
    const firstText = cards[0].text()
    const secondText = cards[1].text()
    const thirdText = cards[2].text()

    // newest is 'a' costas-biceps and then 'b' costas-biceps then 'c' pernas-completo
    // cards render as plan-card — check title and meta text (which contains the plan's calories)
    expect(firstText).toContain('Costas & Bíceps')
    expect(firstText).toContain('8 exercícios')
    expect(secondText).toContain('Costas & Bíceps')
    expect(secondText).toContain('8 exercícios')
    expect(thirdText).toContain('Pernas Completo')
    expect(thirdText).toContain('7 exercícios')
  })
})
