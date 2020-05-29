import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/core/views/Home'

// Auth
import authRoutes from '@/modules/auth/routes'
import providerRoutes from '@/modules/provider/routes'
import searchRoutes from '@/modules/search/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...authRoutes,
  ...providerRoutes,
  ...searchRoutes
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
