<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Products</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" name="product" class="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-[-5px] hover:translate-y-[-3px] flex flex-col">
          <img :src="product.image_url" alt="Product Image" class="w-full h-48 object-cover mb-4 rounded-t-lg" />
          <h2 class="text-xl font-semibold text-gray-800">{{ product.name }}</h2>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="font-bold text-gray-800">{{ $filters.currency(product.price) }}</p>
          <p v-if="product.inventory === 0" class="text-red-500 font-bold">Out of Stock</p>
          <p v-else class="text-green-500">In Stock: {{ product.inventory }}</p>
          <div class="mt-auto">
            <button @click="addToCart(product)" :disabled="isOutOfStock(product)"
              :class="{ 'bg-gray-500': isOutOfStock(product), 'bg-indigo-500': !isOutOfStock(product) }"
              class="text-white px-4 py-2 rounded mt-4 w-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ProductList',
    data() {
        return {
            products: [],
            isAddingToCart: false
        }
    },
    computed: {
        ...mapGetters(['cartItems'])
    },
    created() {
        this.fetchProducts()
    },
    methods: {
        ...mapActions(['addToCart']),
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:4000/api/products')
                this.products = response.data.data.sort((a, b) => a.id - b.id)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        },
        isOutOfStock(product) {
            // const cartItem = this.cartItems.find(item => item.id === product.id)
            // console.log(cartItem)
            return product.inventory <= 0
        },
        async addToCart(product) {
            if (this.isAddingToCart) return

            this.isAddingToCart = true
            const quantityToAdd = 1
            console.log(product.inventory)
            if (product.inventory > 0) {
                await this.$store.dispatch('addToCart', { product, quantity: quantityToAdd })
                product.inventory -= quantityToAdd
            } else {
                alert('Cannot add more than available stock')
            }
            setTimeout(() => {
                this.isAddingToCart = false
            }, 10)
        }
    }
}
</script>