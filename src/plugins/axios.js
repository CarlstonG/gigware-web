import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

Vue.axios.defaults = Object.assign(Vue.axios.defaults, {
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: process.env.VUE_APP_API_TIMEOUT || 30000,
});

// Vue.axios.interceptors
