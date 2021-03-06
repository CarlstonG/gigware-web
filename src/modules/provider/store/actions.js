import Vue from "../../../main";
import api from '@/modules/provider/services/provider.api'

export default {
  createBasicInformation(context, form) {
    return new Promise((resolve, reject) => {
      api.onboarding
        .saveBasicInformation(form)
        .then((res) => {
          if (!res) return reject('error');

          const user = res.data;
          Vue.$auth.user(user);

          resolve(user)
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
      // search every request to hold updated profile_id
      context.commit('SET_PROVIDER_PROFILE_STATE', true);

      api.getProfile(id)
        .then(({ data }) => {
          context.commit('SET_PROVIDER_PROFILE', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          context.commit('SET_PROVIDER_PROFILE_STATE', false);
        })
    })
  },

  checkExternalReviewToken(context, token) {
    return new Promise((resolve, reject) => {
      api.getExternalReviewTokenStatus(token)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendExternalReview(context, { token, form }) {
    return new Promise((resolve, reject) => {

      api.postExternalReview(token, form)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
