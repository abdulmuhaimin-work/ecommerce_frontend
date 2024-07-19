import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CartDropdown from '../src/components/CartDropdown.vue'
import { createStore } from 'vuex'

const cartItems = [
  { id: 1, name: 'Product 1', price: 100, quantity: 2 },
  { id: 2, name: 'Product 2', price: 200, quantity: 1 }
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
    removeFromCart: vi.fn()
  }
})

describe('CartDropdown.vue', () => {
  it('displays cart items and total', async () => {
    const wrapper = mount(CartDropdown, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.vm.$nextTick() // Wait for initial render

    const itemElements = wrapper.findAll('.border-b')
    expect(itemElements.length).toBe(cartItems.length)

    const totalElement = wrapper.find('.text-md.font-bold.mb-4')
    expect(totalElement.text()).toBe(`Total: $${store.getters.cartTotal.toFixed(2)}`)
  })

  it('calls removeFromCart action when remove button is clicked', async () => {
    // Add spy for store.dispatch
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    const wrapper = mount(CartDropdown, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.vm.$nextTick() // Wait for initial render

    const removeButton = wrapper.find('button.text-red-500')
    await removeButton.trigger('click')

    expect(dispatchSpy).toHaveBeenCalledWith('removeFromCart', expect.anything())
  })
})