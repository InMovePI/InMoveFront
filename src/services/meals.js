import api from './api'

const CACHE_KEY = 'meals_search_cache_v1'
// recommend longer cache for search results (backend has no TTL) — default 24h
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 // 24 hours

function _getCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

function _setCache(obj) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(obj))
  } catch (e) {
    // ignore
  }
}

/**
 * searchFood(q, options)
 * options.lang - preferred language / locale (e.g. 'pt' or 'pt_BR'). When provided this will
 * be appended as ?lang=... to the backend request - backend may ignore unsupported params.
 */
export async function searchFood(q, options = {}) {
  if (!q || q.length < 1) return []

  const cache = _getCache()
  const key = q.trim().toLowerCase()
  const now = Date.now()

  if (cache[key] && now - cache[key].ts < CACHE_TTL_MS) {
    return cache[key].data
  }

  // allow passing language filter as a helper for better localized results
  let url = `/meals/search-food/?q=${encodeURIComponent(q)}`;
  if (options.lang) url += `&lang=${encodeURIComponent(options.lang)}`;
  if (options.country) url += `&country=${encodeURIComponent(options.country)}`;

  const { data } = await api.get(url)

  cache[key] = { ts: now, data }
  _setCache(cache)

  return data
}

export async function createMeal(payload) {
  const { data } = await api.post('/meals/', payload)
  return data
}

export async function listMeals({ date, page = 1 } = {}) {
  const params = new URLSearchParams()
  if (date) params.set('date', date)
  params.set('page', String(page))
  const { data } = await api.get(`/meals/?${params.toString()}`)
  return data
}

export async function getMeal(id) {
  const { data } = await api.get(`/meals/${id}/`)
  return data
}

export async function deleteMeal(id) {
  const { data } = await api.delete(`/meals/${id}/`)
  return data
}

export async function weeklySummary() {
  const { data } = await api.get('/meals/weekly-summary/')
  return data
}

/**
 * Try to find a previously cached search result by id (barcode or item id)
 * Returns the full item object if found, null otherwise.
 */
export function findCachedById(id) {
  if (!id) return null
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cache = JSON.parse(raw)
    for (const key of Object.keys(cache)) {
      const entry = cache[key]
      if (!entry || !Array.isArray(entry.data)) continue
      const found = entry.data.find((it) => String(it.id) === String(id) || (it.id === id))
      if (found) return found
    }
  } catch (e) {
    // ignore parse errors
  }
  return null
}

export default { searchFood, createMeal, listMeals, getMeal, deleteMeal, weeklySummary }
