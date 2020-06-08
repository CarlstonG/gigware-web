import http from '@/core/services/drivers/app-http-driver'

export default {
  searchApiRequest: (data) => http.post('/admin/search-user-profiles', data)
}
