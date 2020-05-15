import http from '@/core/services/drivers/app-http-driver'

export default {
  onboarding: {
    saveBasicInformation: form => http.post('/providers/onboarding/basic-information', form)
  },
}
