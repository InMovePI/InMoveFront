import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import WorkoutLogService from '@/services/workoutLog'
import api from '@/services/api'

export const useWorkoutLogsStore = defineStore('workoutLogs', () => {
  const queue = ref(WorkoutLogService.getQueuedLogs())
  const saving = ref(false)
  const lastMessage = ref(null)
  const logs = ref([])

  const pendingCount = computed(() => queue.value.length)

  async function saveLog(payload) {
    // payload must contain workoutSlug, caloriesBurned, durationMinutes, optionally finishedAt
    saving.value = true
    lastMessage.value = 'Salvando treino...'
    try {
      const res = await WorkoutLogService.saveWorkoutLog(payload)
      if (res?.status === 'saved') {
        lastMessage.value = 'Treino salvo'
        // push into local logs array so UI updates quickly
        logs.value.unshift(res.data)
        // refresh queue count
        queue.value = WorkoutLogService.getQueuedLogs()
        return res.data
      }

      if (res?.status === 'queued') {
        lastMessage.value = 'Você está offline — treino salvo localmente e será sincronizado.'
        queue.value = WorkoutLogService.getQueuedLogs()
        return { queued: true }
      }

      lastMessage.value = 'Erro ao salvar treino'
      return { error: true }
    } catch (err) {
      // Bubble auth error up so UI/login flow can handle
      if (err?.code === 'UNAUTHORIZED' || err?.response?.status === 401) {
        lastMessage.value = 'Sessão expirada — por favor, faça login novamente'
        throw err
      }
      lastMessage.value = String(err?.message ?? err)
      return { error: true }
    } finally {
      saving.value = false
    }
  }

  async function syncQueue() {
    try {
      const result = await WorkoutLogService.flushQueue()
      queue.value = WorkoutLogService.getQueuedLogs()
      return result
    } catch (err) {
      // rethrow auth issues
      throw err
    }
  }

  async function fetchLogs() {
    try {
      const res = await api.get('/workouts/logs/')
      logs.value = res.data || []
      return logs.value
    } catch (err) {
      console.warn('fetchLogs failed', err)
      throw err
    }
  }

  function init() {
    // ensure onboarded queue
    WorkoutLogService.initQueueSyncOnOnline()
    queue.value = WorkoutLogService.getQueuedLogs()
  }

  // init automatically
  init()

  return { queue, pendingCount, saving, lastMessage, logs, saveLog, syncQueue, fetchLogs }
})
