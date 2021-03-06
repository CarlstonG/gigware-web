import http from 'axios'

export default {
  searchApiRequest: (data) => http.post('/admin/search-user-profiles', data),
  submitVerificationRequest: (data) => http.post('/admin/verification/provider/profile', data),
  pendingVerificationQueueRequest: () => http.get('/admin/verification/pending-queue'),
  deleteUser: (data) => http.post('/admin/delete-user', data)
}
