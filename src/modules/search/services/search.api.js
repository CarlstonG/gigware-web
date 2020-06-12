import http from 'axios'

export default {
  searchApiRequest: (data) => http.post('/providers/search', data)
}
