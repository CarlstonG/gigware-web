import Vue from '../../../main'
import api from '@/modules/auth/services/auth.api'

const setUser = ({ commit }, data) => {
  commit('SET_USER', data)
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
  loginAs(context, data) {
    return new Promise((resolve, reject) => {
      api
        .loginAs(data)
        .then(({ data }) => {
          Vue.$auth.fetch().then(({ data }) => { // token is set in interceptor
            setUser(context, data)
          })

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  forgot(context, data) {
    return new Promise((resolve, reject) => {
      api
        .forgot(data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  newPassword(context, data) {
    return new Promise((resolve, reject) => {
      api
        .newPassword(data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deactivateAccount() {
    return new Promise((resolve, reject) => {
      api
        .deactivateAccount()
        .then(() => resolve())
        .catch(error => reject(error))
    })
  },
  /**
   * data: { email: email (or) id: userId }
   */
  provideLoginAs() {
    window.loginAs = (data) => api.provideLoginAs(data).then(r => console.log(r.data));
  }
}
