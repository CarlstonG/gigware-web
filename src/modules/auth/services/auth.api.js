import http from 'axios'

export default {
  register: {
    provider: data => http.post('auth/provider-registration', data),
    customer: data => http.post('auth/customer-registration', data),
  },
  forgot: data => http.post('auth/forgot', data),
  newPassword: data => http.post('auth/new-password', data),
  checkAuth: () => http.get('auth/check-auth'),
  provideLoginAs: (data) => http.post('admin/login-as-request', data),
  loginAs: (data) => http.post('auth/login-as', data),
  deactivateAccount: () => http.post('auth/user/deactivate'),
}
