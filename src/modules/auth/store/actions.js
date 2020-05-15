import api from '@/modules/auth/services/auth.api'

export default {
  registerProvider(context, form) {
    return new Promise((resolve, reject) => {
      api.provider
        .register(form)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  registerCustomer(context, data) {
    return new Promise((resolve, reject) => {
      api.customer
        .register(data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.auth
        .login(data)
        .then(({ data }) => {
          commit('SET_USER', data)
          commit('SET_TOKEN', data.token)

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
