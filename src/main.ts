import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from './router'
import store from './store'
import Api from "./api"
import '../src/assets/fonts/PlayMeGames/style.css'

const app = createApp(App);
components(app)

const apiUrl = "https://localhost:7219"
app.use(Api, apiUrl);

app.use(store).use(router).mount('#app')


