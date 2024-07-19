import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Checkout from '../src/views/Checkout.vue'
import { createStore } from 'vuex'

const cartItems = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 100, quantity: 2, image_url: 'image1.jpg' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 200, quantity: 1, image_url: 'image2.jpg' }
]

const store = createStore({
  state: {
    cart: cartItems
  },
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  actions: {
    confirmPurchase: vi.fn()
  }
})

describe('Checkout.vue', () => {
  it('displays cart items and total', async () => {
    const wrapper = mount(Checkout, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.vm.$nextTick()

    const itemElements = wrapper.findAll('.border')
    expect(itemElements.length).toBe(cartItems.length)

    const totalElement = wrapper.find('.text-xl.font-bold')
    expect(totalElement.text()).toBe(`Total: $${store.getters.cartTotal.toFixed(2)}`)
  })
})