import { mount } from '@vue/test-utils'
import index from '@/pages/index.vue'

describe('index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(index)
  	const DatePicker = wrapper.find('DatePicker')
  	const TimePicker = wrapper.find('TimePicker')
    const button = wrapper.find('submit')
    expect(wrapper.vm).toBeTruthy()
    expect(DatePicker).toBeTruthy()
    expect(TimePicker).toBeTruthy()
    expect(button).toBeTruthy()
  	expect(button.disable()).toBe(false)

  })
})

test('increments counter value on click', async () => {
  const wrapper = mount(Counter)
  const button = wrapper.find('button')
  const text = wrapper.find('p')

  expect(text.text()).toContain('Total clicks: 0')

  await button.trigger('click')

  expect(text.text()).toContain('Total clicks: 1')
})
