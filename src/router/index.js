import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  { path: '/', name: 'Home', component: Products },
  { path: '/checkout', name: 'Checkout', component: Checkout }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router