import app from '@/main'
import axios from 'axios'
import headers from './app-http-headers'

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 1500000,
})
instance.interceptors.request.use(config => {
  config.headers = headers()
  return config
})

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response?.status === 401 && app.$store.getters['auth/isLoggedIn']) {
      logout()
    }

    return Promise.reject(error)
  },
)

const logout = () => {
  app.$store.dispatch('auth/logout').then(() => {
    if (app.$router.currentRoute.name !== 'home') {
      app.$router.push({ name: 'home' })
    }
  })
}

export default instance
