import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from 'vue-router'
import BaseLayout from '../components/layouts/base-layout.vue'
import HomePage from "../views/home-page.vue"
import AuthPage from "../views/auth-page.vue"
import AdminPage from "../views/admin-page.vue"
import AdvertisementUpdatePage from "../views/advertisement-update-page.vue"

const routes: Array<RouteRecordRaw> = [
  {
    name: 'layout',
    path: '/',
    component: BaseLayout,
    children: [
      {
        name: 'home',
        path: '/',
        component: HomePage,
      },
      {
        name: 'auth',
        path: '/authorization',
        component: AuthPage,
      },
      {
        name: 'admin',
        path: '/admin',
        component: AdminPage,
      },
      {
        name: 'advertisement-update',
        path: '/advertisement/update',
        component: AdvertisementUpdatePage,
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
