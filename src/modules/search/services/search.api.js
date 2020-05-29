import http from '@/core/services/drivers/app-http-driver'

export default {
  searchApiRequest: (data) => http.post('/providers/search/', data)
}
