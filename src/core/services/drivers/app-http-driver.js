import axios from 'axios'
import headers from './app-http-headers'

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 15000,
})
instance.interceptors.request.use(config => {
  config.headers = headers()
  return config
})

instance.interceptors.response.use(
  response => {
    return response
  },
)

export default instance
