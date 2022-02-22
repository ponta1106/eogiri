import { createApp } from 'vue'
import App from '../app.vue'
import router from '../router'

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App).use(router)
  app.mount('#vue-template');
})
