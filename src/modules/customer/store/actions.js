import api from '@/modules/customer/services/customer.api'

export default {
  updateCustomerSettings({ commit, rootGetters }, data) {
    return new Promise((resolve, reject) => {
      api.updateSettings(data)
        .then(({ data }) => {
          const newUser = Object.assign(rootGetters["auth/user"], {
            first_name: data.first_name,
            last_name: data.last_name,
          });
          commit('auth/SET_USER', newUser, { root: true });
          commit('auth/SET_USER_CUSTOMER_PROFILE', data.profile, { root: true });
          commit('auth/SET_USER_IMAGES', data.images, { root: true });

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
