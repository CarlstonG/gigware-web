import store from '@/core/store'

export default () => {
  let headers = {
    ApiKey: process.env.VUE_APP_BASE_API_KEY,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (store.getters['auth/user'] && store.getters['auth/user'].token) {
    headers['Authorization'] = `Bearer ${store.getters['auth/user'].token}`
  }

  return headers
}
