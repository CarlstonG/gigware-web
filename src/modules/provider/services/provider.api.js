import http from '@/core/services/drivers/app-http-driver'

export default {
  onboarding: {
    saveBasicInformation: form => http.post('/providers/onboarding/basic-information', form),
    saveRatesAndLocation: form => http.post('/providers/onboarding/rates-and-location', form),
    createUnavailabilities: form => http.post('/providers/onboarding/unavailabilities', form),
    createCertificates: form => http.post('/providers/onboarding/certificates', form),
    createExperiences: form => http.post('/providers/onboarding/experiences', form),
    createInsurance: form => http.post('/providers/onboarding/insurance', form),
    createReviewRequest: form => http.post('/providers/onboarding/review-requests', form),
  },

  getProfile: (id) => http.get('/providers/provider/' + id)
}
