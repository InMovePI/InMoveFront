import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MealDetail from '../MealDetail.vue'

describe('MealDetail - display friendly names from cache', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('shows human readable name from cached search result when meal ingredient only includes id', async () => {
    const cache = {
      banana: {
        ts: Date.now(),
        data: [ { id: '0123456789012', name: 'Banana', brand: 'Marca' } ]
      }
    }
    sessionStorage.setItem('meals_search_cache_v1', JSON.stringify(cache))

    const meal = {
      title: 'Café da manhã',
      date: '2025-01-01',
      time: '08:00',
      ingredients: [ { food_name: '0123456789012', weight_grams: 100, calories: 89, protein: 1.1, carbs: 23.0, fat: 0.3 } ],
      total_calories: 89,
      total_protein: 1.1,
      total_carbs: 23,
      total_fat: 0.3
    }

    const wrapper = mount(MealDetail, { props: { meal } })

    // the component should render the friendly name pulled from cache
    expect(wrapper.text()).toContain('Banana')
    // should not display raw barcode/id where name is available
    expect(wrapper.text()).not.toContain('0123456789012')
  })
})
