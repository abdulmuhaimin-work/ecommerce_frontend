<template>
  <div id="app">
    <nav class="bg-gray-800 p-4 fixed w-full z-10">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-lg font-bold">
          <router-link to="/" class="mr-4">Home</router-link>
        </div>
        <div class="relative">
          <button @click="toggleCartDropdown" class="text-white flex items-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"></path>
            </svg>
            <div class="ml-2">{{ cartItemCount }}</div>
          </button>
          <div v-if="isCartDropdownOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
            <CartDropdown @closeDropdown="isCartDropdownOpen = false" />
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-24">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartDropdown from './components/CartDropdown.vue'

export default {
  name: 'App',
  components: {
    CartDropdown
  },
  data() {
    return {
      isCartDropdownOpen: false
    }
  },
  computed: {
    ...mapGetters(['cartItemCount'])
  },
  methods: {
    toggleCartDropdown() {
      this.isCartDropdownOpen = !this.isCartDropdownOpen
    }
  }
}
</script>

<style>
/* Add any global styles here */
</style>