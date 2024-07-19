import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import currency from './filters/currency'

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency
}
app.use(router)
app.use(store)
app.mount('#app')