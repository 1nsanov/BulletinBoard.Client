import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from 'vue-router'
import BaseLayout from '../components/layouts/base-layout.vue'
import StartPage from "../views/start-page.vue"

const routes: Array<RouteRecordRaw> = [
  {
    name: 'layout',
    path: '/',
    component: BaseLayout,
    children: [
      {
        name: 'start',
        path: '/',
        component: StartPage,
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from, next) => {
  // console.log('before each', to)
})

export default router
