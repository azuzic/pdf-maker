import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'

//HTML TO PAPER
import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=no',
    'titlebar=no',
    'scrollbars=yes'
  ],
  styles: [
    'dist/output.css',
  ],
  timeout: 0, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

//GLOBAL STORES
import { createPinia } from 'pinia'

//GLOBAL STYLE
import './style.css'

//PINIA AND VUE
const pinia = createPinia();
const app = createApp(App);

app.use(VueHtmlToPaper, options);
app.use(router);
app.use(pinia);
app.mount("#app");