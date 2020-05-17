import http from '@/core/services/drivers/app-http-driver'

export default {
  register: {
    provider: data => http.post('auth/provider-registration', data),
    customer: data => http.post('auth/customer-registration', data),
  },
  login: data => http.post('auth/login', data),
  checkAuth: () => http.get('auth/check-auth'),
}
