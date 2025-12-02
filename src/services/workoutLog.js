import api from './api'

const QUEUE_KEY = 'workout_log_queue_v1'

function readQueue() {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.warn('failed reading workouts queue', err)
    return []
  }
}

function writeQueue(queue) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch (err) {
    console.warn('failed writing workouts queue', err)
  }
}

async function postWithRetries(payload, attempts = [500, 1500]) {
  // attempts[] holds backoff delays in ms for retries
  try {
    const res = await api.post('/workouts/log/', payload)
    return res
  } catch (err) {
    // network or 5xx errors should retry
    const status = err?.response?.status
    const isRetryable = !status || (status >= 500 && status < 600)
    if (!isRetryable || attempts.length === 0) throw err
    const delay = attempts[0]
    await new Promise((r) => setTimeout(r, delay))
    return postWithRetries(payload, attempts.slice(1))
  }
}

export async function saveWorkoutLog(payload) {
  // Validate minimal shape here so we always enqueue a sane payload
  if (typeof payload !== 'object') throw new TypeError('payload must be an object')
  // minimal normalization
  const safe = {
    workoutSlug: payload.workoutSlug ?? payload.workout_slug ?? '',
    caloriesBurned: Number(payload.caloriesBurned ?? payload.calories_burned ?? 0),
    durationMinutes: Number(payload.durationMinutes ?? payload.duration_minutes ?? 0),
  }

  // Basic front-end validation
  if (Number.isNaN(safe.caloriesBurned) || safe.caloriesBurned < 0) {
    const e = new Error('caloriesBurned must be a number >= 0')
    e.code = 'VALIDATION'
    throw e
  }
  if (Number.isNaN(safe.durationMinutes) || safe.durationMinutes <= 0) {
    const e = new Error('durationMinutes must be a number > 0')
    e.code = 'VALIDATION'
    throw e
  }

  // Try immediate send. If fails due to network/5xx enqueue for later.
  if (!navigator.onLine) {
    // offline — enqueue
    const queue = readQueue()
    queue.push({ payload: safe, createdAt: new Date().toISOString() })
    writeQueue(queue)
    return { status: 'queued' }
  }

  try {
    const res = await postWithRetries(safe)
    if (res.status === 201) return { status: 'saved', data: res.data }
    // treat other statuses as failure
    return { status: 'error', statusCode: res.status }
  } catch (err) {
    // network or retry-exhausted — enqueue
    const queue = readQueue()
    queue.push({ payload: safe, createdAt: new Date().toISOString(), error: String(err?.message ?? err) })
    writeQueue(queue)
    // Re-throw validation/401
    if (err?.response?.status === 401) {
      const e = new Error('Unauthorized')
      e.code = 'UNAUTHORIZED'
      throw e
    }
    return { status: 'queued', error: String(err?.message ?? err) }
  }
}

export function getQueuedLogs() {
  return readQueue()
}

export async function flushQueue() {
  const queue = readQueue()
  if (!queue.length) return { status: 'empty' }
  // Try to send each item in FIFO order
  const successful = []
  const failed = []

  for (const item of queue) {
    try {
      const res = await postWithRetries(item.payload)
      if (res.status === 201) {
        successful.push(item)
      } else {
        failed.push({ item, reason: `status:${res.status}` })
      }
    } catch (err) {
      // if unauthorized bubble up so app can reauth
      if (err?.response?.status === 401) throw err
      failed.push({ item, reason: String(err?.message ?? err) })
    }
  }

  // remove successful from queue
  const remaining = queue.filter((q) => !successful.includes(q))
  writeQueue(remaining)
  return { sent: successful.length, failed: failed.length, remainingCount: remaining.length }
}

// helper to start automatic flushing on 'online' events
export function initQueueSyncOnOnline() {
  window.addEventListener('online', () => {
    // kick off async flush but do not await here
    flushQueue().catch((err) => {
      // let store or UI handle auth errors
      console.warn('flushQueue error', err)
    })
  })
}

export default {
  saveWorkoutLog,
  getQueuedLogs,
  flushQueue,
  initQueueSyncOnOnline,
}
