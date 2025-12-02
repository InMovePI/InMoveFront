import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MealForm from '../MealForm.vue'
import * as meals from '@/services/meals'

describe('MealForm - autocomplete and payload', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('displays name (not id) when user selects suggestion and sends id in payload', async () => {
    const mockResults = [
      { id: '0123456789012', name: 'Banana', brand: 'Marca', nutrients: { calories: 89.0, protein: 1.1, carbs: 23.0, fat: 0.3 } }
    ]
    // add a dummy non-br result to ensure strict filtering works
    const mockResultsMixed = [
      { id: '0123456789012', name: 'Banana', brand: 'Marca', nutrients: { calories: 89.0, protein: 1.1, carbs: 23.0, fat: 0.3 }, country: 'Brasil', languages: ['pt'] },
      { id: '9999999999999', name: 'Apple', brand: 'GenericUS', nutrients: { calories: 52.0, protein: 0.3, carbs: 14.0, fat: 0.2 }, country: 'United States', languages: ['en'] }
    ]
    const spySearch = vi.spyOn(meals, 'searchFood').mockResolvedValue(mockResultsMixed)
    const spyCreate = vi.spyOn(meals, 'createMeal').mockResolvedValue({})

    vi.useFakeTimers()
    const wrapper = mount(MealForm, {
      global: { mocks: { $router: { push: vi.fn() } } }
    })

    await wrapper.find('#title').setValue('Café Teste')

    // type in the ingredient input
    const input = wrapper.find('#food_0')
    await input.setValue('Ban')

    // advance debounce
    await vi.advanceTimersByTimeAsync(400)
    await Promise.resolve()

    expect(spySearch).toHaveBeenCalledWith('Ban', { lang: 'pt', country: 'BR' })

    const suggestion = wrapper.findAll('.suggestions li')
    // prioritize Brazilian 'Banana' but include the 'Apple' as fallback
    expect(suggestion.length).toBe(2)
    expect(suggestion[0].text()).toContain('Banana')
    expect(suggestion[1].text()).toContain('Apple')

    await suggestion.trigger('click')

    // After selection, the input should show human-readable name "Banana" not the id
    expect(wrapper.find('#food_0').element.value).toBe('Banana')

    // set weight to 120 and submit
    await wrapper.find('#w_0').setValue('120')
    await wrapper.find('form').trigger('submit.prevent')

    expect(spyCreate).toHaveBeenCalled()
    const payload = spyCreate.mock.calls[0][0]
    expect(payload.ingredients[0].food_name).toBe('0123456789012')
    expect(payload.ingredients[0].weight_grams).toBe(120)

    vi.useRealTimers()
  })
})
