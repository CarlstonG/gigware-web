import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/core/views/Home'

// Auth
import authRoutes from '@/modules/auth/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...authRoutes,
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
