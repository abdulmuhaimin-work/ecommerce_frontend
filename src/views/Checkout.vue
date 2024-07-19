<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Confirm Purchase</h1>
      <div v-for="item in cartItems" :key="item.id" class="border p-4 rounded-lg shadow-lg bg-white mb-4 hover:shadow-xl transition-shadow duration-300">
        <img :src="item.image_url" alt="Product Image" class="w-96 h-48 object-cover mb-4 rounded-t-lg" />
        <h2 class="text-xl font-semibold text-gray-800">{{ item.name }}</h2>
        <p class="text-gray-600">{{ item.description }}</p>
        <p class="font-bold text-gray-800">{{ $filters.currency(item.price) }}</p>
        <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
      </div>
      <div class="mt-4 text-center">
        <p class="text-xl font-bold text-gray-800">Total: {{ $filters.currency(cartTotal) }}</p>
        <button @click="confirmPurchase" class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition-colors duration-300">Confirm Purchase</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    name: 'CheckoutPage',
    computed: {
      ...mapGetters(['cartItems', 'cartTotal'])
    },
    methods: {
      ...mapActions(['removeFromCart', 'confirmPurchase'])
    }
  }
  </script>