import api from '@/modules/customer/services/customer.api'

export default {
  updateCustomerSettings({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.updateSettings(data)
        .then((res) => {
          if (!res) return reject('error');

          const user = res.data;
          commit('auth/SET_USER', user, { root: true });

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
