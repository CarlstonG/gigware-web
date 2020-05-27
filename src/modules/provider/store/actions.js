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
  createUnavailabilities(context, form) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .createUnavailabilities(form)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createCertificates(context, certificates) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .createCertificates(certificates)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createExperiences(context, experiences) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .createExperiences(experiences)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createInsurance(context, form) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .createInsurance(form)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createReviewRequest(context, form) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .createReviewRequest(form)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  profileRequest(context, id) {
    return new Promise((resolve, reject) => {
      api.getProfile(id)
        .then(({ data }) => {
          context.commit('SET_BASIC_INFORMATION', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
