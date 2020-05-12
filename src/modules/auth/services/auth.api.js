import http from '@/core/services/drivers/app-http-driver'

export default {
  provider: {
    register: data => http.post('auth/provider-registration', data),
  },
  customer: {
    register: data => http.post('auth/customer-registration', data),
  },
}
