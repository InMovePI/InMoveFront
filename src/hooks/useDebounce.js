// Lightweight debounce composable for Vue 3 / Composition API
import { ref, watch } from 'vue'

export default function useDebounce(value, delay = 300) {
  const debounced = ref(value.value ?? value)

  let timer = null

  const cleanup = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  watch(
    () => (value.value ?? value),
    (newVal) => {
      cleanup()
      timer = setTimeout(() => {
        debounced.value = newVal
      }, delay)
    }
  )

  return { debounced, cleanup }
}
