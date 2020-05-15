import api from '@/modules/provider/services/provider.api'

export default {
  saveBasicInformation(context, form) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .saveBasicInformation(form)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
