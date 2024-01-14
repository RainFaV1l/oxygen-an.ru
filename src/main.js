import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import '../public/style.css'
import store from "@/store";

createApp(App).use(router).use(store).mount('#app')