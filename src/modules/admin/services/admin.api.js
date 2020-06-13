import http from 'axios'

export default {
  searchApiRequest: (data) => http.post('/admin/search-user-profiles', data)
}
