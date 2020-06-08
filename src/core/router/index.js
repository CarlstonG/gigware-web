import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/core/views/Home'
import PageNotFound from "@/core/views/PageNotFound";
// Auth
import authRoutes from '@/modules/auth/routes'
// Modules routers
import adminRoutes from '@/modules/admin/routes'
import customerRoutes from '@/modules/customer/routes'
import providerRoutes from '@/modules/provider/routes'
import searchRoutes from '@/modules/search/routes'
import staticRoutes from '@/modules/static/routes'
import Default from "../layouts/Default";

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    component: Default,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },

      ...authRoutes,
      ...customerRoutes,
      ...providerRoutes,
      ...searchRoutes,
      ...staticRoutes,

      ...adminRoutes,
    ],
  },

  // all other pages
  {
    path: "",
    component: Default,
    children: [
      { path: "*", name: "404", component: PageNotFound },
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 } // scroll top on page changed
  }
})
