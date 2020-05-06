import app from '@/main'
import axios from 'axios'
import headers from './app-http-headers'

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 15000,
})``
instance.interceptors.request.use(config => {
  config.headers = headers()

  app.$Progress.start()
  return config
})

instance.interceptors.response.use(
  response => {
    app.$Progress.finish()
    return response
  },
  error => {
    app.$Progress.finish()

    if (error && error.response && error.response.status === 400) {
      // ApiKey Error
      app.$store.dispatch('auth/autoLogout')
      return Promise.reject(error)
    } else if (
      error &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      // Auth Error
      if (app.$store.getters['auth/userIsLoggedIn']) {
        app.$store.dispatch('auth/logout').then(() => {
          app.$router.push({ name: 'login' })
        })
      } else {
        return Promise.reject(error)
      }
    } else if (error && error.status === 500) {
      // System Error
      app.$router.push({ name: 'error-500' })
    } else {
      // Reject Error
      return Promise.reject(error)
    }
  },
)

export default instance
