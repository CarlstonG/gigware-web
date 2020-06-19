import http from 'axios'

export default {
  updateSettings: form => http.post('customer/onboarding/basic-information', form),
}
