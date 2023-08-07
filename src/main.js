import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'

//GLOBAL STORES
import { createPinia } from 'pinia'

//GLOBAL STYLE
import './style.css'

//PINIA AND VUE
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");