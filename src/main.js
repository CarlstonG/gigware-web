import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import * as VueSVGIcon from 'vue-svgicon'
import './core/icons/index'

import './assets/scss/main.scss'

Vue.use(BootstrapVue)
Vue.use(VueSVGIcon, {
  tagName: 'svg-icon',
  classPrefix: 'gigwire',
  isOriginalDefault: true,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
