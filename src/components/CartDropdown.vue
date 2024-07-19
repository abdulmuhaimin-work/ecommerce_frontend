<template>
  <div class="p-4">
    <h2 class="text-lg font-bold mb-2 text-gray-800">Shopping Cart</h2>
    <div v-if="cartItems.length === 0">
      <p class="text-gray-600">Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="border-b py-2">
        <h3 class="text-md font-semibold text-gray-800">{{ item.name }}</h3>
        <p class="font-bold text-gray-800">{{ $filters.currency(item.price) }}</p>
        <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
        <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700">Remove</button>
      </div>
      <div class="mt-4">
        <p class="text-md font-bold mb-4 text-gray-800">Total: {{ $filters.currency(cartTotal) }}</p>
        <router-link to="/checkout" class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition-colors duration-300" @click="handleCheckout">Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartDropdown',
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    ...mapActions(['removeFromCart', 'confirmPurchase']),
    handleCheckout() {
      this.$emit('closeDropdown');
    }
  }
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>