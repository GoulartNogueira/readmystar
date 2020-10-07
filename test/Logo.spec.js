import { mount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'

describe('DatePicker', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(DatePicker)
    expect(wrapper.vm).toBeTruthy()
  })
})

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
