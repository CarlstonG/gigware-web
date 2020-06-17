import api from '@/modules/admin/services/admin.api'

export default {
  submitVerification(context, data) {
    return new Promise((resolve, reject) => {
      api.submitVerificationRequest(data)
        .then((res) => {
          if (!res) return reject('error');

          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
