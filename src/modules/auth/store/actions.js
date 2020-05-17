import api from '@/modules/auth/services/auth.api'

const setUser = ({ commit }, data) => {
  commit('SET_USER', data)
  commit('SET_TOKEN', data.token)
}

export default {
  registerProvider(context, form) {
    return new Promise((resolve, reject) => {
      api.register
        .provider(form)
        .then(({ data }) => {
          setUser(context, data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  registerCustomer(context, data) {
    return new Promise((resolve, reject) => {
      api.register
        .customer(data)
        .then(({ data }) => {
          setUser(context, data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  login(context, data) {
    return new Promise((resolve, reject) => {
      api
        .login(data)
        .then(({ data }) => {
          setUser(context, data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkAuth() {
    api.checkAuth()
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER', null)
      commit('SET_TOKEN', '')

      resolve()
    })
  },
}
