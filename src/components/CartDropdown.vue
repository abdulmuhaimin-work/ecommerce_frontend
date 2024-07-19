<template>
  <div class="p-4">
    <h2 class="text-lg font-bold mb-2">Shopping Cart</h2>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="border-b py-2">
        <h3 class="text-md font-semibold">{{ item.name }}</h3>
        <!-- <p>{{ item.description }}</p> -->
        <p class="font-bold">{{ $filters.currency(item.price) }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <button @click="removeFromCart(item.id)" class="text-red-500">Remove</button>
      </div>
      <div class="mt-4">
        <p class="text-md font-bold mb-4">Total: {{ $filters.currency(cartTotal) }}</p>
        <router-link to="/checkout" class="bg-green-500 text-white px-4 py-2 rounded mt-4" @click="handleCheckout">Checkout</router-link>
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