import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import geoLocator from './modules/geo-location'
import auth from '@/modules/auth/store'
import customer from '@/modules/customer/store'
import provider from '@/modules/provider/store'
import search from '@/modules/search/store'
import admin from '@/modules/admin/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    customer,
    provider,
    search,
    admin,

    // core
    geoLocator
  },
  plugins: [
    createPersistedState({
      key: process.env.VUE_APP_VUEX_PERSISTENCE_KEY,
      paths: ['auth.user', 'auth.token'],
    }),
  ],
})
