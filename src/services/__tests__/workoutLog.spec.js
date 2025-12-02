import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as WorkoutLogService from '../workoutLog'
import api from '../api'

beforeEach(() => {
  localStorage.clear()
  // default to online
  global.navigator = Object.assign({}, global.navigator, { onLine: true })
  vi.restoreAllMocks()
})

describe('workoutLog service', () => {
  it('queues a log when offline', async () => {
    global.navigator = Object.assign({}, global.navigator, { onLine: false })
    const payload = { workoutSlug: 'run-5k', caloriesBurned: 300, durationMinutes: 35 }
    const res = await WorkoutLogService.saveWorkoutLog(payload)
    expect(res.status).toBe('queued')
    const queue = WorkoutLogService.getQueuedLogs()
    expect(queue.length).toBe(1)
    expect(queue[0].payload.workoutSlug).toBe(payload.workoutSlug)
  })

  it('saves immediately when online and API returns 201', async () => {
    const fake = vi.spyOn(api, 'post').mockResolvedValue({ status: 201, data: { id: 'abc' } })
    const payload = { workoutSlug: 'run-5k', caloriesBurned: 300, durationMinutes: 35 }
    const res = await WorkoutLogService.saveWorkoutLog(payload)
    expect(res.status).toBe('saved')
    expect(res.data.id).toBe('abc')
    expect(fake).toHaveBeenCalled()
    const queue = WorkoutLogService.getQueuedLogs()
    expect(queue.length).toBe(0)
  })

  it('retries failed network and then still queues the payload', async () => {
    // simulate network error
    const netErr = new Error('Network')
    vi.spyOn(api, 'post').mockRejectedValue(netErr)
    const payload = { workoutSlug: 'run-5k', caloriesBurned: 300, durationMinutes: 35 }
    const res = await WorkoutLogService.saveWorkoutLog(payload)
    expect(res.status).toBe('queued')
    const queue = WorkoutLogService.getQueuedLogs()
    expect(queue.length).toBe(1)
  })
})
