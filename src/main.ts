import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from './router'
import store from './store'
import '../src/assets/fonts/PlayMeGames/style.css'

const app = createApp(App);
components(app)
app.use(store).use(router).mount('#app')


