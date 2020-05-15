import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/modules/auth/store'
import provider from '@/modules/provider/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    provider,
  },
  plugins: [
    createPersistedState({
      key: process.env.VUE_APP_VUEX_PERSISTENCE_KEY,
      paths: ['auth.user', 'auth.token'],
    }),
  ],
})
