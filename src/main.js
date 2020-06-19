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
// filters
import './filters/images'
// styles
import '@/assets/scss/main.scss'

// global mixins
// import geoLocationMixin from "@/core/mixins/geo-location";
// Vue.mixin(geoLocationMixin);

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
