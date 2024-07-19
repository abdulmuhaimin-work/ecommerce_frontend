import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Products from '../src/views/Products.vue'
import axios from 'axios'
import { createStore } from 'vuex'

vi.mock('axios')

const products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 100, inventory: 10, image_url: 'image1.jpg' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 200, inventory: 0, image_url: 'image2.jpg' }
]

const store = createStore({
  state: {
    cart: []
  },
  getters: {
    cartItems: state => state.cart
  },
  actions: {
    addToCart: vi.fn()
  }
})

describe('Products.vue', () => {
  it('fetches and displays products', async () => {
    axios.get.mockResolvedValue({ data: { data: products } })

    const wrapper = mount(Products, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.vm.$nextTick() // Wait for initial render
    await wrapper.vm.$nextTick() // Ensure all updates are processed

    expect(wrapper.vm.products).toEqual(products)
    const productElements = wrapper.findAll('[name="product"]')
    expect(productElements.length).toBe(products.length)
  })

  it('displays "Out of Stock" for products with zero inventory', async () => {
    axios.get.mockResolvedValue({ data: { data: products } })

    const wrapper = mount(Products, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.vm.$nextTick() // Wait for initial render
    await wrapper.vm.$nextTick() // Ensure all updates are processed

    const outOfStockProduct = wrapper.find('.text-red-500')
    expect(outOfStockProduct.exists()).toBe(true)
    expect(outOfStockProduct.text()).toBe('Out of Stock')
  })
})