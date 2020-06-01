import http from '@/core/services/drivers/app-http-driver'

export default {
  updateSettings: form => http.post('customer/onboarding/basic-information', form),
}
