import api from '@/modules/provider/services/provider.api'

export default {
  createBasicInformation(context, form) {
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
  createRatesAndLocation(context, form) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .saveRatesAndLocation(form)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
