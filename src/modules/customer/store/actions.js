import Vue from "../../../main";
import api from '@/modules/customer/services/customer.api'

export default {
  updateCustomerSettings(context, data) {
    return new Promise((resolve, reject) => {
      api.updateSettings(data)
        .then((res) => {
          if (!res) return reject('error');

          const user = res.data;
          Vue.$auth.user(user);

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
