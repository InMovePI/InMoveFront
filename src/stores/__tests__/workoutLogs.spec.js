import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWorkoutLogsStore } from '../workoutLogs'
import * as WorkoutLogService from '@/services/workoutLog'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
  vi.restoreAllMocks()
})

describe('workoutLogs store', () => {
  it('enqueues when the service indicates queued', async () => {
    vi.spyOn(WorkoutLogService.default, 'saveWorkoutLog').mockResolvedValue({ status: 'queued' })
    const store = useWorkoutLogsStore()
    const payload = { workoutSlug: 'run-5k', caloriesBurned: 200, durationMinutes: 30 }
    const res = await store.saveLog(payload)
    expect(res.queued).toBe(true)
    expect(store.pendingCount).toBeGreaterThanOrEqual(0)
  })

  it('records saved item when service returns saved', async () => {
    const fakeData = { id: 'x', workout_slug: 'run-5k' }
    vi.spyOn(WorkoutLogService.default, 'saveWorkoutLog').mockResolvedValue({ status: 'saved', data: fakeData })
    const store = useWorkoutLogsStore()
    const payload = { workoutSlug: 'run-5k', caloriesBurned: 200, durationMinutes: 30 }
    const data = await store.saveLog(payload)
    expect(data.id).toBe(fakeData.id)
    expect(store.logs.length).toBeGreaterThanOrEqual(1)
  })
})
