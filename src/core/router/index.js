import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/core/views/Home'
import Workers from '@/core/views/Workers'
import Clients from '@/core/views/Clients'
import PageNotFound from "@/core/views/PageNotFound"
import CustomerProfileView from "@/core/views/CustomerProfileView"
import CustomerCard from "@/core/views/CustomerCard"
// Auth
import authRoutes from '@/modules/auth/routes'
// Modules routers
import adminRoutes from '@/modules/admin/routes'
import customerRoutes from '@/modules/customer/routes'
import providerRoutes from '@/modules/provider/routes'
import searchRoutes from '@/modules/search/routes'
import staticRoutes from '@/modules/static/routes'
import trackerRoutes from '@/modules/tracker/routes'
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
      {
        path: "/customerprofileview",
        name: "customerprofileview",
        component: CustomerProfileView,
      },

      {
        path: "/customerCard",
        name: "customerCard",
        component: CustomerCard,
      },

      {
        path: "/",
        name: "clients",
        component: Clients,
      },


      ...authRoutes,
      ...customerRoutes,
      ...providerRoutes,
      {
        path: "/",
        name: "workers",
        component: Workers,
      },
      ...searchRoutes,
      ...staticRoutes,
      ...trackerRoutes,

      ...adminRoutes,
    ],
  },

  // all other pages
    {
    path: "",
    component: Default,
    children: [
      {
        path: "/404",
        alias: '*',
        name: "404",
        component: PageNotFound
      },
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
