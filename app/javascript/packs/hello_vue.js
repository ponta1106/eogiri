import { createApp } from 'vue'
import App from '../app.vue'
import router from '../router'
import { store } from "../store";
import "../stylesheets/dist.css";
// import "../stylesheets/style.css";

document.addEventListener('DOMContentLoaded', () => {
  const selector = '#vue-app';
  if(document.querySelector(selector)){
    createApp(App).use(router).use(store).mount(selector);
  }
})
