import Vue from 'vue'
import App from '@/App'
import router from '@/core/router'
import store from '@/core/store'
// plugins
import './plugins/axios' // should be before vue-auth
import './plugins/auth/vue-auth'
import './plugins/misc'
import './plugins/vue-bootstrap'
import './plugins/vuelidate'
require('./plugins/google-map')

// filters
import './filters/images'
// styles
import '@/assets/scss/main.scss'
// extensions
require('./plugins/extensions/index')


// added google analytics plugin here --->

import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-175923013-2'
})



// global mixins
// import geoLocationMixin from "@/core/mixins/geo-location";
// Vue.mixin(geoLocationMixin);

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
