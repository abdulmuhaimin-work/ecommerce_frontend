<template>
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold mb-4">Confirm Purchase</h1>
      <div v-for="item in cartItems" :key="item.id" class="border p-4 rounded mb-4">
        <img :src="item.image_url" alt="Product Image" class="w-96 h-48 object-cover mb-4" />
        <h2 class="text-xl font-semibold">{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p class="font-bold">{{ $filters.currency(item.price) }}</p>
        <p>Quantity: {{ item.quantity }}</p>
      </div>
      <div class="mt-4">
        <p class="text-xl font-bold">Total: {{ $filters.currency(cartTotal) }}</p>
        <button @click="confirmPurchase" class="bg-green-500 text-white px-4 py-2 rounded mt-4">Confirm Purchase</button>
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