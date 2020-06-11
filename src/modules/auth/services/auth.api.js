import http from '@/core/services/drivers/app-http-driver'

export default {
  register: {
    provider: data => http.post('auth/provider-registration', data),
    customer: data => http.post('auth/customer-registration', data),
  },
  login: data => http.post('auth/login', data),
  forgot: data => http.post('auth/forgot', data),
  newPassword: data => http.post('auth/new-password', data),
  checkAuth: () => http.get('auth/check-auth'),
  provideLoginAs: (data) => http.post('admin/login-as-request', data),
  loginAs: (data) => http.post('auth/login-as', data),
}
