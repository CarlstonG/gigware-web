import http from 'axios'

export default {
  searchApiRequest: (data) => http.post('/admin/search-user-profiles', data),
  submitVerificationRequest: (data) => http.post('/admin/verification/provider/profile', data)
}
