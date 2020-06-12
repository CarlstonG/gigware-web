import Vue from 'vue';
import VueAuth from './vue-auth-extension';
import router from '@/core/router';
import store from '@/core/store'
import authBearer from "./drivers/bearer";
import authAxios from "@websanova/vue-auth/dist/drivers/http/axios.1.x";
import routerVueRouter from "./drivers/vue-router";

Vue.router = router;
Vue.store = store;


/*
 * settings
 */
Vue.use(VueAuth, {
  auth: authBearer,
  http: authAxios,
  router: routerVueRouter,
  rememberKey: 'auth_remember',
  tokenDefaultKey: 'auth_token_default',
  tokenImpersonateKey: 'auth_token_impersonate',
  stores: ['storage', 'cookie'],

  loginData: {
    url: 'auth/login/',
  },
  logoutData: {
    url: 'auth/logout/',
  },
  fetchData: {
    enabled: false, // fetch user after load
    url: 'auth/user/',
  },
  refreshData: {
    url: 'auth/refresh-token/',
    enabled: false,
  },
  authRedirect: { name: 'login' },
  notFoundRedirect: { name: '404' },
  forbiddenRedirect: { name: '404' },
  parseUserData: function (data) {
    return data;
  },
  storeUserFn: function (user) {
    Vue.store.commit('auth/SET_USER', user);
  },
  getStoreUserFn: function () {
    return Vue.store.getters['auth/user'];
  }
});

