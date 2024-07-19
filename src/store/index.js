import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, { product, quantity }) {
      const item = state.cart.find(item => item.id === product.id)
      if (item) {
        item.quantity += quantity
      } else {
        state.cart.push({ ...product, quantity })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    DECREMENT_INVENTORY(state, { product, quantity }) {
      const item = state.cart.find(item => item.id === product.id)
      if (item) {
        item.inventory -= quantity
      }
    }
  },
  actions: {
    addToCart({ commit }, { product, quantity }) {
      if (product.inventory > 0) {
        commit('ADD_TO_CART', { product, quantity })
        commit('DECREMENT_INVENTORY', { product, quantity })
      } else {
        alert('Cannot add more than available stock')
      }
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    async confirmPurchase({ state, commit }) {
      try {
        await axios.post('http://localhost:4000/api/purchase', {
          cart_items: state.cart.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        })
        commit('CLEAR_CART')
        alert('Your purchase has succesfully registered!')
        window.location.href = '/'
      } catch (error) {
        console.error('Error confirming purchase:', error)
        alert('Failed to confirm purchase.')
      }
    }
  },
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    cartItemCount: state => state.cart.reduce((count, item) => count + item.quantity, 0)
  }
})